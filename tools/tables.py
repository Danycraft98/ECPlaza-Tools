import django_tables2 as tables
from django_tables2.utils import A

from .models import *

__all__ = ['CategoryTable', 'ItemTable', 'WordTable']


class CategoryTable(tables.Table):
    name = tables.LinkColumn('collection', args=[A('cat_id')], text=lambda record: record.name, empty_values=())
    items = tables.TemplateColumn('{{ record.items.count }} item(s)', verbose_name='Items')

    class Meta:
        model = Category
        orderable = True
        attrs = {"class": "collection table table-hover table-border"}


class ItemTable(tables.Table):
    cat_id = tables.LinkColumn('collection', args=[A('category.cat_id')], text=lambda record: record.category.cat_id, empty_values=())
    category = tables.LinkColumn('collection', args=[A('category.cat_id')], text=lambda record: record.category.name, empty_values=())
    view_edit = tables.LinkColumn('collection', args=[A('id')], text='보기', empty_values=())
    delete_btn = tables.LinkColumn('delete_collection', args=[A('id')], text='삭제', empty_values=())

    class Meta:
        model = Item
        sequence = ['view_edit', 'cat_id', 'delete_btn']  # 'delete_btn' to the end of the table
        exclude = ['id']
        orderable = True
        order_by = 'delete'
        attrs = {"class": "collection table table-hover table-border"}


class ItemTable2(tables.Table):
    cat_id = tables.LinkColumn('collection', args=[A('category.cat_id')], text=lambda record: record.category.cat_id, empty_values=())
    category = tables.LinkColumn('collection', args=[A('category.cat_id')], text=lambda record: record.category.name, empty_values=())
    view_edit = tables.LinkColumn('collection', args=[A('id')], text='보기', empty_values=())
    delete_btn = tables.LinkColumn('delete_collection', args=[A('id')], text='삭제', empty_values=())

    class Meta:
        model = Item
        sequence = ['view_edit', 'delete_btn', 'cat_id']
        exclude = ['id', 'quantity' 'notes']
        orderable = True
        order_by = 'delete'
        attrs = {"class": "collection table table-hover table-border"}


class WordTable(tables.Table):
    count = tables.Column(order_by='count')

    class Meta:
        model = Word
        orderable = True
        attrs = {"class": "table table-hover table-border"}
