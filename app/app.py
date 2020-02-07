from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room

app = Flask(__name__)
socket = SocketIO(app)
