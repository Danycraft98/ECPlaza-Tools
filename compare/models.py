from django.db import models


class Document(models.Model):
    document = models.FileField(verbose_name='file', upload_to='static/uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document.name.split('/')[-1]
