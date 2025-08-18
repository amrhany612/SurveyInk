from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('countries/', CountryListAPIView.as_view(), name='countries-list'),
    path('fields_of_study/', FieldOfStudyListAPIView.as_view(), name='fields-of-study-list'),
    path('professions/', ProfessionListAPIView.as_view(), name='professions-list'),
    path('cities/',CityListAPIView.as_view(),name="city-list"),
    path('universities/', UniversityListAPIView.as_view(), name='university-list'),
    path('signup/<str:role>/', signup_view,name='SignUp'),
    path('verify-email/<int:uid>/<str:token>/', verify_email, name='verify_email'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('check-auth/', CheckAuthView.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
    path('submit/', submit_service_request),
    path('logout/',logout_view)




]
