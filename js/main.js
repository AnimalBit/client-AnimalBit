function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
      method: ('POST'),
      url: `http://localhost:3000/users/google-sign-in`,
      data : {
          google_token : id_token
      }
    })
    .done(data => {
        localStorage.setItem('token', data.access_token)
    })
    .fail ( err => {
        console.log(err)
    })

  }

  $(document).ready(function(){
    
  });