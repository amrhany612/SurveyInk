from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Survey)
@admin.register(SolvedSurvey)
class SolvedSurveyAdmin(admin.ModelAdmin):
    list_display = ('id', 'survey', 'freelancer', 'submitted_at')  # Show this in admin list view
    list_filter = ['submitted_at']  # Add filters
    search_fields = ('freelancer__username', 'survey__title')  # Add search box
    fields = ('survey', 'freelancer', 'submitted_at')  # Include submitted_at in form

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Demographic)

