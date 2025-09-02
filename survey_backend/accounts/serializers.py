# serializers.py

from django.conf import settings
from django.forms import ValidationError
from rest_framework import serializers
from .models import Country, EmailLog, FieldOfStudy, LoginHistory, Notification, Profession,City, ServiceRequest,University,UserProfile
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.template.loader import render_to_string
from django.contrib.auth import authenticate

import re
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class FieldOfStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldOfStudy
        fields = ['id', 'name']


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['id', 'name']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id","name"]
class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name']



class UserRegistrationSerializer(serializers.Serializer):
    First_name = serializers.CharField()
    Last_name = serializers.CharField()
    Email = serializers.EmailField()
    Password = serializers.CharField(write_only=True)
    Confirm_password = serializers.CharField(write_only=True)
    Age = serializers.IntegerField(required=False)
    Gender = serializers.ChoiceField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], required=False)
    Date_of_birth = serializers.DateField(required=False)
    Country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), required=False)
    City = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(),allow_null=True, required=False)
    Field_of_study = serializers.PrimaryKeyRelatedField(queryset=FieldOfStudy.objects.all(), required=False)
    Profession = serializers.PrimaryKeyRelatedField(queryset=Profession.objects.all(), required=False)
    University = serializers.PrimaryKeyRelatedField(queryset=University.objects.all(), required=False)
    role = serializers.ChoiceField(choices=[("researcher", "researcher"), ("freelancer", "freelancer")])

    def validate(self, data):
        if data['Password'] != data['Confirm_password']:
            raise serializers.ValidationError({"Confirm_password": "Passwords do not match."})
        return data

    def validate_Password(self, value):
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', value):
            raise serializers.ValidationError("Password must be at least 8 characters long and include upper, lower, digit, and special char.")
        return value
    def create(self, validated_data):
        password = validated_data.pop('Password')
        validated_data.pop('Confirm_password')

        username = validated_data['Email']

        if User.objects.filter(username=username).exists():
            raise ValidationError({"Email": "User with this email already exists."})

        user = User.objects.create_user(
            username=username,
            email=username,
            first_name=validated_data['First_name'],
            last_name=validated_data['Last_name'],
            password=password,
            is_active=True,  # keep active, but check is_verified at login
            
        )

        # Send verification email
        request = self.context.get('request')
        token = default_token_generator.make_token(user)
        uid = user.pk

        frontend_url = "https://survey-ink.com"  # Your React app URL
        verification_link = f"{frontend_url}/verify-email?uid={uid}&token={token}"
        

        # Render HTML email
        html_message = render_to_string('emails/verify_email.html', {
            'user': user,
            'verification_link': verification_link,
            
        })
        print("Hany")
        #send_mail(
          #subject="Verify your email",
          #message="Please verify your email.",   # plain text fallback
          #from_email=settings.DEFAULT_FROM_EMAIL,
          #recipient_list=[user.email],
         # html_message=html_message
        #)
        print("Hany2")
        EmailLog.objects.create(
            recipient=user.email,
            subject="Verification EMail",
            message="New User Added To Your Website",
            status='sent'
        )
        print("Hany3")
        # Create profile
        for field in ['First_name', 'Last_name', 'Email']:
            validated_data.pop(field, None)

        profile_data = {
            'age': validated_data.get('Age'),
            'gender': validated_data.get('Gender'),
            'date_of_birth': validated_data.get('Date_of_birth'),
            'country': validated_data.get('Country'),
            'city': validated_data.get('City'),
            'field_of_study': validated_data.get('Field_of_study'),
            'profession': validated_data.get('Profession'),
            'university': validated_data.get('University'),
            'role': validated_data.get('role'),
            'email': username,
            'is_verified' : False,
        }

        profile = UserProfile.objects.create(user=user, **{k: v for k, v in profile_data.items() if v is not None})

        return profile
    
class LoginHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginHistory
        fields = ['email', 'ip_address', 'status', 'timestamp']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        user = authenticate(username=user.username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data['user'] = user
        return data
    
class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = ['id', 'service_type', 'uploaded_file', 'message']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'is_read']

class EmailLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailLog
        fields = '__all__'
