from django.contrib import admin

from .forms import CatalogForm, ProductForm
from .models import *


class ProductAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    form = CatalogForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('name', 'images', 'options', 'details')
    list_filter = ('name',)
    fieldsets = (
        (None, {'fields': ('name', 'images', 'options', 'details')}),
    )

    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name',)}
         ),
    )
    search_fields = ('name',)
    ordering = ('name',)
    filter_horizontal = ()


class ProductInLine(admin.TabularInline):
    model = Product
    form = ProductForm
    search_fields = ('name',)
    ordering = ('name',)
    fieldsets = (
        ('Items', {'fields': ('name', 'images', 'options', 'details')}),
    )


class CatalogAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    form = CatalogForm
    inlines = [ProductInLine]

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('app_name',)
    list_filter = ('app_name',)
    fieldsets = (
        (None, {'fields': ('app_name',)}),
    )

    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('app_name',)}
         ),
    )
    search_fields = ('app_name',)
    ordering = ('app_name',)
    filter_horizontal = ()


admin.site.register(Catalog, CatalogAdmin)
admin.site.register(Product, ProductAdmin)
