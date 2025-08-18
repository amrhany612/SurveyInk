# surveys/serializers.py
from rest_framework import serializers
from .models import Answer, Choice, Demographic, SolvedSurvey, Survey,Question
from accounts.models import City, Country, FieldOfStudy, Profession, University, UserProfile ,User

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name']
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = [
            'id',
            'text',
            'question_type',
            'scale_min_label',
            'scale_max_label',
            'choices',
        ]

    def create(self, validated_data):
        choices_data = validated_data.pop('choices', [])
        survey = self.context['survey']
        question = Question.objects.create(survey=survey, **validated_data)

        if validated_data.get('question_type') == 'multiple_choice':
            for choice_data in choices_data:
                Choice.objects.create(question=question, **choice_data)

        return question
  

class SurveySerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True)
    university = serializers.PrimaryKeyRelatedField(queryset=University.objects.all(), required=False)
    university_name = serializers.CharField(write_only=True, required=False)
    actual_submissions = serializers.SerializerMethodField()
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = [
            'id',
            'title',
            'description',
            'reason',
            'university',
            'university_name',
            'language',
            'duration_days',
            'min_duration_minutes',
            'max_duration_minutes',
            # 'choice_set',
            'creator',
            'created_at',
            'required_submissions',
            'actual_submissions',
            'questions',
            'is_published'
        ]
        read_only_fields = ['id', 'creator', 'created_at']
    
    def validate(self, attrs):
        university = attrs.get('university')
        university_name = attrs.get('university_name')

        if not university and not university_name:
            raise serializers.ValidationError({
                'university': 'This field is required if university_name is not provided.',
                'university_name': 'This field is required if university is not provided.'
            })

        return attrs

    def get_actual_submissions(self, obj):
        return obj.solved_entries.count()

    def create(self, validated_data):
        user = self.context['request'].user
        university_name = validated_data.pop('university_name', None)

        if university_name:
            university, _ = University.objects.get_or_create(name=university_name)
            validated_data['university'] = university

        return Survey.objects.create(creator=user, **validated_data)

    




class QuestionSerializerDisplay(serializers.ModelSerializer):
    question_text = serializers.CharField(source='text')
    type = serializers.CharField(source='question_type')
    options = serializers.SerializerMethodField()
    scale_min_label = serializers.CharField()
    scale_max_label = serializers.CharField()

    class Meta:
        model = Question
        fields = [
            'id',
            'question_text',
            'type',
            'scale_min_label',
            'scale_max_label',
            'options'
        ]

    def get_options(self, obj):
        if obj.question_type == 'multiple_choice':
            return ChoiceSerializer(obj.choices.all(), many=True).data
        return None
    
class SolvedSurveySerializer(serializers.ModelSerializer):
    survey_title = serializers.CharField(source='survey.title', read_only=True)
    freelancer_email = serializers.EmailField(source='freelancer.email', read_only=True)
    survey_id = serializers.IntegerField(source='survey.id', read_only=True)
    freelancer_id = serializers.IntegerField(source='freelancer.id')

    class Meta:
        model = SolvedSurvey
        fields = ['id', 'survey_title', 'freelancer_email', 'submitted_at','survey_id','freelancer_id']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)  # Include country name inside city

    class Meta:
        model = City
        fields = ['id', 'name', 'country']

class FieldOfStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldOfStudy
        fields = ['id', 'name']

class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['id', 'name']

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    city = CitySerializer(read_only=True)
    field_of_study = FieldOfStudySerializer(read_only=True)
    profession = ProfessionSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'user',           # nested user info
            'age',
            'gender',
            'date_of_birth',
            'country',
            'city',
            'field_of_study',
            'profession',
            'university',
            'role',          # <-- comes from UserProfile model
            'email',
            'is_verified',
        ]

class DemographicSerializer(serializers.ModelSerializer):
    countries = serializers.PrimaryKeyRelatedField(many=True, queryset=Country.objects.all())
    universities = serializers.PrimaryKeyRelatedField(many=True, queryset=University.objects.all())
    fields_of_study = serializers.PrimaryKeyRelatedField(many=True, queryset=FieldOfStudy.objects.all())
    professions = serializers.PrimaryKeyRelatedField(many=True, queryset=Profession.objects.all())

    class Meta:
        model = Demographic
        fields = '__all__'
        extra_kwargs = {
            'countries': {'required': False},
            'universities': {'required': False},
            'fields_of_study': {'required': False},
            'professions': {'required': False},
        }

    def validate(self, data):
        request_data = self.context.get('request').data

        # Countries
        country_input = request_data.get('country')
        if country_input == 'all':
            data['countries'] = Country.objects.all()
        elif isinstance(country_input, list):
            data['countries'] = Country.objects.filter(id__in=country_input)
        elif country_input:
            data['countries'] = Country.objects.filter(id=country_input)
        else:
            data['countries'] = []

        # Fields of Study
        field_input = request_data.get('field_of_study')
        if field_input == 'all':
            data['fields_of_study'] = FieldOfStudy.objects.all()
        elif isinstance(field_input, list):
            data['fields_of_study'] = FieldOfStudy.objects.filter(id__in=field_input)
        elif field_input:
            data['fields_of_study'] = FieldOfStudy.objects.filter(id=field_input)
        else:
            data['fields_of_study'] = []

        # Professions
        profession_input = request_data.get('profession')
        if profession_input == 'all':
            data['professions'] = Profession.objects.all()
        elif isinstance(profession_input, list):
            data['professions'] = Profession.objects.filter(id__in=profession_input)
        elif profession_input:
            data['professions'] = Profession.objects.filter(id=profession_input)
        else:
            data['professions'] = []

        # Universities
        university_input = request_data.get('university')
        if university_input == 'all':
            data['universities'] = University.objects.all()
        elif isinstance(university_input, list):
            data['universities'] = University.objects.filter(id__in=university_input)
        elif university_input:
            data['universities'] = University.objects.filter(id=university_input)
        else:
            data['universities'] = []

        return data
class SurveyDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializerDisplay(many=True, read_only=True)
    demographic = DemographicSerializer()
    user_role = serializers.SerializerMethodField()



    class Meta:
        model = Survey
        fields = ['id', 'title', 'description', 'questions','language','min_duration_minutes','max_duration_minutes','demographic','user_role']
    
    def get_user_role(self, obj):
        request = self.context.get('request')
        if request and hasattr(request.user, 'userprofile'):
            return request.user.userprofile.role
        return None
class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)
    survey = SurveySerializer(read_only=True)
    freelancer = serializers.StringRelatedField()  # shows username
    question_id = serializers.IntegerField(source='question.id', read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'question_id','question', 'survey', 'freelancer', 'answer_text', 'submitted_at']
