from django.contrib import admin
from .models import Screenshot, Subscriber, Team, Testimonial, Counter


admin.site.register(Counter)
admin.site.register(Screenshot)
admin.site.register(Team)
admin.site.register(Testimonial)
admin.site.register(Subscriber)
