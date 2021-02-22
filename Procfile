release: python -m pip install https://github.com/mmoore7/ChatterBot.git
release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn ECPlazaTools.wsgi --log-file -
