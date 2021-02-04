release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn SabPadLIMS.wsgi --log-file -
release: python manage.py createuser staff --email staff@email.com --password password
