release: python manage.py makemigrations
release: python manage.py migrate
release: python manage.py createuser staff --email staff@email.com --password password
web: gunicorn SabPadLIMS.wsgi --log-file -
