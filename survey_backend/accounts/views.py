import token
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import generics,permissions
from .models import Country, FieldOfStudy, LoginHistory, Notification, Profession,City,University, UserProfile
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .authentication import CookieJWTAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie
from .utils import *
from django.core.mail import EmailMessage
from rest_framework.permissions import IsAdminUser
from django.db.models import Q
from django.contrib.auth import authenticate, login
import json
from django.views.decorators.csrf import csrf_exempt
from django.middleware import csrf
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


def set_auth_cookies(response, refresh, access):
    # You can customize expiry and secure/httponly settings here
    response.set_cookie(
        key='access_token',
        value=str(access),
        httponly=True,
        secure=False,  # Set to True in production
        samesite='Lax'
    )
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=False,
        samesite='Lax'
    )
@ensure_csrf_cookie
def csrf_cookie_view(request):
    return JsonResponse({'message': 'CSRF cookie set'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    def get(self, request):
        return Response({'message': 'CSRF token set'})
    
# class LoginView(APIView):
#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             login(request, user)  # تبدأ الـ session

#             # جلب الـ role من البروفايل
#             try:
#                 profile = UserProfile.objects.get(user=user)
#                 role = profile.role
#             except UserProfile.DoesNotExist:
#                 role = 'user'
#             # إعداد الكوكيز CSRF
#             response = Response({
#                 'message': 'Login successful',
#                 'role': role,
#             }, status=status.HTTP_200_OK)

#             response.set_cookie(
#                 key='csrftoken',
#                 value=csrf.get_token(request),
#                 httponly=False,
#                 secure=False,
#                 samesite='Lax'
#             )
#             return response
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]  # <--- This is required!

    print('test')
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print('Hany')
        # Try to get user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Check password
        if not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        # Optional: Get role from user profile
        try:
            profile = user.userprofile
            role = profile.role
        except:
            role = 'user'

        response = Response({
            'message': 'Login successful',
            'role': role,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': role,
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)

        # Set JWT in HttpOnly cookies
        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=False,  # True if HTTPS
            samesite='Lax'
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax'
        )
        response.set_cookie(
            key='csrftoken',
            value=csrf.get_token(request),
            httponly=False,
            secure=False
        )

        return response

# class CheckAuthView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         return Response({'authenticated': True, 'user': request.user.username})
       
# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get("password")
#         try:
#             user_obj = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({'error': 'Invalid credentials'}, status=401)

#         user = authenticate(username=user_obj.username, password=password)
#         if user is None:
#             return Response({'error': 'Invalid credentials'}, status=401)
#         user_profile = UserProfile.objects.get(user=user_obj)

#         if not user_profile.is_verified:
#             return Response({'error': 'Email is not verified. Please check your inbox.'}, status=403)

#         if user:
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)
#             role = getattr(user_profile, 'role', None)  # or user.role if role is on user model
#             print(access_token)
#             response = Response({"message": "Login successful" , "role":role})
#             response.set_cookie(
#                 key="access_token",
#                 value=access_token,
#                 httponly=True,
#                 samesite='Lax',
#                 secure=False,  # Set to True in production (HTTPS)
#             )
#             return response
#         return Response({"error": "Invalid credentials"}, status=401)

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         try:
#             user_obj = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({'error': 'Invalid credentials'}, status=401)

#         user = authenticate(username=user_obj.username, password=password)
#         if user is None:
#             return Response({'error': 'Invalid credentials'}, status=401)

#         user_profile = UserProfile.objects.get(user=user_obj)

#         if not user_profile.is_verified:
#             return Response({'error': 'Email is not verified. Please check your inbox.'}, status=403)

#         refresh = RefreshToken.for_user(user)
#         access = refresh.access_token

#         # Here, get the role
#         role = getattr(user_profile, 'role', None)  # or user.role if role is on user model

#         response = Response({
#             'message': 'Login successful',
#             'role': role,
#         })
#         response.set_cookie(
#             key='access_token',
#             value=token,
#             httponly=True,
#             samesite='Lax',
#             secure=False
#         )
#         set_auth_cookies(response, refresh, access)
#         return response



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request, role):  # accept `role` from URL
    request_data = request.data.copy()
    request_data['role'] = role
    serializer = UserRegistrationSerializer(data=request_data, context={'request': request})
    try:
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message": "Registered. Check your email to verify your account."}, status=201)
    except Exception as e:
        import traceback
        print("❌ Signup Exception:", str(e))
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
@api_view(['GET'])
def verify_email(request, uid, token):
    try:
        user = User.objects.get(pk=uid)
        user_profile = UserProfile.objects.get(user=user)
    except User.DoesNotExist:
        return Response({"error": "Invalid user"}, status=400)

    if default_token_generator.check_token(user, token):
        user_profile.is_verified = True
        user_profile.save()
        return Response({"message": "Email verified successfully."})
    else:
        return Response({"error": "Invalid or expired token"}, status=400)

class CountryListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # 👈 Public access

    queryset = Country.objects.all()
    serializer_class = CountrySerializer



class FieldOfStudyListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # 👈 Public access

    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudySerializer


class ProfessionListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # 👈 Public access

    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class CityListAPIView(generics.ListAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        country_name = self.request.query_params.get('country')
        print(country_name)
        if country_name:
            return City.objects.filter(country__name=country_name)
        return "No city found"
    
class UniversityListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # 👈 Public access

    queryset = University.objects.all().order_by('name')
    serializer_class = UniversitySerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.session.flush()
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_service_request(request):
    service_type = request.data.get('service_type')
    file = request.FILES.get('file')
    message = request.data.get('message', '')

    if not service_type:
        return Response({'error': 'Service type is required.'}, status=status.HTTP_400_BAD_REQUEST)

    service_request = ServiceRequest.objects.create(
        user=request.user,
        service_type=service_type,
        uploaded_file=file,
        message=message
    )

    # Get all admin users
    admin_users = User.objects.filter(is_staff=True)
    admin_emails = [admin.email for admin in admin_users if admin.email]

    if admin_emails:
        email_body = f"New request for {service_type.upper()} from {request.user.email}\n\nMessage:\n{message}"
        email = EmailMessage(
            subject=f'New {service_type.capitalize()} Request',
            body=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=admin_emails,
        )

        if file:
            file.open()  # ✅ Ensure the stream is at the beginning
            email.attach(file.name, file.read(), file.content_type)

        email.send()

    for admin in admin_users:
        Notification.objects.create(
            user=admin,
            message=f"New {service_type.capitalize()} request from {request.user.username}"
        )
        EmailLog.objects.create(
            recipient=admin,
            subject=f"New request for {service_type.upper()} from {request.user.email}",
            message=message,
            status='sent'
        )

    return Response({'success': 'Request submitted successfully.'})


