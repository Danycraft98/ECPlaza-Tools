import itertools
import os
import pandas as pd
from django.http import HttpResponse

from .models import *

__all__ = ['read_file', 'write_file', 'compare_columns', 'export_to_spreadsheet']


def export_to_spreadsheet(data_list, filepath):
    df = pd.DataFrame(data_list)
    df.to_excel(filepath, encoding='utf8', index=False)
    file = open(filepath, 'rb+')
    resp = HttpResponse(file.read(), content_type='applications/upload')
    resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.name)
    # resp['Content-Type'] = 'cp949'
    return resp


# Compare -----------------------------------------------------------------------------------
def read_file(file, filename, **kwargs):
    """ Read file with **kwargs; files supported: xls, xlsb, csv, json. """
    read_map = {'xls': pd.read_excel, 'xlsb': pd.read_excel, 'csv': pd.read_csv, 'json': pd.read_json}
    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in read_map, "Input file not in correct format, must be spreadsheet; current format '{0}'".format(ext)
    if ext == 'xlsb':
        kwargs['engine'] = 'pyxlsb'

    dataframe = read_map[ext](file, index_col=False, **kwargs)
    return dataframe, dataframe.columns


def write_file(dataframe, filename, create_model=True, **kwargs):
    """ Write file with **kwargs; files supported: xls, xlsx, csv, json. """
    write_map = {'xls': pd.DataFrame.to_excel, 'xlsx': pd.DataFrame.to_excel, 'csv': pd.DataFrame.to_csv, 'json': pd.DataFrame.to_json}
    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in write_map, "Input file not in correct format, must be spreadsheet current format '{0}'".format(ext)
    open(filename, 'a').close()
    file = write_map[ext](dataframe, filename, **kwargs)
    if create_model:
        doc_query = Document.objects.filter(document=file)
        if doc_query.exists():
            doc_query.update(document=file)
            document_obj = doc_query.first()
        else:
            document_obj = Document.objects.create(document=file)
        return document_obj
    return file


def compare_columns(dataframes, header_list):
    """ Compares two dataframes by selected column headers. """
    all_combs, df_list = [], []
    combs_obj = itertools.combinations(header_list, 2)
    all_combs.extend(list(combs_obj))
    comp_results = [[comb, set(dataframes[0][comb[0]].str.lower()).intersection(set(dataframes[1][comb[1]].str.lower()))] for comb in all_combs if
                    comb[0] in dataframes[0] and comb[1] in dataframes[1]]
    df_list.extend([[item] + list(value[0]) for value in comp_results for item in value[1]])
    return pd.DataFrame(data=df_list, columns=['Column Value', 'Column Name (File #1)', 'Column Name (File #2)'])


# HTML Parser -------------------------------------------------------------------------------
def pairwise(iterable):
    """ s -> (s0,s1), (s1,s2), (s2, s3), ... """
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


def create_product():
    Product.objects.get_or_create()
