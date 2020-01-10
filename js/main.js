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
        console.log(data, '<<')
        localStorage.setItem('token', data.access_token)
        console.log($("#gameContent") , "selector jquery")
        $("#loginPage").hide()
        $("#gameContent").show()
        getLeaderboard()
        .then(userMatches => {
            let totalAnswer = 0
            let name
            let userMatchesTotal = []
            userMatches.forEach( user => {
                name = user.fullname
                user.matches.forEach( matchData => {
                    totalAnswer += matchData.correctAnswers
                })
                userMatchesTotal.push({
                    name : name,
                    totalAnswer : totalAnswer
                })
            })
            let finalLeaderboard = userMatchesTotal.sort((a, b)=> b.totalAnswer-a.totalAnswer)
            // tinggal append ke div tampilan leaderboard
        })
        .catch(err => {
            console.log(err)
        })
        
    })
    .fail ( err => {
        console.log(err)
    })

  }

  $(document).ready(function(){
    
    var gameQuestions
    // leaderboard tampil public, no need login, automatically ke display
    
    $("#gameContent").hide()
    $("#post-gamePage").hide()

    // to start the game, triggered by button start, hrs login & authenticated
    $("#buttonstart").click(function(event){
        gameStart()
        .then(gameData => {
            // tinggal append ke tampilan
            $("#idnya slot gambar").append("<img src=`${gameData.image}`>") 
            gameQuestions = gameData
        })
        .catch(err => {
            console.log(err)
        })
    })
      
    // submitAnswer, triggered setiap kali user pilih jawaban 
    $('#idJawaban di formnya').click(function(event){
        let answers = []
        let choice = $('#idJawaban')
        answers.push(choice, gameQuestions)
        if (answers.length === 10) {
            submitAnswer(answers)
            .then( result => {
                console.log(result)
                // hasil score, di append ke div tampilan akhir
            })
            .catch(err => {
                console.log(err)
            })
        }
    })

    $("#loginbutton").click(function(event){
        
    })
            
  });