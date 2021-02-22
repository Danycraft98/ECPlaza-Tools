release: python -m spacy en_core_web_sm
release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn ECPlazaTools.wsgi --log-file -
