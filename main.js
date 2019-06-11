const idInput = document.querySelector('#verify_id');
const myForm = document.querySelector('#my-form');
const msg = document.querySelector('.msg');
const msgId = document.querySelector('.invalid-id');
const userList = document.querySelector('#users');

idInput.addEventListener('input', checkId);
myForm.addEventListener('submit', onSubmit);

// Event listener for input in ID text field. Displays green when true.
function checkId(e) {
    e.preventDefault();
    const ID = verify_id(idInput.value);
    if (ID.Valid === true){
        idInput.style.borderColor = 'green';
        msgId.innerHTML = '';
    } else {
        idInput.style.borderColor = 'red';
        msgId.innerHTML = 'Invalid South African ID';
    }
}

// Verifies the South African ID number: returns{Valid,Gender,Citizen,BirthDate} BirthDate(dd-mm-yyyy)
function verify_id(num) {
    if (isNaN(num) || num === '' || num.length !== 13) {
        return false;
    }
    let step1 = 0;
    let step2 = '';
    let step4 = 0;
    let i;
    for (i = 1; i < 14; i++) {
        if (i%2!==0 && i<=11 ){
            step1+=parseInt(num[i-1]);
        }
        else if (i<=12) {
            step2 += String(num[i - 1]);
        }
    }
    const step3 = String(parseInt(step2) * 2);
    let j;
    for (j = 0; j < step3.length; j++) {
        step4+=parseInt(step3[j]);
    }
    const step5 = String(step1+step4);
    const step6 = 10-parseInt(step5[step5.length-1]);

    const gender = (parseInt(num.substring(6, 10)) < 5000) ? "Female" : "Male";
    const citizenship = (parseInt(num.substring(10, 11)) === 0) ? "SA Citizen" : "Permanent Residence";

    const tempDate = new Date(num.substring(0, 2), num.substring(2, 4) - 1, num.substring(4, 6));
    const id_date = tempDate.getDate();
    const id_month = tempDate.getMonth();
    const id_year = tempDate.getFullYear();
    const DoB = id_date + "-" + (id_month + 1) + "-" + id_year;
    //Valid returns true
    return {Valid:num[num.length - 1] === String(step6),Gender:gender,Citizen:citizenship,BirthDate:DoB};
}

// Event listener on submit. checks id valid then returns values as li element.
function onSubmit(e) {
    e.preventDefault();
    const ID = verify_id(idInput.value);
    if (!ID.Valid) {
        msg.innerHTML = 'Please enter all fields';
        setTimeout(function () {
            msg.innerHTML = '';
        },3000);
        //setTimeout(() => msg.innerHTML = '', 3000); //uses pointer function
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${idInput.value} : ${ID.Gender} : ${ID.Citizen} : ${ID.BirthDate}`));
        userList.appendChild(li);
        //Clear fields
        idInput.value = '';
    }
}