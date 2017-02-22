from flask.blueprints import Blueprint
from flask.templating import render_template

from tfra2bpflask.config import STATIC_FOLDER

base_views = Blueprint('base_views', __name__, template_folder=STATIC_FOLDER)


@base_views.route('/', methods=['GET'])
@base_views.route('/<path:path>', methods=['GET'])
def index(path=None):
    return render_template('index.html')
