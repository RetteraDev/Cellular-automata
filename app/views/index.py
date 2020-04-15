from app import *
import time
try:
    from cellular_cython import get_J_and_C
except ImportError:
    from cellular_temp import get_J_and_C

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
    C_dict = json[4]
    width = int(json[5])
    height = int(json[6])

    # Преобразование в двумерный массив
    C_list = []
    C = []
    index = 0

    for k, v in C_dict.items():

        if (index+1)%4 == 0:
            C_list.append(v)
            if len(C_list) == height:
                C.append(C_list)
                C_list = []
        index += 1
    
    print(f"Started - {request.sid}")

    for i in range(steps):

        # Замер времени работы вычислений
        # t1 = time.time()

        J, send_C, C = (i for i in get_J_and_C(C, D, h, delta_T, width, height))

        # t1 = time.time() - t1
        # print(f"{t1} sec")

        # Отдаем массив раз в пять расчетов, чтобы снизить нагрузку на сеть
        if i%5 == 0 or (i+1)%steps == 0:
            print(f"{i}/{steps} - {request.sid}")
            socket.emit('new_cells', data = {'J':J, 'C':send_C, 'width':width, 'height':height}, room = request.sid)