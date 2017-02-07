from flask import Flask

from views.base import base_views
from ng2flask.config import BIND_HOST, BIND_PORT, DEBUG, STATIC_FOLDER

BLUEPRINTS = [base_views]

app = Flask(__name__)
app._static_folder = STATIC_FOLDER


for blueprint in BLUEPRINTS:
    app.register_blueprint(blueprint)

if __name__ == '__main__':
    app.run(host=BIND_HOST, port=BIND_PORT, debug=DEBUG)
