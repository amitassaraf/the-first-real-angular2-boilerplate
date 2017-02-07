from flask import Flask

from views.base import base_views
from ..config import BIND_HOST, BIND_PORT, DEBUG

BLUEPRINTS = [base_views]

app = Flask(__name__)




def register_blueprints():
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)


register_blueprints()

if __name__ == '__main__':
    app.run(host=BIND_HOST, port=BIND_PORT, debug=DEBUG)
