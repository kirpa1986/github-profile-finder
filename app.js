const ui = new UI();
const http = new HTTPWorker();

ui.searchEventListeneer(user => {
    http.get(`https://api.github.com/users/${user}`)
    .then(res => {
        ui.showResult();
        ui.showProfile(res);
        ui.getRepos((params) => {
            http.get(`https://api.github.com/users/${user}/repos?per_page=${params.reposToShow}&sort=${params.reposSort}`)
            .then(res => ui.showRepos(res))
            .catch(err => console.log(err));
        });
    })
    .catch(err => ui.showAlert('User Not Found', 'danger'))
});