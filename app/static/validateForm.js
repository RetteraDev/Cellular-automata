function validateForm()
        {
            var Diffuz = document.forms["Start"]["D"].value;
            var Side = document.forms["Start"]["h"].value;
            var Time = document.forms["Start"]["delta_T"].value;
            if ((Diffuz*Time)/(Side*Side)>0.25)
            {
                alert("Некорректные данные");               
                return false;
            }
            

        }
validateForm();