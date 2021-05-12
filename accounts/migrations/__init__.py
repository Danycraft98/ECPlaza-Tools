from django.contrib.auth.hashers import make_password


def add_users(apps, _schema_editor):
    """
    apps: ? Used; to get apps
    _schema_editor: ?; not used parameter
    return:
    Initialize User models.
    """
    User = apps.get_model('accounts', 'User')
    User.objects.get_or_create(username='admin', email='admin@ecplaza.com', password=make_password('ecptools_admin', hasher='pbkdf2_sha256'), active=True, is_active=True, staff=True, admin=True, is_superuser=True)
    User.objects.get_or_create(username='staff', email='staff@ecplaza.com', password=make_password('ecptools_staff', hasher='pbkdf2_sha256'), active=True, is_active=True, staff=True, admin=False, is_superuser=False)
