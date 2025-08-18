from django.shortcuts import render
from accounts.models import *
from survey.models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models.functions import TruncMonth, TruncYear
from django.db.models import Count
from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from survey.serializers import *
from rest_framework import generics, permissions, status
from accounts.serializers import EmailLogSerializer, LoginHistorySerializer, NotificationSerializer
from django.db.models import Q
from rest_framework.views import APIView

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_stats(request):
    # Total counts
    total_researchers = UserProfile.objects.filter(role='researcher').count()
    total_freelancers = UserProfile.objects.filter(role='freelancer').count()
    total_surveys = Survey.objects.count()
    total_responses = SolvedSurvey.objects.count()

    # Monthly user registration (last 12 months)
    monthly_users = (
        UserProfile.objects
        .annotate(month=TruncMonth('user__date_joined'))
        .values('month')
        .annotate(count=Count('id'))
        .order_by('month')
    )

    # Yearly user registration
    yearly_users = (
        UserProfile.objects
        .annotate(year=TruncYear('user__date_joined'))
        .values('year')
        .annotate(count=Count('id'))
        .order_by('year')
    )

    data = {
        'total_researchers': total_researchers,
        'total_freelancers': total_freelancers,
        'total_surveys': total_surveys,
        'total_responses': total_responses,
        'monthly_users': monthly_users,
        'yearly_users': yearly_users,
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_researchers(request):
    search = request.GET.get('search', '')
    researchers = UserProfile.objects.filter(
        role='researcher',
        user__first_name__icontains=search
    ).select_related('user')

    data = [
        {
            'id': researcher.id,
            'name': f"{researcher.user.first_name} {researcher.user.last_name}",
            'email': researcher.user.email,
            'is_active': researcher.user.is_active,
        }
        for researcher in researchers
    ]
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_freelancers(request):
    search = request.GET.get('search', '')
    freelancers = UserProfile.objects.filter(
        role='freelancer',
        user__first_name__icontains=search
    ).select_related('user')

    data = [
        {
            'id': freelancer.id,
            'name': f"{freelancer.user.first_name} {freelancer.user.last_name}",
            'email': freelancer.user.email,
            'is_active': freelancer.user.is_active,
        }
        for freelancer in freelancers
    ]
    print(data)
    return Response(data)


class AdminSurveyListCreateView(generics.ListCreateAPIView):
    queryset = Survey.objects.all().order_by('-created_at')
    serializer_class = SurveySerializer
    permission_classes = [permissions.IsAdminUser]

class AdminSurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [permissions.IsAdminUser]
@api_view(['POST'])
@permission_classes([IsAdminUser])
def toggle_user_block(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({'status': 'success', 'is_active': user.is_active})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, id):
        try:
            user = User.objects.get(pk=id)
            user_profile = UserProfile.objects.get(user=user)
            print(user_profile)
            user_profile.delete()
            user.delete()
            return Response({'message': 'User deleted successfully.'}, status=204)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
    
@api_view(['DELETE'])
@permission_classes([permissions.IsAdminUser])
def delete_survey(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
        survey.delete()
        return Response({"message": "Survey deleted successfully"}, status=200)
    except Survey.DoesNotExist:
        return Response({"error": "Survey not found"}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def login_history_view(request):
    search = request.GET.get('search', '')
    logs = LoginHistory.objects.all()
    if search:
        logs = logs.filter(
            Q(email__icontains=search) |
            Q(ip_address__icontains=search)
        )
    serializer = LoginHistorySerializer(logs.order_by('-timestamp'), many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_notifications_view(request):
    search = request.GET.get('search', '')
    queryset = Notification.objects.filter(user=request.user)

    if search:
        queryset = queryset.filter(
            Q(message__icontains=search) |
            Q(created_at__icontains=search)
        )

    notifications = queryset.order_by('-created_at')
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def email_logs_view(request):
    search = request.GET.get('search', '')
    logs = EmailLog.objects.all()

    if search:
        logs = logs.filter(
            Q(recipient__icontains=search) |
            Q(subject__icontains=search) |
            Q(status__icontains=search)
        )

    serializer = EmailLogSerializer(logs.order_by('-timestamp'), many=True)
    return Response(serializer.data)