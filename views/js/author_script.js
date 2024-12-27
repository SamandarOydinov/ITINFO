async function getAuthors() {
  let accesToken = localStorage.getItem("Author_accesToken");
  if (accesToken == "undefined") {
    return window.location.replace("/authorLogin");
  }

  console.log("Author_accesToken: ", accesToken);
  const accesTokenExpTime = getTokenExpirationTime(accesToken)
  console.log("accesTokenExpTime: ", accesTokenExpTime);

  if(accesTokenExpTime){
    const currentTime = new Date()
    if(currentTime < accesTokenExpTime){
      console.log("AccessToken Faol");
    } else {
      console.log("AccessToken Faol emas!");
      accesToken =  await refreshTokenFuncAuthor()
      console.log("New acces Token: ", accesToken);
    }
  }

  fetch("http://localhost:3000/api/author/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accesToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors", //keyin o'rganamiz bugun sana 24-12-2024
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status" + response.status);
      }
    })
    .then((author) => {
      console.log(author.data);
      displayAuthor(author.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayAuthor(authors){
    const authorList = document.getElementById("author-list")
    authors.forEach((author) => {
        const listItem = document.createElement("li")
        listItem.textContent = `${author.first_name} ${author.last_name} ${author.email}`;
        authorList.appendChild(listItem)
    });
}

function getTokenExpirationTime(token){
  const decodedToken = JSON.parse(atob(token.split(".")[1]))
  if(decodedToken.exp){
    return new Date(decodedToken.exp * 1000)
  }
  return null
}

async function refreshTokenFuncAuthor(){
  try {
    const response = await fetch("http://localhost:3000/api/author/refresh",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()

    if(data.error && data.error == "jwt expired"){
      console.log("RefreshTokenni ham vaqti chiqib ketgan! ")
      console.log("Shu yerda");
      return window.location.replace("/authorLogin")
    }
    localStorage.setItem("Author_accesToken", data.accesToken)
    return data.accesToken
  } catch (error) {
    console.log("RefreshToken: ", error);
    return window.location.replace("/authorLogin");
  }
}