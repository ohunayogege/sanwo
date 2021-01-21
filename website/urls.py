from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name="home"),
    url(r'^newsletter-subscribe/$', views.newsletter, name="newsletter_subscribe"),
    url(r'^contact_us', views.contact, name="contact_us"),
]
