from app import *
from cellular_temp import get_J_and_C
import time

@app.route('/')
def index():
    return render_template('index.html')

@socket.on('connect')
def connection():
    print('Connected')
    join_room(request.sid)

@socket.on('send_cellaular_json')
def send_cellaular_json(json):

    D = float(json[0])
    h = float(json[1])
    delta_T = float(json[2])
    steps = int(json[3])
    C = list(json[4])
    width = int(json[5])
    height = int(json[6])
    
    for i in range(steps):
        J, C = (i for i in get_J_and_C(C, D, h, delta_T, width, height)) 
        socket.emit('new_cells', data = {'J':J, 'C':C, 'width':width, 'height':height}, room = request.sid)
        print(i)
