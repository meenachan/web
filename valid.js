$('contact-body').submit(function(e){
    var name= document.getElementById('contact-name');
    var email= document.getElementById('contact-email');
    var message= document.getElementById('text-message');
    var error = document.getElementById('error');
    if( !name.value || !message.value || !email.value){
    error.innerHTML = "Please fill the above fields";

    }
    else{
        e.preventDefault();

    }
})
 