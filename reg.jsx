var swiper = new Swiper('.fade', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay:{
        delay:7500,
        disableOnInteraction: false
    }
})


var swiper = new Swiper('.text-space',{
    spaceBetween: 30,
    effect: 'circle',
   
})



var db;

window.onload = function () {
  let request = indexedDB.open('UserDB', 1);

  request.onerror = function () {
    console.log('Database failed to open');
  };

  request.onsuccess = function () {
    console.log('Database opened successfully');
    db = request.result;
  };

  request.onupgradeneeded = function (e) {
    let db = e.target.result;

    let objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('lastname', 'lastname', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('password', 'password', { unique: false });

    console.log('Database setup complete');
  };
}

const nameInput = document.querySelector('#name');
const lastnameInput = document.querySelector('#lastname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const msg = document.querySelector('.msg');


// Register Form Submission
document.querySelector('#my-form').addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();



  if (nameInput.value === '' || lastnameInput.value === '' || emailInput.value === '' || passwordInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = "You ain't ready for this Sir/Ma. input your details down there";

    setTimeout(() => msg.remove(), 10000);
  } else {
    let newItem = {
      name: nameInput.value,
      lastname: lastnameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    let transaction = db.transaction(['users'], 'readwrite');
    let objectStore = transaction.objectStore('users');
    let request = objectStore.add(newItem);

    request.onsuccess = function () {
      nameInput.value = '';
      lastnameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';

      window.location.href = 'login.html';
    };

    transaction.oncomplete = function () {
      console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = function () {
      alert('Already used email');
    };
  }
}

/*


const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const lastnameInput = document.querySelector('#lastname')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')

const togglePassword = document.querySelector('#toggle-password')
const msg = document.querySelector('.msg')
const userList = document.querySelector('#users')

myForm.addEventListener('submit', onSubmit)


function onSubmit(e){
    e.preventDefault();

    if(nameInput.value === '' || lastnameInput.value === '' || emailInput.value === '' || passwordInput.value === ''){

        msg.classList.add('error')
        msg.innerHTML = 'Stop acting childish and put info before submitting '
        setTimeout(()=> msg.remove(), 10000)

    }else{
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(
           `${nameInput.value}: ${lastnameInput.value}: ${emailInput.value} :
            ${passwordInput.value}
           ` 
        ))

        userList.appendChild(li);

        nameInput.value = ''
        lastnameInput.value = ''
        emailInput.value = ''
        passwordInput.value = ''

    }
}

*/



// togglePassword.addEventListener('click', togglePasswordVisibilty)
// function togglePasswordVisibilty(){
//     togglePassword = this
//     if(passwordInput.type === 'password'){
//         passwordInput.type = 'text'
//         togglePassword.textContent = 'visibility'
//     }else{
//         passwordInput.type = 'password'
//         togglePassword.textContent = 'visibility_off'
//     }
// }

document.querySelector('#toggle-password').addEventListener('click', function(){
    const passwordInput = document.querySelector('#password')
    const icon = this

    if(passwordInput.type === 'password'){
            passwordInput.type = 'text'
                icon.textContent = 'visibility'
             }else{
               passwordInput.type = 'password'
               icon.textContent = 'visibility_off'
            }
})