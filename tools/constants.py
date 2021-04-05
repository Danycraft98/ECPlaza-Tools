from itertools import repeat

APP_LIST = [
    list(repeat('Shopify', 2)), list(repeat('SAM.GOV', 2)),
    ('1688_L', '1688 List'), ('1688_D', '1688 Detail'),
    ('Coupang_L', 'Coupang List'), ('Coupang_D', 'Coupang Detail'),
    ('HT_L', 'Hot Tracks List'), ('HT_D', 'Hot Tracks Detail')
]

REQUEST_LIST = [list(repeat('GET', 2)), list(repeat('POST', 2))]

LANG_LIST = [
    ('KorService', '한국어/국문 서비스'),
    ('EngService', '영어 서비스'),
    ('RusService', '러시아어/노어 서비스')
]

CAT_LIST = [
    ('searchFestival', '행사 정보 조회'),
    ('areaBasedList', '맛집 정보 조회'),
    ('areaBasedList', '지역기반 관광정보 조회')
]

CAT_DETAIL_LIST = [
    '열 No.에 몇개의 아이팀은 원하는지 꼭 선택한 후에 원하면 날짜 범위를 입력해주세요.',
    '열 No.에 몇개의 아이팀은 원하는지 꼭 선택한 후에 찾기 눌르세요.',
    '열 No.에 몇개의 아이팀은 원하는지 꼭 선택한 후에 콘텐츠 타입 ID와 콘텐츠 ID를 입력해주세요.'
]

NUM_ROW_LIST = [list(repeat(count * 10, 2)) for count in range(1, 6)]

CONTENT_TYPE_LIST = [
    (12, '관광지'), (14, '문화시설'),
    (15, '행사/공연/축제'), (25, '여행코스'),
    (28, '레포츠'), (32, '숙박'),
    (38, '쇼핑'), (39, '음식점')
]
