from django.contrib import admin
from .models import Survey, Question, Answer, Respondent, Response, Soron


admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Respondent)
admin.site.register(Response)
admin.site.register(Soron)

# Register your models here.
