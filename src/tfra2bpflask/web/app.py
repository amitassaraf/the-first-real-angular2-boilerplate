from flask import Flask

from tfra2bpflask.config import BIND_HOST, BIND_PORT, DEBUG, STATIC_FOLDER
from views.base import base_views

BLUEPRINTS = [base_views]

app = Flask(__name__)
app._static_folder = STATIC_FOLDER

for blueprint in BLUEPRINTS:
    app.register_blueprint(blueprint)

if __name__ == '__main__':
    app.run(host=BIND_HOST, port=BIND_PORT, debug=DEBUG)
