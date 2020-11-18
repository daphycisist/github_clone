const username = "daphycisist";
const token = "72ab014c3731e8691ffe63f5079d447b2dcb0085";
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

const miniNavImgWrapper = document.querySelector(".stick-img-wrapper");
const emptyNav = document.querySelector(".empty-nav-div");
const navProfileImg = document.querySelector(".profileimg");
const asideProfileImgWrapper = document.querySelector(
  ".aside-profile-image-wrapper"
);
const asideProfileImg = document.querySelector(".aside-profile-image");
const asideProfileName = document.querySelector(".profile-name");
const asideProfileAbout = document.querySelectorAll(".about");
const publicRepoCount = document.querySelector(".public-repo-number");
const repoContentWrapper = document.querySelector(".repo-content-wrapper");
const navMiniImg = document.querySelector(".stick-img");
const hamburger = document.querySelector(".hamburger");
const hamburgerNav = document.querySelector(".hamburger-nav");
const hamburgerImg = document.querySelector(".hamburger-img");
const hamburgerUsername = document.querySelector(".hamburger-username");

const profileName = document.createElement("h1");
const userName = document.createElement("p");

const getMyGithubData = async () => {
  try {
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
    asideProfileAbout.forEach((item) => item.append(about));

    navMiniImg.src = avatarUrl;

    hamburgerImg.src = avatarUrl;
    hamburgerUsername.innerHTML = login;

    hamburger.onclick = () => {
      hamburgerNav.classList.toggle("hamburger-nav-show");
    };

    const profileTest = document.querySelector(".profile-img-container");

    const asideUsername = asideProfileName.getElementsByTagName("p")[0];
    const emptyDivUsername = emptyNav.getElementsByTagName("p")[0];

    const elemento = document.createElement("div");
    elemento.className = "elemento";

    elementOffset =
      asideProfileImgWrapper.getBoundingClientRect().bottom + window.scrollY;
    window.onscroll = () => {
      if (window.innerWidth > 768) {
        if (window.pageYOffset > elementOffset) {
          miniNavImgWrapper.style.display = "flex";
          navMiniImg.style.display = "block";
          asideUsername.style.display = "none";
        } else {
          emptyDivUsername.innerHTML = usernameData;
          miniNavImgWrapper.style.display = "none";
          navMiniImg.style.display = "none";
          asideUsername.style.display = "block";
        }
      }
    };

    window.onresize = () => {
      if (window.innerWidth > 768) {
        hamburgerNav.classList.remove("hamburger-nav-show");
      }
    };

    repoArray.map((repo) => {
      const repoLanguage = repo.primaryLanguage;
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
      starSpan.className = "star-span";

      const { name, description, forkCount, stargazerCount, updatedAt } = repo;

      const forkedRepo = repo.parent;

      repoTitle.innerHTML = name;
      repoData.append(repoTitle);

      if (repoLanguage) {
        const { color, name } = repoLanguage;
        const languageContainer = document.createElement("div");
        const languageColor = document.createElement("span");
        const language = document.createElement("p");
        language.append(name);
        languageColor.className = "language-icon";
        languageColor.style.backgroundColor = color;
        languageContainer.append(languageColor, language);
        languageContainer.className = "repo-info-data";
        repoInfo.append(languageContainer);
      }

      if (forkCount > 0 || forkedRepo) {
        const forkContainer = document.createElement("div");
        const forkIcon = document.createElement("img");
        const forks = document.createElement("p");
        forkIcon.src = "src/images/fork.svg";

        const appendCount = forkCount ? forkCount : forkedRepo.forkCount;

        forks.append(appendCount);
        forkContainer.append(forkIcon, forks);
        forkContainer.className = "repo-info-data";
        repoInfo.append(forkContainer);
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
      starSpan.innerHTML = "Star";
      repoStar.append(starSpan);

      repoDataWrapper.append(repoData, repoStar);
      repoContent.append(repoDataWrapper);
      repoContentWrapper.append(repoContent);
    });
  } catch (error) {
    console.log(error.message);
  }
};

getMyGithubData();
