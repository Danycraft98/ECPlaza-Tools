from django.db import models

__all__ = ['Document', 'Product', 'TourInfo', 'Category', 'Item']


# File Models -------------------------------------------------------------------------------
class Document(models.Model):
    document = models.FileField(verbose_name='file', upload_to='static/uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document.name.split('/')[-1]


# Product Models -------------------------------------------------------------------------
class Product(models.Model):
    """ A class used to represent a Product object """
    entered_date = models.DateTimeField(auto_now_add=True)
    ca_id_extra = models.CharField(verbose_name='카테고리 ID', max_length=10)
    it_id_extra = models.CharField(verbose_name='ID', max_length=50, primary_key=True)
    it_name = models.CharField(verbose_name='이름', max_length=50)
    it_img_json = models.CharField(verbose_name='이미지 JSON', max_length=500)
    it_origin = models.CharField(verbose_name='origin', max_length=5)
    it_url = models.URLField(verbose_name='URL', max_length=150)
    it_price = models.FloatField(verbose_name='Price')
    it_whole_price = models.FloatField(verbose_name='Whole Price')


# Product Models -------------------------------------------------------------------------
class TourInfo(models.Model):
    """ A class used to represent a TourInfo object """
    entered_date = models.DateTimeField(auto_now_add=True)
    contentid = models.IntegerField(verbose_name='컨텐트 ID', primary_key=True)
    contenttypeid = models.IntegerField(verbose_name='컨텐트 타입 ID')
    title = models.CharField(verbose_name='제목', max_length=50)
    cat1 = models.CharField(verbose_name='대분류 카테고리', max_length=3)
    cat2 = models.CharField(verbose_name='중분류 카테고리', max_length=5)
    cat3 = models.CharField(verbose_name='소분류 카테고리', max_length=10)

    createdtime = models.IntegerField(verbose_name='Created Time')
    modifiedtime = models.IntegerField(verbose_name='Modified Time')
    eventstartdate = models.IntegerField(verbose_name='시작 날짜')
    eventenddate = models.IntegerField(verbose_name='끝 날짜')

    firstimage = models.URLField(verbose_name='First Image', max_length=150)
    firstimage2 = models.URLField(verbose_name='Second Image', max_length=150)
    readcount = models.IntegerField(verbose_name='조회수')
    tel = models.CharField(verbose_name='전화번호', max_length=15)

    addr1 = models.CharField(verbose_name='주소', max_length=100)
    areacode = models.IntegerField(verbose_name='Area Code')
    sigungucode = models.IntegerField(verbose_name='시군구 코드')
    mapx = models.FloatField(verbose_name='X Coordinate')
    mapy = models.FloatField(verbose_name='Y Coordinate')
    mlevel = models.IntegerField(verbose_name='M Level')


# Collection Models -------------------------------------------------------------------------
class Category(models.Model):
    """ A class used to represent a User object """
    cat_id = models.CharField(verbose_name='카테고리 ID', max_length=50, primary_key=True)
    name = models.CharField(verbose_name='카테고리', max_length=100)
    date_entered = models.DateTimeField(verbose_name='등록일', auto_now=True)

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return self.name


class Item(models.Model):
    """ A class used to represent a Item object """
    mall_type = models.CharField(verbose_name='Mall 타입', max_length=30)
    category = models.ForeignKey(Category, verbose_name='카테고리', related_name='items', on_delete=models.CASCADE)
    mall_name = models.CharField(verbose_name='MALL 이름', max_length=30, blank=True, null=True)
    mall_id = models.CharField(verbose_name='MALL ID', max_length=30, blank=True, null=True)
    url = models.URLField(verbose_name='URL', max_length=150)
    notes = models.TextField(verbose_name='비고', max_length=150, blank=True, null=True)
    quantity = models.IntegerField(verbose_name='상품 갯수', default=0)

    date_entered = models.DateTimeField(verbose_name='등록일', auto_now=True)
    date_updated = models.DateTimeField(verbose_name='수정일', auto_now=True)
    date_download = models.DateTimeField(verbose_name='다운로드 일', auto_now=True)
    delete = models.BooleanField(verbose_name='삭제여부', default=False)

    def __str__(self):
        """
        The string return method

        Returns: str
        """
        return '{category}: {name}'.format(category=self.category, name=self.mall_name if self.mall_name else self.url)


if __name__ == '__main__':
    import doctest

    doctest.testmod()
