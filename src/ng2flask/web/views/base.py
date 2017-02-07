from flask.blueprints import Blueprint

base_views = Blueprint(name=__name__)

base_views.route('/', methods=['GET'])
def index():
    return 'Hello world'