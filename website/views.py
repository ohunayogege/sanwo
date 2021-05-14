from django.http.response import HttpResponse
from website.models import Partner, Team, Counter, Testimonial, Subscriber
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.template.loader import render_to_string, get_template
from django.core.mail import message, send_mail, EmailMultiAlternatives
import os
import random
from .utils import details_from_bvn, compare_dates
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


def home(request):
    teams = Team.objects.all()[:4]
    counters = Counter.objects.all()
    testimonies = Testimonial.objects.all()
    partners = Partner.objects.all().reverse()
    context = {
        'teams': teams,
        'counters': counters,
        'testimonies': testimonies,
        'partners': partners
    }
    return render(request, 'index.html', context)


def unsubscribe(request):
    user_code = request.GET.get("newsUser", None)
    if user_code:
        userCode = user_code
        context = {
            "userCode": userCode
        }
        return render(request, 'unsubscribe.html', context)
    return HttpResponse("We could not understand your request. Please follow the link on your email")


def activate_user(request):
    activation = request.GET.get("signature", None)
    if activation:
        userCode = activation
        context = {
            "userCode": userCode
        }
        return render(request, 'activate.html', context)
    return HttpResponse("We could not understand your request. Please follow the link on your email")

def newsletter(request):
    if request.is_ajax():
        email = request.POST.get("email", None)
        firstname = request.POST.get("firstname", None)
        lastname = request.POST.get("lastname", None)
        if email:
            check_email = Subscriber.objects.filter(email=email).exists()
            if check_email == True:
                response = {"error": "You are subscribed already."}
                return JsonResponse(response)
            
            site_name = settings.SITE_NAME
            subject_file = os.path.join(settings.BASE_DIR, "mail/newsletter-subscribe/subject.txt")
            subject = render_to_string(subject_file, {'site_name': site_name})
            from_email = settings.DEFAULT_EMAIL_SENDER
            to_email = [email]
            d_message = os.path.join(settings.BASE_DIR, "mail/newsletter-subscribe/body.txt")
            nmessage = render_to_string(d_message, {
		                                            'site_name': site_name, 'name': "name",
		                                            'email': email
		                                        })
            messages = EmailMultiAlternatives(subject=subject, body=nmessage, from_email=from_email, to=to_email)
            html_template = os.path.join(settings.BASE_DIR, "mail/newsletter-subscribe/body.html")
            template = render_to_string(html_template, {
			                                                'site_name': site_name, 'name': "name",
		                                                    'email': email
			                                            })
            messages.attach_alternative(template, "text/html")
            messages.send()    
            
            Subscriber.objects.create(email=email)
            response = {"success": "You have successfully subscribed to our newsletter. Check your email for more information."}
            return JsonResponse(response)
        else:
            response = {"error": "There was an error. Try again later."}
            return JsonResponse(response)


def contact(request):
    if request.is_ajax():
        name = request.POST.get("name", None)
        email = request.POST.get("email", None)
        subject = request.POST.get("subject", None)
        cmessage = request.POST.get("message", None)
        if email and subject and cmessage and name:
            site_name = settings.SITE_NAME
            subject_file = os.path.join(settings.BASE_DIR, "mail/contact/subject.txt")
            subject = render_to_string(subject_file, {'site_name': site_name})
            from_email = settings.DEFAULT_EMAIL_SENDER
            to_email = [email]
            d_message = os.path.join(settings.BASE_DIR, "mail/contact/body.txt")
            nmessage = render_to_string(d_message, {
		                                            'site_name': site_name, 'name': name,
		                                            'email': email, 'message': message
		                                        })
            messages = EmailMultiAlternatives(subject=subject, body=nmessage, from_email=from_email, to=to_email)
            html_template = os.path.join(settings.BASE_DIR, "mail/contact/body.html")
            template = render_to_string(html_template, {
			                                                'site_name': site_name, 'name': name,
		                                                    'email': email, 'message': message
			                                            })
            messages.attach_alternative(template, "text/html")
            messages.send()    
            
            response = {"success": "Your message have been sent successfully. You will be notified as soon as we get your message"}
            return JsonResponse(response)
        else:
            response = {"error": "There was an error. Try again later."}
            return JsonResponse(response)

def teams(request):
    return render(request, 'team.html')

def cookie_policy(request):
    return render(request, 'cookies-policy.html')

def dcma(request):
    return render(request, 'dcma.html')

def privacy_policy(request):
    return render(request, 'privacy-policy.html')

def terms_condition(request):
    return render(request, 'terms-conditions.html')


def agent(request):
    return render(request, 'agents.html')

class RunBvnCheck(APIView):
	def post(self, request):
		bvn = request.data.get("bvn")
		dob = request.data.get("dob")
		reference_no = 'loanx' + str(random.randint(100000000, 999999999))
		rez = details_from_bvn(bvn, reference_no)
		if rez == False:
			return Response({"message": "Error BVN Details"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			dob_check = (compare_dates(rez['date_of_birth'], dob))
			if not dob_check:
				return Response({"message": "non-matching credentials provided"},
							status=status.HTTP_400_BAD_REQUEST)
		
			return Response({"message": rez}, status=status.HTTP_200_OK)