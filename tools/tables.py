import django_tables2 as tables
from django_tables2.utils import A

from .models import *

__all__ = ['CategoryTable', 'ItemTable']


class CategoryTable(tables.Table):
    name = tables.LinkColumn('collection', args=[A('cat_id')], text=lambda record: record.name, empty_values=())
    diseases = tables.TemplateColumn('{{ record.items.count }} item(s)', verbose_name='Items')

    class Meta:
        model = Category
        orderable = True
        attrs = {"class": "collection table table-hover table-border"}


class ItemTable(tables.Table):
    category = tables.LinkColumn('collection', args=[A('category.cat_id')], text=lambda record: record.category.name, empty_values=())
    view_edit = tables.LinkColumn('collection', args=[A('id')], text='보기', empty_values=())
    delete_btn = tables.LinkColumn('delete_collection', args=[A('id')], text='삭제', empty_values=())

    class Meta:
        model = Item
        sequence = ['id', 'view_edit', 'delete_btn']
        exclude = ['ss_id', 'mall_id', 'notes', 'quantity']
        orderable = True
        order_by = 'delete'
        attrs = {"class": "collection table table-hover table-border"}
