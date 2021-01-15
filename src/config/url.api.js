export const URL_API = {
    urlServe:'http://127.0.0.1:8000/api/', 
    urlUi: 'http://localhost:3000/',
    user: JSON.parse(localStorage.getItem('currentUser')),
    getHeaders(){
        return {
            'Content-Type': 'application/json',
            Authorization: URL_API.user.token_type + ' ' + URL_API.user.access_token //the token is a variable which holds the token
        }
    },
    goToLogin() {
        window.location.href = URL_API.urlUi;
    },
    refreshPage(){ 
        window.location.reload()
    },
    logoutUser(){
        if (URL_API.user.access_token != null) {
            URL_API.user.access_token = null
            localStorage.setItem('currentUser', JSON.stringify(URL_API.user))
        }
        URL_API.goToLogin()

    }
};

export default URL_API