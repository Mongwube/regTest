var db // indicate index DB

// initialize indexDB for login page
window.onload = function(){
    //open indexDB
    let request = indexedDB.open('UserDB', 1);

    request.onerror = function(){
        console.log('Database Failed to Open.')
    }

    request.onsuccess = function(){
        console.log('Database Opend Successfully.')
        db = request.result;
    }
}

document.querySelector('#login-form').addEventListener('submit', function(e){
    e.preventDefault()
    // input from HTML
    const loginEmail = document.querySelector('#login-email')
    const loginPassword = document.querySelector('#login-password')
    const loginMsg = document.querySelector('#login-msg')

    // set up a query code or program.

    let transaction = db.transaction(['users'], 'readonly') // read the value of the database
    let objectStore = transaction.objectStore('users')//get all the values of users in the database
    let index = objectStore.index('email')// get email of users in the database
    let request = index.get(loginEmail.value)//get the value of the email of the logingin user

    request.onsuccess =function(){
        if(request.result && request.result.loginPassword === loginPassword.value){
            window.location.href = 'dashboard.html'
        }else{
            loginMsg.classList.add('error','show')
            loginMsg.innerHTML = 'Invalid email or password'
            setTimeout(()=>{
            loginMsg.classList.remove('error','show')
            loginMsg.innerHTML = ''
            })
        }
    }
    request.onerror = function(){
        console.log('error during login')

        loginMsg.classList.add('error','show')
        loginMsg.innerHTML = 'an error occured during login'
        setTimeout(()=>{
        loginMsg.classList.remove('error','show')
        loginMsg.innerHTML = ''
        })
    }
})
