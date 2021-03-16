from django.contrib import admin
from .models import Partner, Screenshot, Subscriber, Team, Testimonial, Counter


admin.site.register(Counter)
admin.site.register(Screenshot)
admin.site.register(Team)
admin.site.register(Testimonial)
admin.site.register(Subscriber)
admin.site.register(Partner)
