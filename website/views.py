from website.models import Team, Counter, Testimonial, Subscriber
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.template.loader import render_to_string, get_template
from django.core.mail import message, send_mail, EmailMultiAlternatives
import os


def home(request):
    teams = Team.objects.all()[:4]
    counters = Counter.objects.all()
    testimonies = Testimonial.objects.all()
    context = {
        'teams': teams,
        'counters': counters,
        'testimonies': testimonies
    }
    return render(request, 'index.html', context)


def newsletter(request):
    if request.is_ajax():
        email = request.POST.get("email", None)
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
