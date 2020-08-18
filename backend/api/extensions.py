from flask_caching import Cache
from flask_debugtoolbar import DebugToolbarExtension
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(session_options={'autocommit': True})
migrate = Migrate()
cache = Cache()
debug_toolbar = DebugToolbarExtension()
