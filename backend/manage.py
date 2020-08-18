import logging
import os
import traceback

from flask_migrate import MigrateCommand
from flask_script import Manager, Server
from flask_script.commands import Clean, ShowUrls
from voluptuous import MultipleInvalid
from werkzeug.exceptions import BadRequest, NotFound, MethodNotAllowed

from api.app import create_app
from api.constant import SysStatus, MessageCategory
from api.settings import DevConfig, ProdConfig
from api.views.v1.base import handler

if os.environ.get("API_ENV") == 'prod':
    app = create_app(ProdConfig)
else:
    app = create_app(DevConfig)

app.logger.setLevel(logging.INFO)

HERE = os.path.abspath(os.path.dirname(__file__))
TEST_PATH = os.path.join(HERE, 'tests')

manager = Manager(app)

manager.add_command('server', Server())
manager.add_command('db', MigrateCommand)
manager.add_command("urls", ShowUrls())
manager.add_command("clean", Clean())


@app.errorhandler(MultipleInvalid)
def handle_exception(error):
    return handler(SysStatus.PARAMETER_CHECK_ERROR, None, str(error))


@app.errorhandler(BadRequest)
def bad_request(error):
    app.logger.exception('error 400: %s', error)
    return handler(SysStatus.FAILURE, None, MessageCategory.BAD_REQUEST)


@app.errorhandler(NotFound)
def not_found(error):
    app.logger.exception('error 404: %s', error)
    return handler(SysStatus.FAILURE, None, MessageCategory.NOT_FONUND)


@app.errorhandler(MethodNotAllowed)
def method_not_allowed(error):
    app.logger.exception('error 405: %s', error)
    return handler(SysStatus.FAILURE, None, MessageCategory.METHOD_NOT_ALLOWED)


@app.errorhandler(Exception)
def internal_server_error(error):
    app.logger.exception('error 500: %s', error)
    return handler(SysStatus.SYSTEM_ERROR, None, SysStatus.SYSTEM_ERROR.name)


if __name__ == '__main__':
    manager.run()
