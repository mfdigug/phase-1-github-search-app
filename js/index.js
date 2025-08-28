// variables
const form = document.querySelector('#github-form')
const repoDisplay = document.querySelector('#repos-list')
let userData = []

// STEP 1: Submitted form takes input value and return user matches using the User Search Endpoint.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearchInput(e);
})

function handleSearchInput(e){
   const searchTerm = e.target.search.value;
   fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/vnd.github.v3+json'
    }
   }) 
   //should I put a header here?
   // custom accept for v3 of code - add to fetch header
   // Accept: application/vnd.github.v3+json
    .then(res => res.json())
    .then(data => {
        //assign data from fetch to userData
        userData = data.items;
        console.log(userData)
        //display user function
        userData.forEach(user => displayUserProfiles(user));
       
    })
}

// STEP 2: Using the results of the search, display information about the users to the page. 
function displayUserProfiles(user){
    userProfile = document.createElement('li');
    const userDisplay = document.querySelector(`#user-list`);
    userProfile.innerHTML = `
    <p>
    <img src=${user.avatar_url}>
    name: ${user.login}
    profile: <a href="${user.url}">Profile Link</a>
    </p>`
    userDisplay.appendChild(userProfile); 
    
    // STEP 3: Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
    userProfile.addEventListener('click', (e) => {
        handleProfileClick(e, user)
    })

    function handleProfileClick(e, user){
        fetch(`https://api.github.com/users/${user.login}/repos`)
       .then((res) => res.json())
       .then(repos => {
        //console.log(repos)
        repos.forEach(repo => displayRepos(repo))
        })


        
    }

    function displayRepos(repo) {
        console.log(repo.full_name)
        const li = document.createElement('li');
        li.innerText = `${repo.full_name}`
        repoDisplay.appendChild(li); 
    }
        
}



// custom accept for v3 of code - add to fetch header
// Accept: application/vnd.github.v3+json
    
// Bonus
// Toggle the search bar between searching for users by keyword and searching for repos by keyword by adding an extra button. Hint: you can use the same search bar for this, but you may need to create a variable which stores what the current search type is (user or repo). The endpoint to search repositories by keyword is hereLinks to an external site..




