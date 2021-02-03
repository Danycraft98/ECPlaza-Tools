# Generated by Django 3.1.6 on 2021-02-03 02:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lims', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module', models.CharField(max_length=50)),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('created', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Module_created', to=settings.AUTH_USER_MODEL)),
                ('updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Module_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=50, null=True)),
                ('phone', models.CharField(default='', max_length=20, null=True)),
                ('address', models.CharField(blank=True, max_length=150, null=True)),
                ('status', models.CharField(blank=True, max_length=10, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='profile/')),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=50)),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('created', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Role_created', to=settings.AUTH_USER_MODEL)),
                ('updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Role_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Scope',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query_set', models.TextField(blank=True, null=True)),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('created', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Scope_created', to=settings.AUTH_USER_MODEL)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scope_Module', to='users.module')),
                ('scope_module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scope_scopemodule', to='users.module')),
                ('updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Scope_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RolePermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create', models.BooleanField(default=False)),
                ('read', models.BooleanField(default=True)),
                ('update', models.BooleanField(default=False)),
                ('delete', models.BooleanField(default=False)),
                ('type', models.CharField(choices=[('FullAccess', 'FullAccess'), ('ReadOnly', 'ReadOnly'), ('OnlyOwner', 'OnlyOwner'), ('OnlyCreated', 'OnlyCreated'), ('OnlySuperAdmin', 'OnlySuperAdmin')], default='FullAccess', max_length=50)),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('created', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='RolePersission_created', to=settings.AUTH_USER_MODEL)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rolepermission_module', to='users.module')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rolepermission_role', to='users.role')),
                ('updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='RolePersission_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileRole',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_updated', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('created', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='ProfileRole_created', to=settings.AUTH_USER_MODEL)),
                ('depertment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profilerole_depertment', to='lims.section')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profilerole_role', to='users.role')),
                ('updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='ProfileRole_updated', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profilerole_profile', to='users.profile')),
            ],
        ),
    ]
