
function getTest() {
    const token = localStorage.getItem('token')
    console.log('masuk')
    if (token) {
        return new Promise(function(resolve, reject){
            $.ajax({
                method: 'GET',
                url:`http://localhost:3000/users/testpage`,
                headers: {
                    access_token : token
                }
            })
            .done(data => {
                console.log(token)
                resolve(data)
            })
            .fail(err => {
                reject(err)
            })
        })
    }
}