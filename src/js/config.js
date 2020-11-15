const username = "daphycisist";
const token = "ba2b6be77168e88e89c90743ef1790d5fc350828";

async function fetchGraphQL(text) {
  const GITHUB_AUTH_TOKEN = token;

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
    }),
  });
  return await response.json();
}
const url = "https://api.github.com/graphql";
const query = `
query { 
    user(login: "daphycisist"){
     avatarUrl
     login
     bio
     name
     
     repositories(first: 30,privacy: PUBLIC, orderBy:{ field: CREATED_AT, direction: DESC } ) {
       totalCount
         nodes{
           description
           name
           stargazerCount
           updatedAt
              languages(first:1){
             nodes{
              color
               name
             }
           }
           forkCount
           }
         }
      }
    }
`;
const opts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ query: query }),
};

const navProfileImg = document.getElementById("profileimg");
const asideProfileImg = document.getElementById("aside-profile-image");
const asideProfileName = document.getElementById("profile-name");
const asideProfileAbout = document.getElementById("about");
const publicRepoCount = document.getElementById("public-repo-number");

const profileName = document.createElement("h1");
const userName = document.createElement("p");

const repoContent = document.getElementById("repo-content");

const getMyGithubData = async () => {
  const response = await fetchGraphQL(query);
  const { name, avatarUrl, login, bio, description } = response.data.user;

  const usernameData = login;
  const about = bio;
  const count = response.data.user.repositories.totalCount;

  const repoArray = response.data.user.repositories.nodes;

  publicRepoCount.append(count);
  navProfileImg.src = avatarUrl;
  asideProfileImg.src = avatarUrl;
  profileName.append(name);
  userName.append(usernameData);

  asideProfileName.append(profileName, userName);
  asideProfileAbout.append(about);

  repoArray.map((repo) => {
    const repoLanguage = repo.languages.nodes[0]
    if (repoLanguage) {
      const {color, name} = repo.languages.nodes[0]
    }


    const {
      name,
      description,
      forkCount,
      stargazerCount,
      updatedAt
    } = repo
    const repoDataWrapper = document.createElement("div");
    const repoData = document.createElement("div");
    const repoInfo = document.createElement("div");

    const repoTitle = document.createElement("a");
    const repoDescription = document.createElement("p");

    repoDataWrapper.className = "repo-data-wrapper"
    repoData.className = "repo-data"
    repoInfo.className = "repo-info"

   
    repoTitle.className = "repo-title";
    // repoTitle.append(name);
    repoTitle.innerHTML = name;

    // repoContent.append(repoTitle);

    if (description) {
      repoDescription.append(description)
    }
    // else {
    //   repoDescription.append("")
    // }

    
  });

  console.log(asideProfileName);
};

getMyGithubData();
