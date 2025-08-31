from django.db import models

# Create your models here.
class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_year = models.IntegerField()
    end_year = models.IntegerField()

    def __str__(self):
        return f"{self.degree} at {self.institution} from {self.start_year} to {self.end_year}"
    
class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True,blank=True)

    def __str__(self):
        return f"{self.title} at {self.company} worked on {self.description} from {self.start_date} to {self.end_date}"
    
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(null=True,blank=True)

    def __str__(self):
        return f"{self.title}: {self.description} ({self.link})"

class Skill(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(help_text="Percentage (0 - 100)")

    def __str__(self):
        return f"{self.name} : {self.proficiency}"