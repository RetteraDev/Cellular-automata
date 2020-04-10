cpdef get_J_and_C (dict C_dict, float D, float h, float d_t, int width, int height):

    cdef list C_list = []
    cdef list C = []
    cdef int i, j
    cdef int index = 0

    for i in range(len(C_dict)):
        if (index+1)%4 == 0:
            C_list.append(C_dict[str(index)])
            if len(C_list) == height:
                C.append(C_list)
                C_list = []
        index += 1

    cdef long long int J = 0

    for i in range(width):
        for j in range(height):

            if i == 0:
                if j == 0:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t

                if j == height-1:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t

                else:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t


            elif i == width-1:
                
                if j == 0:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t

                if j == height-1:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t

                else:
                    C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t

            elif j == 0:
                C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (- 2*C[i][j] + C[i][j+1]) / h**2 )*d_t

            elif j == height-1:
                C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j]) / h**2 )*d_t

            else:
                C_dict[str((width*i+j)*4+3)] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1]) / h**2 )*d_t

            J += C_dict[str((width*i+j)*4+3)]

    return J, C_dict

