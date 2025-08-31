from django.shortcuts import render
from .models import Education,Experience,Project,Skill
# Create your views here.

def home(request):
    education = Education.objects.all()
    experience = Experience.objects.all()
    projects = Project.objects.all()
    skills = Skill.objects.all()

    return render(request, "portfolio/home.html", {
        "education" : education,
        "experience" : experience,
        "projects" : projects,
        "skills" : skills
    })
