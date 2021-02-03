from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from django.db import models


class UserManager(BaseUserManager):
    """
    A class used to represent a UserManager object
    """

    def create_user(self, username, password, email=None):
        """
        Creates and saves a User with the given email and password.

        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_user('username', 'password', 'email@email.com')

        """
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, username, email, password):
        """
        Creates and saves a staff user with the given email and password.

        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_staffuser('username', 'password', 'email@email.com')

        """
        user = self.create_user(
            username,
            password,
            email=email,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_specialist(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.

        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_specialist('username', 'password', 'email@email.com')

        """
        user = self.create_user(
            username,
            password,
            email=email
        )
        user.staff = True
        user.specialist = True
        user.save(using=self._db)
        return user

    def create_counselor(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.

        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_counselor('username', 'password', 'email@email.com')

        """
        user = self.create_user(
            username,
            password,
            email=email
        )
        user.staff = True
        user.specialist = True
        user.counselor = True
        user.save(using=self._db)
        return user

    def create_scientist(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.
        
        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_scientist('username', 'password', 'email@email.com')

        """
        user = self.create_user(
            username,
            password,
            email=email
        )
        user.staff = True
        user.specialist = True
        user.counselor = True
        user.scientist = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.

        Args:
            username (str): User's username
            email (str): User's email
            password (str): User's password
        
        Returns: User

        >>> userManager = UserManager()
        >>> userManager.create_superuser('username', 'password', 'email@email.com')

        """
        user = self.create_user(
            username,
            password,
            email=email
        )
        user.staff = True
        user.specialist = True
        user.counselor = True
        user.scientist = True
        user.admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    A class used to represent a User object

    Attributes:
        username (models.CharField): User's username
        email (models.EmailField): User's email
        active (models.BooleanField): User's active status
        is_active (models.BooleanField): User's active status
        staff (models.BooleanField): User's active status
        specialist (models.BooleanField): User's specialist status
        counselor (models.BooleanField): User's counselor status
        scientist (models.BooleanField): User's scientist status
        admin (models.BooleanField): User's admin status
        objects (UserManager): Connection to user manager object
    """

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(verbose_name='email address', max_length=255, null=True)
    active = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    specialist = models.BooleanField(default=False)
    counselor = models.BooleanField(default=False)
    scientist = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        """
        The user is identified by their email address

        Returns: str
        """
        return self.email

    def get_short_name(self):
        """
        The user is identified by their email address

        Returns: str
        """
        return self.email

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return self.username

    @property
    def is_staff(self):
        """
        The user staff status is returned

        Returns: bool
        """
        return self.staff

    @property
    def is_scientist(self):
        """
        The user scientist status is returned

        Returns: bool
        """
        return self.scientist

    @property
    def is_counselor(self):
        """
        The user counselor status is returned

        Returns: bool
        """
        return self.counselor

    @property
    def is_specialist(self):
        """
        The user specialist status is returned

        Returns: bool
        """
        return self.specialist

    @property
    def is_admin(self):
        """
        The user admin status is returned

        Returns: bool
        """
        return self.admin


if __name__ == '__main__':
    import doctest
    doctest.testmod()
