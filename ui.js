class UI {
  constructor() {
    this.searchUser = document.getElementById("searchUser");
    this.searchUserBtn = document.getElementById("searchUserBtn");
    this.resultDiv = document.getElementById("result");

    this.profileCardBody = document.getElementById("profile");
    this.hideProfileChevron = document.getElementById("hide-profile");
    this.profileBriefly = document.getElementById("profile-briefly");

    this.reposCard = document.getElementById("repos-card");
    this.reposCardBody = document.getElementById("repos");
    this.hideReposChevron = document.getElementById("hide-repos");
    this.reposBriefly = document.getElementById("repos-briefly");

    this.alert = document.getElementById("alert");

    this.animateNavBarBrand();
    this.addUIEventListeners();
  }
  animateNavBarBrand() {
    const navbarBrand = document.querySelector(".navbar-brand");
    setInterval(() => {
      navbarBrand.classList.add("animate");
      setTimeout(() => navbarBrand.classList.remove("animate"), 2000);
    }, 7000);
  }

  addUIEventListeners() {
    this.hideProfileChevron.addEventListener("click", (e) => {
      if (e.target.classList.contains("rotated")) {
        this.profileCardBody.classList.add("hidden");
        this.reposCard.classList.add("hidden");
        e.target.classList.remove("rotated");
      } else {
        this.profileCardBody.classList.remove("hidden");
        this.reposCard.classList.remove("hidden");
        e.target.classList.add("rotated");
      }
    });
    this.hideReposChevron.addEventListener("click", (e) => {
      if (e.target.classList.contains("rotated")) {
        this.reposCardBody.classList.add("hidden");
        e.target.classList.remove("rotated");
      } else {
        this.reposCardBody.classList.remove("hidden");
        e.target.classList.add("rotated");
      }
    });
  }

  searchEventListeneer(callback) {
    searchUserBtn.addEventListener("click", (e) => {
      if (this.searchUser.value !== "") {
        callback(this.searchUser.value);
        this.searchUser.value = "";
      } else {
        console.log("Empty Input");
      }
    });
  }
  showResult() {
    this.resultDiv.classList.remove("hidden");
  }
  showProfile(profile) {
    console.log(profile);
    this.showProfileBriefly(profile);
    this.profileCardBody.innerHTML = `
    <hr class="border border-1 border-secondary">
    <div class="row">
    <div class="col-12 col-sm-5 col-md-4 col-lg-3">
    <img class="mb-3 card-image" src=${profile["avatar_url"]}>
    <a target="_blank" href="${profile["html_url"]}" class="btn btn-primary d-block mb-sm-0 mb-2">View Profile</a>
    </div>
    <div class="col-12 col-sm-7 col-md-8 col-lg-9 profile-info-right"></div>
    </div>`;
    const profileInfoRight = document.querySelector(".profile-info-right");
    profileInfoRight.innerHTML = `
    <div class="d-flex justify-content-center">
    <a target="_blank" class="link-light badge bg-success px-3 py-2 text-decoration-none mx-2 mb-2 d-md-none" href="https://github.com/${profile["login"]}?tab=followers"><i class="fa-solid fa-person-walking-arrow-loop-left"></i> Followers: ${profile["followers"]}</a>
    <a target="_blank" class="link-light badge bg-info px-3 py-2 text-decoration-none mx-2 mb-2 d-md-none" href="https://github.com/${profile["login"]}?tab=following"><i class="fa-solid fa-person-walking-arrow-right"></i> Following: ${profile["following"]}</a>
    </div>
    `;
    const name = profile["name"] ? profile["name"] : null;
    if (name) {
      profileInfoRight.innerHTML += `
    <h3 class="card-title text-secondary text-center text-md-start mb-2 mb-md-3">${name}<h3>
    `;
    }
    const location = profile["location"] ? profile["location"] : null;
    if (location) {
      profileInfoRight.innerHTML += `
    <p class="card-text text-secondary text-center text-md-start mb-2 mb-md-3"><span class="fw-bold">Location</span>: ${location}</p>
    `;
    }
    const company = profile["company"] ? profile["company"] : null;
    if (company) {
      profileInfoRight.innerHTML += `
    <p class="card-text text-secondary text-center text-md-start mb-2 mb-md-3"><span class="fw-bold">Company</span>: ${company}</p>
    `;
    }
    const blog = profile["blog"] ? profile["blog"] : null;
    if (blog) {
      profileInfoRight.innerHTML += `
    <p class="card-text text-secondary text-center text-md-start mb-2 mb-md-3"><span class="fw-bold">Blog/Website</span>: <a href="${blog}" class="text-decoration-none text-secondary">${blog}</a></p>
    `;
    }
    const yearCreated = new Date(profile["created_at"]).getFullYear();
    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "Nobember",
      11: "December",
    };
    const monthCreated = months[new Date(profile["created_at"]).getMonth()];
    profileInfoRight.innerHTML += `
    <p class="card-text text-secondary text-center text-md-start"><span class="fw-bold">Member Since</span>: ${monthCreated} ${yearCreated}</p>
    `;
  }

  showProfileBriefly(profile) {
    this.profileBriefly.innerHTML = `
    <a target="_blank" class="fs-5 text-decoration-none text-secondary col-auto" href="${profile["html_url"]}"><i class="fa-brands fa-github-alt fs-4 mx-2"></i> ${profile["login"]}</a>
    <a target="_blank" class="link-light badge bg-primary px-3 py-2 text-decoration-none col-auto mx-2" href="https://github.com/${profile["login"]}?tab=repositories"><i class="fa-solid fa-book-bookmark"></i> Repos: ${profile["public_repos"]}</a>
    <a target="_blank" class="link-light badge bg-success px-3 py-2 text-decoration-none col-auto mx-2 d-none d-md-block" href="https://github.com/${profile["login"]}?tab=followers"><i class="fa-solid fa-person-walking-arrow-loop-left"></i> Followers: ${profile["followers"]}</a>
    <a target="_blank" class="link-light badge bg-info px-3 py-2 text-decoration-none col-auto mx-2 d-none d-md-block" href="https://github.com/${profile["login"]}?tab=following"><i class="fa-solid fa-person-walking-arrow-right"></i> Following: ${profile["following"]}</a>
    `;
  }

  getRepos(callback) {
    const reposToShow = 5;
    callback({ reposToShow: reposToShow, reposSort: "created:asc" });
  }

  showRepos(repos) {
    console.log(repos);
    const reposCardHeader = document.getElementById("repos-card-header");
    reposCardHeader.textContent = `Latest ${repos.length} Repos`;
    for (let index = 0; index < repos.length; index++) {
      const repo = repos[index];
      this.reposCardBody.innerHTML += `
      <div class="col-md-6">
      <div class=" card card-body">
      <div class="row">
      <div class="col-auto">
      <a target="_blank" href="${repo["html_url"]}" class="text-decoration-none text-secondary">${repo["name"]}</a>
      </div>
      <div class="col">
      <span class="badge bg-primary"><i class="fa-solid fa-star"></i> ${repo["stargazers_count"]}</span>
      <span class="badge bg-secondary"><i class="fa-solid fa-eye"></i> ${repo["watchers_count"]}</span>
      <span class="badge bg-success"><i class="fa-solid fa-code-fork"></i> ${repo["forks_count"]}</span>
      </div>
      </div>
      </div>
      </div>
      `;
    }
  }

  showAlert(alert, type) {
    this.alert.textContent = alert;

    this.alert.classList.add("alert", `alert-${type}`);
    this.alert.classList.remove("hidden");

    setTimeout(() => {
      this.alert.classList.remove("alert", `alert-${type}`);
      this.alert.classList.add("hidden");
    }, 5000);
  }
}
