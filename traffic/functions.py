from oauth2client.service_account import ServiceAccountCredentials

__all__ = ['get_access_token']


def get_access_token():
    SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
    KEY_FILEPATH = 'ecplaza-tools-34beebf3cff9.json'
    return ServiceAccountCredentials.from_json_keyfile_name(KEY_FILEPATH, SCOPE).get_access_token().access_token
