from django.contrib import admin

from .models import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ('ca_id_extra', 'it_id_extra', 'it_name')
    list_filter = ('ca_id_extra',)
    fieldsets = (
        (None, {'fields': ('ca_id_extra', 'it_id_extra', 'it_name')}),
        ('Price', {'fields': ('it_price', 'it_whole_price')}),
        ('Basic Information', {'fields': ('it_img_json', 'it_url')}),
    )
    search_fields = ('ca_id_extra', 'it_id_extra', 'it_name')


class DetailImageAdmin(admin.StackedInline):
    model = DetailImage


class DetailInfoAdmin(admin.StackedInline):
    model = DetailInfo


class EventAdmin(admin.ModelAdmin):
    list_display = ('contentid', 'contenttypeid', 'title')
    list_filter = ('contenttypeid',)
    fieldsets = (
        (None, {'fields': ('contentid', 'contenttypeid', 'title')}),
        ('Category', {'fields': ('cat1', 'cat2', 'cat3')}),
        ('Basic Information', {'fields': ('homepage', 'readcount', 'telname', 'tel')}),
        ('Address', {'fields': ('addr1', 'areacode', 'sigungucode', 'mapx', 'mapy', 'mlevel')}),
        ('Images', {'fields': ('firstimage', 'firstimage2')}),

    )
    search_fields = ('contentid', 'contenttypeid', 'title')
    inlines = [DetailInfoAdmin, DetailImageAdmin]


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('contentid', 'contenttypeid', 'title')
    list_filter = ('contenttypeid',)
    fieldsets = (
        (None, {'fields': ('contentid', 'contenttypeid', 'title')}),
        ('Category', {'fields': ('cat1', 'cat2', 'cat3')}),
        ('Basic Information', {'fields': ('homepage', 'readcount', 'telname', 'tel')}),
        ('Address', {'fields': ('addr1', 'areacode', 'sigungucode', 'mapx', 'mapy', 'mlevel')}),
        ('Menu', {'fields': ('firstmenu', 'treatmenu')}),
        ('Images', {'fields': ('firstimage', 'firstimage2')}),

    )
    search_fields = ('contentid', 'contenttypeid', 'title')
    # inlines = [DetailInfoAdmin, DetailImageAdmin]


class ItemAdmin(admin.ModelAdmin):
    list_display = ('mall_type', 'mall_name', 'url')
    list_filter = ('mall_type',)
    fieldsets = (
        (None, {'fields': ('mall_type', 'mall_name', 'category')}),
        ('Basic Information', {'fields': ('mall_id', 'url', 'notes', 'quantity', 'delete')}),
        ('Dates', {'fields': ('date_entered', 'date_updated', 'date_download')}),
    )
    search_fields = ('mall_type', 'mall_name', 'category')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('cat_id', 'name')
    fieldsets = (
        (None, {'fields': ('cat_id', 'name')}),
    )
    search_fields = ('mall_type', 'mall_name', 'category')


admin.site.register(Product, ProductAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Restaurant, RestaurantAdmin)

admin.site.register(Item, ItemAdmin)
admin.site.register(Category, CategoryAdmin)
