from django.urls import path
from .views import *

university_list = UniversityViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('researcher-dashboard', researcher_dashboard_stats, name='researcher-dashboard'),
    path('create-survey/', CreateSurveyAPIView.as_view(), name='create-survey'),
    path('surveys/<int:survey_id>/questions/bulk_create', SurveyQuestionsBulkCreateView.as_view(), name='survey-questions-bulk-create'),
    path('all-surveys/', AllSurveysView.as_view(), name='survey-list-create'),
    path('survey/<int:survey_id>/submissions/', survey_submissions),
    path('submission/<int:submission_id>/accept/', accept_submission),
    path('submission/<int:submission_id>/reject/', reject_submission),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('get-university',university_list,name="got_universities"),
    path('surveys/<int:pk>/display/', SurveyDisplayView.as_view(), name='survey-display'),
    path('survey/<int:survey_id>/analysis/', survey_response_analysis, name='survey_response_analysis'),
    path('freelancer-dashboard/', FreelancerDashboardAPIView.as_view(), name='freelancer-dashboard'),
    path('researcher/surveys/<int:pk>/', SurveyDetailUpdateAPIView.as_view(), name='survey-detail-update'),
    path('researcher/surveys/<int:survey_id>/questions/', survey_questions, name='survey-questions'),
    path('surveys/solved/', solved_surveys),
    path('surveys/pending/', pending_surveys),
    path('surveys/<int:id>/submit/', submit_survey),
    path('surveys/<int:survey_id>/demographics/', SurveyDemographicsAPIView.as_view(), name='create-demographic'),
    path('surveys/solved/<int:survey_id>/',solved_survey_detail),
    path('survey/<int:survey_id>/submission/<int:freelancer_id>/', FreelancerSurveySubmissionView.as_view()),
    path('surveys/<int:survey_id>/demographics/', SurveyDemographicsAPIView.as_view(), name='survey-demographics'),
    path('unpublished-surveys/', unpublished_surveys, name='unpublished-surveys'),
    path('publish-survey/<int:pk>/', publish_survey, name='publish-survey'),
    path('surveys/unpublished-count/', UnpublishedSurveyCount.as_view(), name='unpublished-survey-count'),







]
