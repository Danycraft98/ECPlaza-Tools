from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin
)
from django.db import models


class Product(models.Model):
    """
    A class used to represent a User object
    """
    app_name = models.CharField(max_length=30)
    images = models.CharField(max_length=150, unique=True)  # models.FileField(verbose_name='images', upload_to='static/uploads/')
    name = models.CharField(max_length=150, unique=True)
    options = models.CharField(max_length=150)
    details = models.CharField(max_length=150)

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return self.app_name + ': ' + self.name


if __name__ == '__main__':
    import doctest

    doctest.testmod()
