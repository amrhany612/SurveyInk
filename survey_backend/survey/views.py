from django.utils import timezone
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from accounts.models import University, UserProfile
from .models import Answer, Choice, Demographic, Question, Survey, SolvedSurvey
from rest_framework.generics import ListAPIView
from rest_framework import generics, permissions , filters,viewsets
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import AnswerSerializer, DemographicSerializer, SolvedSurveySerializer, SurveyDetailSerializer, SurveySerializer, UniversitySerializer, UserProfileSerializer
from .serializers import QuestionSerializer
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, F , Q
from django.db.models.functions import TruncMonth, TruncYear
from django.db import IntegrityError

# Create your views here.
@api_view(['GET'])
def researcher_dashboard_stats(request):
    user = request.user
    # Annotate each survey with actual number of solved entries
    surveys = Survey.objects.filter(creator=user).annotate(
        actual_submissions=Count('solved_entries')
    ).order_by('-created_at')
    total_surveys = surveys.count()
    solved_surveys = surveys.filter(actual_submissions__gte=F('required_submissions')).count()
    unsolved_surveys = total_surveys - solved_surveys

    # Prepare survey status table
    survey_table = [
        {
            "id": survey.id,
            "title": survey.title,
            "actual_submissions": survey.actual_submissions,
            "required_submissions": survey.required_submissions,
            "is_solved": survey.actual_submissions >= survey.required_submissions
        }
        for survey in surveys
    ]
    user_info = {
        "user": {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
        },
        "image": getattr(user, 'image', None) or 'https://www.w3schools.com/howto/img_avatar.png'
    }
    return Response({
        "total_surveys": total_surveys,
        "solved_surveys": solved_surveys,
        "unsolved_surveys": unsolved_surveys,
        "survey_table": survey_table,  # ✅ This replaces freelancer_submissions
        'user_info':user_info
    })

class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class CreateSurveyAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = SurveySerializer(data=request.data, context={'request': request})
        print(serializer)
        if serializer.is_valid():
            print('hany')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # <-- This will show you validation errors

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SurveyQuestionsBulkCreateView(APIView):
    def post(self, request, survey_id):
        try:
            survey = Survey.objects.get(pk=survey_id)
        except Survey.DoesNotExist:
            return Response({'error': 'Survey not found'}, status=status.HTTP_404_NOT_FOUND)

        questions_data = request.data
        if not isinstance(questions_data, list):
            return Response({'error': 'Expected a list of questions'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = QuestionSerializer(data=questions_data, many=True, context={'survey': survey})
        if serializer.is_valid():
            # Save with survey assigned explicitly
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class SurveyPagination(PageNumberPagination):
    page_size = 10  # Number of surveys per page

class AllSurveysView(ListAPIView):
    serializer_class = SurveySerializer
    pagination_class = SurveyPagination

    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        
        # Start by filtering for published surveys
        queryset = Survey.objects.filter(is_published=True).order_by('-created_at')

        # If search keyword is provided, filter by title
        if search:
            queryset = queryset.filter(title__icontains=search)

        # Annotate with count of solved submissions
        queryset = queryset.annotate(actual_submissions=Count('solved_entries'))

        return queryset

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def survey_submissions(request, survey_id):
    try:
        survey = Survey.objects.get(id=survey_id, creator=request.user)
    except Survey.DoesNotExist:
        return Response({'error': 'Survey not found or unauthorized.'}, status=404)

    submissions = SolvedSurvey.objects.filter(survey=survey)

    serializer = SolvedSurveySerializer(submissions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_submission(request, submission_id):
    try:
        submission = SolvedSurvey.objects.get(id=submission_id, survey__created_by=request.user)
    except SolvedSurvey.DoesNotExist:
        return Response({'error': 'Submission not found or unauthorized.'}, status=404)

    submission.status = 'accepted'
    submission.save()
    return Response({'message': 'Submission accepted.'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_submission(request, submission_id):
    try:
        submission = SolvedSurvey.objects.get(id=submission_id, survey__created_by=request.user)
    except SolvedSurvey.DoesNotExist:
        return Response({'error': 'Submission not found or unauthorized.'}, status=404)

    submission.status = 'rejected'
    submission.save()
    return Response({'message': 'Submission rejected.'})


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Return the UserProfile linked to the authenticated User
        return self.request.user.userprofile
    

class SurveyDisplayView(generics.RetrieveAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # so serializer can access request.user
        return context
class UnpublishedSurveyCount(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        count = Survey.objects.filter(creator=user, is_published=False).count()
        return Response({'count': count})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unpublished_surveys(request):
    surveys = Survey.objects.filter(is_published=False)
    serializer = SurveySerializer(surveys, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def publish_survey(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
        survey.is_published = True
        survey.save()
        return Response({'message': 'Survey published successfully.'}, status=status.HTTP_200_OK)
    except Survey.DoesNotExist:
        return Response({'error': 'Survey not found.'}, status=status.HTTP_404_NOT_FOUND)


def survey_response_analysis(request, survey_id):
    try:
        survey = Survey.objects.get(id=survey_id)
        answers = Answer.objects.filter(survey=survey).select_related('freelancer', 'question')

        # Get user profiles of freelancers who answered
        user_ids = answers.values_list('freelancer_id', flat=True).distinct()
        profiles = UserProfile.objects.filter(user_id__in=user_ids)

        # Age distribution
        age_distribution = profiles.values('age').annotate(count=Count('id'))

        # Gender distribution
        gender_distribution = profiles.values('gender').annotate(count=Count('id'))

        # Education distribution (field_of_study__name)
        education_distribution = profiles.values('field_of_study__name').annotate(count=Count('id'))

        # Questions and answer stats
        questions = survey.questions.all()
        question_stats = []

        for question in questions:
            answer_counts = answers.filter(question=question)\
                .values('answer_text')\
                .annotate(count=Count('id'))

            total = sum(item['count'] for item in answer_counts)
            choices = [
                {
                    'choice': item['answer_text'],
                    'count': item['count'],
                    'percentage': round((item['count'] / total) * 100, 2) if total > 0 else 0
                }
                for item in answer_counts
            ]

            question_stats.append({
                'question_text': question.text,
                'choices': choices,
            })

        return JsonResponse({
            'age_distribution': list(age_distribution),
            'gender_distribution': list(gender_distribution),
            'education_distribution': list(education_distribution),
            'question_stats': question_stats,
        })
    except Survey.DoesNotExist:
        return JsonResponse({'error': 'Survey not found'}, status=404)
    
class SurveyDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = SurveySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(creator=self.request.user)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def survey_questions(request, survey_id):
    try:
        survey = Survey.objects.get(pk=survey_id, creator=request.user)
    except Survey.DoesNotExist:
        return Response({'error': 'Survey not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        questions = Question.objects.filter(survey=survey)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data  # expected to be a list
        errors = []

        for question_data in data:
            try:
                question = Question.objects.get(id=question_data.get('id'), survey=survey)
            except Question.DoesNotExist:
                errors.append({'id': question_data.get('id'), 'error': 'Question not found'})
                continue

            # Update base fields
            question.text = question_data.get('text', question.text)
            question.question_type = question_data.get('question_type', question.question_type)

            if question.question_type == 'scale':
                question.scale_min_label = question_data.get('scale_min_label', '')
                question.scale_max_label = question_data.get('scale_max_label', '')
            else:
                question.scale_min_label = ''
                question.scale_max_label = ''

            question.save()

            # Update choices for multiple_choice
            if question.question_type == 'multiple_choice':
                # Clear old choices
                question.choices.all().delete()
                choices = question_data.get('choices', [])
                for choice in choices:
                    # Support both string or dict (e.g., { "text": "Option A" })
                    if isinstance(choice, dict):
                        choice_text = choice.get('text', '').strip()
                    else:
                        choice_text = str(choice).strip()

                    if choice_text:
                        Choice.objects.create(question=question, text=choice_text)

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Questions updated successfully'}, status=status.HTTP_200_OK)
class SurveyDemographicsAPIView(APIView):
    def get(self, request, survey_id):
        try:
            survey = Survey.objects.get(id=survey_id)
            demographic = Demographic.objects.get(survey=survey)
            serializer = DemographicSerializer(demographic)
            return Response(serializer.data)
        except Survey.DoesNotExist:
            return Response({'error': 'Survey not found'}, status=status.HTTP_404_NOT_FOUND)
        except Demographic.DoesNotExist:
            return Response({'error': 'Demographic not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, survey_id):
        try:
            survey = Survey.objects.get(id=survey_id)
        except Survey.DoesNotExist:
            return Response({'error': 'Survey not found'}, status=status.HTTP_404_NOT_FOUND)

        demographic, created = Demographic.objects.get_or_create(survey=survey)
        serializer = DemographicSerializer(demographic, data=request.data, partial=True,context={'request':request})
        if serializer.is_valid():
            serializer.save(survey=survey)
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, survey_id):
        try:
            survey = Survey.objects.get(id=survey_id)
            demographic, _ = Demographic.objects.get_or_create(survey=survey)
            serializer = DemographicSerializer(demographic, data=request.data, partial=True,context = {"request":request})
            if serializer.is_valid():
                serializer.save(survey=survey)
                return Response(serializer.data)
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Survey.DoesNotExist:
            return Response({'detail': 'Survey not found'}), status
            
class FreelancerSurveySubmissionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, survey_id, freelancer_id):
        survey = get_object_or_404(Survey, id=survey_id)
        # submission = get_object_or_404(SolvedSurvey, survey=survey, freelancer__id=freelancer_id)

        answers = Answer.objects.filter(survey=survey_id ,freelancer=freelancer_id)
        print(answers)
        answer_data = AnswerSerializer(answers, many=True).data
        survey_data = SurveySerializer(survey).data

        return Response({
            "survey": survey_data,
            "answers": answer_data
        })
    
# Freelncer 
class FreelancerDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        freelancer = request.user
        now = timezone.now()
        current_year = now.year
        current_month = now.month
        user_info = UserProfile.objects.get(user=freelancer)
        user_data = UserProfileSerializer(user_info)

        # Adjust based on your logic of assigned surveys
        assigned_surveys = Survey.objects.filter(is_published=True)
        total_assigned = assigned_surveys.count()

        # ✅ All solved surveys by freelancer
        solved_surveys = SolvedSurvey.objects.filter(freelancer=freelancer)
        solved_count = solved_surveys.count()

        # ✅ Pending: total assigned - solved
        pending_count = max(total_assigned - solved_count, 0)

        # ✅ Monthly stats (per month of current year)
        monthly_stats = (
            solved_surveys
            .filter(submitted_at__year=current_year)
            .annotate(month=TruncMonth('submitted_at'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )
        monthly_submissions_count = [
            {'month': entry['month'].strftime('%b'), 'count': entry['count']}
            for entry in monthly_stats
        ]

        # ✅ Yearly stats (per year)
        yearly_stats = (
            solved_surveys
            .annotate(year=TruncYear('submitted_at'))
            .values('year')
            .annotate(count=Count('id'))
            .order_by('year')
        )
        yearly_submissions_count = [
            {'year': entry['year'].year, 'count': entry['count']}
            for entry in yearly_stats
        ]

        return Response({
            'total_assigned_surveys': total_assigned,
            'solved_surveys': solved_count,
            'pending_surveys': pending_count,
            'monthly_submissions_count': monthly_submissions_count,
            'yearly_submissions_count': yearly_submissions_count,
            'user_info':user_data.data
        })
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def solved_surveys(request):
    user = request.user
    submissions = SolvedSurvey.objects.filter(freelancer=user)
    serializer = SolvedSurveySerializer(submissions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_surveys(request):
    user = request.user
    
    # Get all survey IDs the freelancer has already submitted
    solved_survey_ids = SolvedSurvey.objects.filter(freelancer=user).values_list('survey_id', flat=True)

    # Get surveys NOT in those IDs
    pending_surveys = Survey.objects.filter(is_published=True).exclude(id__in=solved_survey_ids).order_by('-created_at')

    # Optional: If you want only surveys assigned to this freelancer, add filtering logic here
    user_info = UserProfile.objects.get(user=user)
    user_data = UserProfileSerializer(user_info)
    serializer = SurveySerializer(pending_surveys, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_survey(request, id):
    user = request.user
    survey = get_object_or_404(Survey, id=id)

    if SolvedSurvey.objects.filter(survey=survey, freelancer=user).exists():
        return Response({'detail': 'You have already submitted this survey.'}, status=status.HTTP_400_BAD_REQUEST)

    answers = request.data.get('answers')
    demographics = request.data.get('demographics')
    duration = request.data.get('duration')  # in seconds from frontend


    if not answers or not demographics or duration is None:
        return Response({'detail': 'Missing data.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        duration_seconds = int(duration)
        min_duration_seconds = survey.min_duration_minutes * 60
        max_duration_seconds = survey.max_duration_minutes * 60

        # if duration_seconds < min_duration_seconds:
        #     return Response({'detail': 'You submitted too quickly. Please spend more time answering.'}, status=status.HTTP_400_BAD_REQUEST)

        # if duration_seconds > max_duration_seconds:
        #     return Response({'detail': 'Submission took too long and exceeded the allowed time limit.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save SolvedSurvey
        solved = SolvedSurvey.objects.create(
            survey=survey,
            freelancer=user,
        )
        # Save answers
        for question_id, answer_text in answers.items():
            question = get_object_or_404(Question, id=question_id)
            Answer.objects.create(
                question=question,
                freelancer=user,
                survey=survey,
                answer_text=answer_text
            )

        return Response({'detail': 'Survey submitted successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def solved_survey_detail(request, survey_id):
    user = request.user
    answers = Answer.objects.filter(survey_id=survey_id, freelancer=user)

    if not answers.exists():
        return Response({'detail': 'Answers not found'}, status=status.HTTP_404_NOT_FOUND)

    survey = answers.first().survey
    survey_serializer = SurveySerializer(survey)
    answer_serializer = AnswerSerializer(answers, many=True)

    return Response({
        'survey': survey_serializer.data,
        'answers': answer_serializer.data
    })