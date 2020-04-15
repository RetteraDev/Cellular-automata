function validateForm() {
    var Diffuz = document.forms["Start"]["D"].value;
    var Side = document.forms["Start"]["h"].value;
    var Time = document.forms["Start"]["delta_T"].value;
    // if ((Diffuz*Time)/(Side*Side)>0.25) {
    //     return false;
    // }
    // else {
    //     return true;
    // }
    return true;
}