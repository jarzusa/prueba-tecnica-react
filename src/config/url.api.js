export const URL_API = {
    urlServe:'http://127.0.0.1:8000/api/', 
    urlUi: 'http://localhost:3000/',
    goToLogin() {
        window.location.href = URL_API.urlUi;
    },
    refreshPage(){ 
        window.location.reload(); 
    },
    logoutUser(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser.access_token != null) {
            currentUser.access_token = null
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
        URL_API.goToLogin()

    }
};

export default URL_API