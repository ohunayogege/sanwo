from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, default='')
    photo = models.ImageField(upload_to="teams")
    position = models.CharField(max_length=100, default='')
    quote = models.CharField(max_length=500, default='')

    fb = models.CharField(max_length=100, blank=True, default='#')
    tw = models.CharField(max_length=100, blank=True, default='#')
    li = models.CharField(max_length=100, blank=True, default='#')
    ig = models.CharField(max_length=100, blank=True, default='#')
    web = models.CharField(max_length=100, blank=True, default='#')

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    name = models.CharField(max_length=100, default='')
    testimony = models.TextField(default='')
    job_title = models.CharField(max_length=100, default='', blank=True)
    photo = models.ImageField(upload_to="testimonials")

    def __str__(self):
        return self.name


class Screenshot(models.Model):
    name = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to="screenshots")

    def __str__(self):
        return self.name


class Counter(models.Model):
    customers = models.IntegerField(default=4302)
    downloads = models.IntegerField(default=0)
    satisfied = models.IntegerField(default=23102)
    cup_of_tea = models.IntegerField(default=2302)

    def __str__(self):
        return "Counters"


class Subscriber(models.Model):
    email = models.EmailField(max_length=100, default='')
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.email
