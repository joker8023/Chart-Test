from flask import Flask

from api.extensions import cache, db, migrate, debug_toolbar
from api.settings import ProdConfig
from api.views.v1 import table


def create_app(config_object=ProdConfig):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    return app


def register_extensions(app):
    cache.init_app(app)
    db.init_app(app)
    debug_toolbar.init_app(app)
    migrate.init_app(app, db)
    return None


def register_blueprints(app):
    app.register_blueprint(table.blueprint)
    return None
