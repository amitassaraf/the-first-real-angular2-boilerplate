from tornado.ioloop import IOLoop
from tornado.web import Application, FallbackHandler
from tornado.wsgi import WSGIContainer

from web.config import BIND_PORT, BIND_HOST
from wsgi import app


def start_server():
    flask_container = WSGIContainer(app)

    application = Application([
        # A simple handler for
        (r'.*', FallbackHandler, dict(fallback=flask_container)),
    ])

    application.listen(BIND_PORT, BIND_HOST)

    IOLoop.instance().start()


if __name__ == '__main__':
    start_server()
