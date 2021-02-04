import itertools
import os
import pandas as pd
import numpy as np

from .models import *

__all__ = [
    'read_file', 'write_file', 'compare_columns'
]


def read_file(file, filename, **kwargs):
    """ Read file with **kwargs; files supported: xls, xlsx, csv, json. """
    if 'nrows' in kwargs and not os.path.exists(filename):
        Document.objects.create(description=filename, document=file)

    read_map = {'xls': pd.read_excel, 'xlsx': pd.read_excel, 'csv': pd.read_csv, 'json': pd.read_json}
    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in read_map, "Input file not in correct format, must be spreadsheet; current format '{0}'".format(ext)
    if ext == 'xlsx':
        kwargs['engine'] = 'openpyxl'
    dataframe = read_map[ext](file, index_col=False, **kwargs)
    return dataframe, dataframe.columns


def write_file(dataframe, filename, **kwargs):
    """ Write file with **kwargs; files supported: xls, xlsx, csv, json. """
    write_map = {'xls': pd.DataFrame.to_excel, 'xlsx': pd.DataFrame.to_excel, 'csv': pd.DataFrame.to_csv, 'json': pd.DataFrame.to_json}

    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in write_map, "Input file not in correct format, must be spreadsheet current format '{0}'".format(ext)
    file = write_map[ext](dataframe, filename, **kwargs)
    document_obj = Document.objects.create(description=filename, document=file)
    return document_obj


def compare_columns(dataframes, header_list):
    """ Compares two dataframes by selected column headers. """
    all_combs, df_list = [], []
    combs_obj = itertools.combinations(header_list, 2)
    combs_list = list(combs_obj)
    all_combs += combs_list

    for comb in all_combs:
        if comb[0] in dataframes[0] and comb[1] in dataframes[1]:
            val1, val2 = dataframes[0][comb[0]], dataframes[1][comb[1]]
            if dataframes[0][comb[0]].dtype != np.number and dataframes[1][comb[1]].dtype != np.number:
                comp_result = set(val1.str.lower()).intersection(set(val2.str.lower()))
            else:
                comp_result = set(val1).intersection(set(val2))

            for row in comp_result:
                df_list.append([row] + list(comb))
                # ': '.join([comb[0], str(dataframes[0].index[dataframes[0][comb[0]] == row])]),
    return pd.DataFrame(data=df_list, columns=[
         'Column Value', 'Column Name (File #1)', 'Column Name (File #2)'
    ])
