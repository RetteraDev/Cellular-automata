#include <python.h>
#include <vector>
#include <string>

map<string, int> get_C(vector<vector<int>> C, float D, float h, float d_t, int width, int height) {
    vector<vector<int>> new_C;
    vector<int> temp;
    for(int i = 0; i < height) {
        if (i % (width*4) == 0) 
            new_C.push_back(temp);
        else 
            temp.push_back(C[i]);
    }
    for(int i = 0; i < heidht; i++) 
        for (int j = 0; j < width; j++)
            cout << new_C[i][j] << ' ';
        cout << '\n';
}

int main() {
    get_C()
    return 0;
}