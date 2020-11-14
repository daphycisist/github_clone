const token = "f6f88fabdd40b80e36b0cd21db3d87c63923a43c";
const username = "daphycisist";

async function fetchGraphQL(text) {
    const GITHUB_AUTH_TOKEN = token;
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${GITHUB_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
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
    user(login: "${username}"){
     avatarUrl
     login
     bio
     name
     
     repositories(first: 20, ) {
       totalCount
         nodes{
           name
           stargazerCount
           updatedAt
              languages(first:1){
             nodes{
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
        "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query: query })
};


const getMyGithubData = async () => {
    // fetchGraphQL(query).then(res => console.log(res)).catch(console.error);
  
  const response = await fetchGraphQL(query);
  console.log(response.data.user.name)
  const navProfileImg = document.getElementById("profileimg");
  const asideProfileImg = document.getElementById("aside-profile-image");
  navProfileImg.src = response.data.user.avatarUrl;

  
}

getMyGithubData()