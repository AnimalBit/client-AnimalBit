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
    
    var gameQuestions
    // leaderboard tampil public, no need login, automatically ke display
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
            finalLeaderboard.forEach(user => {
                $('#leaderboards-card').append(
                    `<p><span class="text-leaderboardName">${user.name}<span class="text-leaderboardScore"> : ${user.totalAnswer * 10}</span></p>`
                )
            })
        })
        .catch(err => {
            console.log(err)
        })


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
                for (let i = 0; i < 5; i++) {
                    if (result.stats[i] === true) {
                        $('#postgame-row-1').append(
                            `
                            <div class="col-xl-2" id="img-gameQuestion${i+1}">
                                <div class="card">
                                    <div class="card-body postGame-imgWrapper bg-success">
                                        <img src="${result.userQuestions[i].image}" width="100" height="100" class="img-fluid rounded img-postgame">
                                        <p>Correct Answer: ${result.userQuestions[i].answer}</p>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    } else {
                        $('#postgame-row-1').append(
                            `
                            <div class="col-xl-2" id="img-gameQuestion${i+1}">
                                <div class="card">
                                    <div class="card-body postGame-imgWrapper bg-danger">
                                        <img src="${result.userQuestions[i].image}" width="100" height="100" class="img-fluid rounded img-postgame">
                                        <p>Correct Answer: ${result.userQuestions[i].answer}</p>
                                    </div>
                                </div>
                            </div>
                            `
                        ) 
                    }
                }
                for (let i = 5; i < 10; i++) {
                    if (result.stats[i] === true) {
                        $('#postgame-row-2').append(
                            `
                            <div class="col-xl-2" id="img-gameQuestion${i+1}">
                                <div class="card">
                                    <div class="card-body postGame-imgWrapper bg-success">
                                        <img src="${result.userQuestions[i].image}" width="100" height="100" class="img-fluid rounded img-postgame">
                                        <p>Correct Answer: ${result.userQuestions[i].answer}</p>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    } else {
                        $('#postgame-row-2').append(
                            `
                            <div class="col-xl-2" id="img-gameQuestion${i+1}">
                                <div class="card">
                                    <div class="card-body postGame-imgWrapper bg-danger">
                                        <img src="${result.userQuestions[i].image}" width="100" height="100" class="img-fluid rounded img-postgame">
                                        <p>Correct Answer: ${result.userQuestions[i].answer}</p>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
    
  });