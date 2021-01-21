from website.models import Team
from django.shortcuts import render


def home(request):
    teams = Team.objects.all()
    context = {
        'teams': teams
    }
    return render(request, 'index.html', context)
