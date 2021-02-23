release: python -m spacy download en
release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn ECPlazaTools.wsgi --log-file -
