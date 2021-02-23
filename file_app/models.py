from django.db import models


class Document(models.Model):
    document = models.FileField(verbose_name='file', upload_to='static/uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document.name.split('/')[-1]


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class Catalog(models.Model):
    """ A class used to represent a User object """
    app_name = models.CharField(max_length=30)

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return self.app_name


class Product(models.Model):
    """ A class used to represent a User object """
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    images = models.CharField(max_length=150)  # models.FileField(verbose_name='images', upload_to='static/uploads/')
    name = models.CharField(max_length=150, unique=True)
    options = models.CharField(max_length=150)
    details = models.CharField(max_length=150)
    image_details = models.CharField(max_length=150)  # models.FileField(verbose_name='images', upload_to='static/uploads/')

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return self.catalog.app_name + ': ' + self.name


if __name__ == '__main__':
    import doctest

    doctest.testmod()
