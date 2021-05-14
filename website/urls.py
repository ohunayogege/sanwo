from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name="home"),
    url(r'^newsletter-subscribe/$', views.newsletter, name="newsletter_subscribe"),
    url(r'^contact_us/$', views.contact, name="contact_us"),
    url(r'^our-teams/$', views.teams, name="teams"),
    url(r'^cookie-policy/$', views.cookie_policy, name="cookies"),
    url(r'^privacy-policy/$', views.privacy_policy, name="privacy"),
    url(r'^dcma/$', views.dcma, name="dcma"),
    url(r'^terms-and-condition/$', views.terms_condition, name="terms"),
    url(r'^agents/$', views.agent, name="agents"),

    url(r'^newsletter/unsubscribe$', views.unsubscribe, name="unsubscribe"),
    url(r'^registration/activation/$', views.activate_user, name="activate_user"),
]
