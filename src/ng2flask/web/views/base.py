from flask.blueprints import Blueprint
from flask.templating import render_template
import os
from ng2flask.config import STATIC_FOLDER

base_views = Blueprint('base_views', __name__, template_folder=STATIC_FOLDER)

@base_views.route('/', methods=['GET'])
def index():
    return render_template(os.path.join('dist', 'index.html'))