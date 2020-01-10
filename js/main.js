function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
      method: ('POST'),
      url: `http://localhost:3000/users/google-sign-in`,
      data : {
          google_token : id_token
      }
    })
    .done( access_token => {
        localStorage.setItem('token', access_token.token)
    })
    .fail ( err => {
        console.log(err)
    })

  }

  $(document).ready(function(){
      getTest()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    
  });