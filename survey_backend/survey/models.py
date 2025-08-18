from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from accounts.models import Country, FieldOfStudy, Profession, University

LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ar', 'Arabic'),
    ]
REASON_CHOICES = [
        ('bachelor', "Bachelor"),
        ('masters', "Master’s"),
        ('phd', "PhD"),
        ('research', "Research Paper"),
        ('market', "Market Research"),
]
# Create your models here.
class Survey(models.Model):


    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_surveys')
    title = models.CharField(max_length=200)
    description = models.TextField()
    university = models.ForeignKey(University, on_delete=models.CASCADE,null=True)  # <--- only one university
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en',null=True)
    reason = models.CharField(max_length=20, choices=REASON_CHOICES,null=True)

    duration_days = models.IntegerField()
    min_duration_minutes = models.PositiveIntegerField(default=1)
    max_duration_minutes = models.PositiveIntegerField(default=3)
    created_at = models.DateTimeField(default=timezone.now)
    choice_set = models.TextField(help_text="Enter choices separated by commas, e.g., ممتاز,ممتاز جداً,عادي")
    required_submissions = models.PositiveIntegerField(default=1)  
    is_published = models.BooleanField(default=False)

    def is_solved(self):
        return self.solved_entries.count() >= self.required_submissions  
    
class SolvedSurvey(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='solved_entries')
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solved_surveys')

    submitted_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('survey', 'freelancer')  # Each freelancer can solve a survey once

    def __str__(self):
        return f"{self.freelancer.username} solved {self.survey.title}"

class Question(models.Model):
    survey = models.ForeignKey(Survey, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=500)

    QUESTION_TYPES = (
        ('multiple_choice', 'Multiple Choice'),
        ('text', 'Text'),
        ('scale','Scale'),
    )
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)

    scale_min_label = models.CharField(max_length=100, blank=True, null=True)
    scale_max_label = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.text
class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE)  # The user who answered
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    answer_text = models.TextField()  # Could be option text or free text
    submitted_at = models.DateTimeField(auto_now_add=True)

class Demographic(models.Model):
    survey = models.OneToOneField(Survey, on_delete=models.CASCADE, related_name='demographic')

    countries = models.ManyToManyField(Country, blank=True)
    universities = models.ManyToManyField(University, blank=True)
    fields_of_study = models.ManyToManyField(FieldOfStudy, blank=True)
    professions = models.ManyToManyField(Profession, blank=True)

    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')],null=True,blank=True)
    age_min = models.PositiveIntegerField(null=True,blank=True)
    age_max = models.PositiveIntegerField(null=True,blank=True)
    income_min = models.PositiveIntegerField(null=True,blank=True)
    income_max = models.PositiveIntegerField(null=True,blank=True)

    def __str__(self):
        return f"Demographic for {self.survey.title}"
