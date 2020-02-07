import time

# D = 2 * 10**(-6)
# h = 0.001
# d_t = 0.1


def get_J(C, D, h):
    J = 0
    for i in range(101):
        for j in range(101):

            if i == 0:
                if j == 0:
                    J += D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )
                            
                if j == 100:
                    J += D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )
                        
                else:
                    J += D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )
                          
                
            elif i == 100:
                
                if j == 0:
                    J += D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )
 
                if j == 100:
                    J += D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )
                    
                else:                
                    J += D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )
            
            elif j == 0:
                J += D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (- 2*C[i][j] + C[i][j+1]) / h**2 )            
                    
            elif j == 100:
                J += D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j]) / h**2 )
                
            else:
                J += D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1]) / h**2 )
    return J            
       
def get_C(C, D, h, d_t):
    new_C = [[0 for i in range(101)] for i in range(101)]
    for i in range(101):
        for j in range(101):       
            if i == 0:
                if j == 0:
                    new_C[i][j] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t
                            
                if j == 100:
                    new_C[i][j] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t
                        
                else:
                    new_C[i][j] = C[i][j] + D * ((- 2*C[i][j] + C[i+1][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t
                          
                
            elif i == 100:
                
                if j == 0:
                    new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (- 2*C[i][j] + C[i][j+1])/h**2 )*d_t
 
                if j == 100:
                    new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j])/h**2 )*d_t
                    
                else:                
                    new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j])/h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1])/h**2 )*d_t
            
            elif j == 0:
                new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (- 2*C[i][j] + C[i][j+1]) / h**2 )*d_t           
                    
            elif j == 100:
                new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j]) / h**2 )*d_t
                
            else:
                new_C[i][j] = C[i][j] + D * ( (C[i-1][j] - 2*C[i][j] + C[i+1][j]) / h**2 + (C[i][j-1] - 2*C[i][j] + C[i][j+1]) / h**2 )*d_t       
    return new_C        
    


   