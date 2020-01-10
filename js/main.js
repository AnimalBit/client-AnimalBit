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
    
    // leaderboard tampil public, no need login, automatically ke display
    getLeaderboard()
        .then(userMatches => {
            let totalAnswer
            userMatches.forEach( match => {
                totalAnswer += match.correctAnswers 
                // lanjut append ke div leaderboard 
            })
        })
        .catch(err => {
            console.log(err)
        })
    // to start the game, triggered by button start, hrs login & authenticated
    //   gameStart()
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    
  });