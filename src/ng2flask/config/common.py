import os

BIND_HOST = '0.0.0.0'
FRONTEND_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'frontend')
STATIC_FOLDER = os.path.join(FRONTEND_PATH, 'static')