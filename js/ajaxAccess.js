
function gameStart() {
    const token = localStorage.getItem('token')
    console.log('masuk')
    if (token) {
        return new Promise(function(resolve, reject){
            $.ajax({
                method: 'GET',
                url:`http://localhost:3000/users/start`,
                headers: {
                    access_token : token
                }
            })
            .done(data => {
                resolve(data)
            })
            .fail(err => {
                reject(err)
            })
        })
    }
}


function getLeaderboard() {

    return new Promise((resolve, reject) =>  {
        $.ajax({
            method: 'GET',
            url : 'http://localhost:3000/users/'
        })
        .done(data => {
            resolve(data)
        })
        .fail(err => {
            reject(err)
        })
    })
   

}