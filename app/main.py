from app import *
from views import index

if __name__ == '__main__':
    socket.run(app, debug=True, host = '192.168.43.217', port = '5050')