const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const profileContentEl = document.getElementById("profileContent");
const loadingEl = document.getElementById("loading");

const url = "https://api.github.com/users";

const generateProfile = (profile) => {
    return `
     <div class="profile">
                <div class="top-section">
                    <div class="user">
                        <div class="image">
                            <img alt="avatar" src="${profile.avatar_url}" />
                        </div>
                        <div class="username">
                            <h1>${profile.name}</h1>
                            <h1 class="grey">@${profile.login}</h1>
                        </div>
                    </div>
                    <div class="btn">
                    <a href="${profile.html_url}" target="_blank">
                        <button>Click Profile</button>
                    </a>
                    </div>
                </div>
                <div class="about-section">
                    <h2>About</h2>
                    <p>${profile.bio}</p>
                </div>
                <div class="social-section">
                    <div class="followers">
                        <h3>Followers</h3>
                        <p>${profile.followers}</p>
                    </div>
                    <div class="followings">
                        <h3>Followings</h3>
                        <p>${profile.following}</p>
                    </div>
                    <div class="repository">
                        <h3>Repository</h3>
                        <p>${profile.public_repos}</p>
                    </div>
                </div>
            </div>
    `;
};

const fetchProfile = async () => {
    const username = searchInputEl.value;

    loadingEl.innerText = "loading.....";
    loadingEl.style.color = "black";

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();
        if(data.bio) {
            loadingEl.innerText = "";
            profileContentEl.innerHTML = generateProfile(data);
        }
        else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red";
            profileContentEl.innerText = "";
        }
    }
    catch(error){
        console.log({error});
        loadingEl.innerText = "";
    }
};

searchBtnEl.addEventListener("click", fetchProfile);