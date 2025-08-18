from django.urls import path
from .views import *

urlpatterns = [
    path('stats/', admin_stats),
    path('researchers/', list_researchers),
    path('freelancers/', list_freelancers),
    path('surveys/', AdminSurveyListCreateView.as_view(), name='admin-survey-list'),
    path('surveys/<int:pk>/', AdminSurveyDetailView.as_view(), name='admin-survey-detail'),
    path('surveys/<int:pk>/delete/', delete_survey, name='admin-survey-delete'),
    path('login-history/', login_history_view),
    path('notifications/', admin_notifications_view),
    path('email-logs/', email_logs_view),
    path('users/<int:user_id>/toggle-block', toggle_user_block),
    path('users/<int:id>', DeleteUserView.as_view(), name='delete-user'),





]
