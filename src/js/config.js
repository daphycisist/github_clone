const username = "daphycisist";
const token = "535824cd4b227bfcd3a34b0900064dfcf30e60d1";
// console.log(process.env);
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
  user(login: "daphycisist") {
    avatarUrl
    login
    bio
    name
    repositories(first: 20, ownerAffiliations: [OWNER], orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        description
        name
        stargazerCount
        updatedAt
        primaryLanguage {
          name
          color
        }
        forkCount
        parent {
          forkCount
        }
        licenseInfo {
          name
        }
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

const navProfileImg = document.querySelector(".profileimg");
const asideProfileImg = document.querySelector(".aside-profile-image");
const asideProfileName = document.querySelector(".profile-name");
const asideProfileAbout = document.querySelector(".about");
const publicRepoCount = document.querySelector(".public-repo-number");
const repoContentWrapper = document.querySelector(".repo-content-wrapper");

const profileName = document.createElement("h1");
const userName = document.createElement("p");

const getMyGithubData = async () => {
  try {
    const response = await fetchGraphQL(query);
    // console.log(response.data.user.repositories.nodes);
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
      const repoLanguage = repo.primaryLanguage;

      console.log(repo)
      const repoContent = document.createElement("div");
      const repoDataWrapper = document.createElement("div");
      const repoData = document.createElement("div");
      const repoInfo = document.createElement("div");
      const repoStar = document.createElement("div");
      const repoStarIcon = document.createElement("img");
      const starSpan = document.createElement("span");
      

      

      repoStarIcon.src = "src/images/star.svg";

      const repoTitle = document.createElement("a");
      repoTitle.href = "#";
      const repoDescription = document.createElement("p");

      repoDataWrapper.className = "repo-data-wrapper";
      repoData.className = "repo-data";
      repoInfo.className = "repo-info";
      repoContent.className = "repo-content";
      repoTitle.className = "repo-title";
      repoDescription.className = "repo-description";
      repoStar.className = "star-repo-button";
      starSpan.className = "star-span"

      const { name, description, forkCount, stargazerCount, updatedAt } = repo;
      // console.log(repo.parent)

      const forkedRepo = repo.parent;

      // console.log(repo)
      // console.log(repo.licenseInfo)




      repoTitle.innerHTML = name;
      repoData.append(repoTitle);

      if (repoLanguage) {
        const { color, name } = repoLanguage;
        const languageContainer = document.createElement("div")
        const languageColor = document.createElement("span")
        const language = document.createElement("p")
        language.append(name)
        languageColor.className = "language-icon"
        languageColor.style.backgroundColor = color
        languageContainer.append(languageColor, language);
        languageContainer.className = "repo-info-data";
        repoInfo.append(languageContainer)
      }

      if (forkCount > 0 || forkedRepo) {
        const forkContainer = document.createElement("div");
        const forkIcon = document.createElement("img");
        const forks = document.createElement("p");
        forkIcon.src = "src/images/fork.svg";

        const appendCount = forkCount ? forkCount : forkedRepo.forkCount

        forks.append(appendCount);
        forkContainer.append(forkIcon, forks);
        forkContainer.className = "repo-info-data"
        repoInfo.append(forkContainer)
      }

      const licensed = repo.licenseInfo;

      if (licensed) {
        const licenseContainer = document.createElement("div");
        const licenseIcon = document.createElement("img");
        const license = document.createElement("p");
        licenseIcon.src = "src/images/license.svg";
        
        license.append(licensed.name);
        licenseContainer.append(licenseIcon, license);
        licenseContainer.className = "repo-info-data";
        repoInfo.append(licenseContainer);
      }

      if (description) {
        repoDescription.append(description);
        repoData.append(repoDescription);
      }

      repoData.append(repoInfo);

      repoStar.append(repoStarIcon);
      starSpan.innerHTML = "Star"
      repoStar.append(starSpan);

      repoDataWrapper.append(repoData, repoStar);
      repoContent.append(repoDataWrapper);
      repoContentWrapper.append(repoContent);

    });

    // console.log(asideProfileName);
  } catch (error) {
    console.log(error.message);
  }



  const profileTest = document.querySelector('aside-profile-image');
  const stick = document.querySelector('stick-img');

  var y = window.scrollY
// get scroll position in px
// console.log(el.scrollLeft, el.scrollTop);
  
  if (window.scrollY > 102) {
    stick.style.display = "block"
  }
  
  console.log(y)

};

getMyGithubData();



