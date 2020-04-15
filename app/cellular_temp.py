def get_J_and_C(C, D, h, d_t, width, height):

    J = 0
    send_C = [0 for i in range(width*height*4)]
    new_C = [[0 for i in range(width)] for i in range(height)]
    for i in range(width):
        for j in range(height):

            if i == 0:
                if j == 0:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t

                if j == height-1:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t

                else:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t


            elif i == width-1:
                
                if j == 0:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t

                if j == height-1:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t

                else:
                    send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t

            elif j == 0:
                send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (- 2*C[i][j] + C[i][j+1]) / h**2 )*d_t

            elif j == height-1:
                send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j]) / h**2 )*d_t

            else:
                send_C[(width*i+j)*4+3] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1]) / h**2 )*d_t
            new_C[i][j] = send_C[(width*i+j)*4+3]


            J += send_C[(width*i+j)*4+3]

    return J, send_C, new_C
