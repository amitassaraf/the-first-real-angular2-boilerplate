from flask import Flask

from config import DEBUG, STATIC_FOLDER
from views.base import base_views

BLUEPRINTS = [base_views]

app = Flask(__name__)
app._static_folder = STATIC_FOLDER
app.debug = DEBUG

for blueprint in BLUEPRINTS:
    app.register_blueprint(blueprint)
