from django.contrib import admin
from .models import Country, City, FieldOfStudy, Profession, UserProfile,LoginHistory

admin.site.register(Country)
admin.site.register(City)
admin.site.register(FieldOfStudy)
admin.site.register(Profession)

admin.site.register(UserProfile)
admin.site.register(LoginHistory)
