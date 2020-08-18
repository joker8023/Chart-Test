import os

from api.constant import VNHK_USER, VNHK_PASSWORD, VNHK_HOST, VNHK_PORT, VNHK_DATABASE

os_env = os.environ


class Config(object):
    SECRET_KEY = os_env.get('API_SECRET', 'zri2o+j@c(+0z=z&d)k2i=j2g9b+0&1l+tl-sp*w#7@-bsadvasasdas$didky')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    BCRYPT_LOG_ROUNDS = 13
    ASSETS_DEBUG = False
    UPLOAD_FOLDER = '/static'
    DEBUG_TB_ENABLED = False  # Disable Debug toolbar
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'redis'  # Can be "memcached", "redis", etc.
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProdConfig(Config):
    """Production configuration."""
    ENV = 'prod'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'.format(
        user=VNHK_USER,
        password=VNHK_PASSWORD,
        host=VNHK_HOST,
        port=VNHK_PORT,
        database=VNHK_DATABASE)

    DEBUG_TB_ENABLED = True
    ASSETS_DEBUG = True
    CACHE_TYPE = 'redis'


class DevConfig(Config):
    """Development configuration."""
    ENV = 'dev'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'.format(
        user=VNHK_USER,
        password=VNHK_PASSWORD,
        host=VNHK_HOST,
        port=VNHK_PORT,
        database=VNHK_DATABASE)
    ASSETS_DEBUG = True
    CACHE_TYPE = 'redis'


class TestConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'.format(user=VNHK_USER,
                                                                                                  password=VNHK_PASSWORD,
                                                                                                  host=VNHK_HOST,
                                                                                                  port=VNHK_PORT,
                                                                                                  database=VNHK_DATABASE)
    BCRYPT_LOG_ROUNDS = 1
    WTF_CSRF_ENABLED = False
