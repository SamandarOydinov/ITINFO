async function getAllAdmin() {
  let accesToken = localStorage.getItem("Admin_accesToken");
  if (accesToken == "undefined") {
    return window.location.replace("/adminLogin");
  }

  console.log("accesToken:admin_script: ", accesToken);
  const accesTokenExpTime = getAccesTokenExpireTime(accesToken);
  console.log("accesTokenExpTime: ", accesTokenExpTime);

  if (accesTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accesTokenExpTime) {
      console.log("AccesToken faol");
    } else {
      console.log("AccesToken faol emas!");
      accesToken = await refreshTokenFuncAdmin();
      console.log("New AccesToken: ", accesToken);
    }
  }

  fetch("http://localhost:3000/api/admin/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accesToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status" + response.status);
      }
    })
    .then((admin) => {
      console.log(admin.data);
      if (admin.data.is_creator) {
        displayAdmin(admin.data);
      } else {
        const adminList = document.getElementById("admin-list");
        const listItem = document.createElement("li");
        listItem.textContent = `Siz SuperAdmin emassiz`;
        adminList.appendChild(listItem);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
function displayAdmin(admins) {
  const adminList = document.getElementById("admin-list");
  admins.forEach((admin) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${admin.name} ${admin.email}`;
    adminList.appendChild(listItem);
  });
}
function getAccesTokenExpireTime(token) {
  console.log("token: ", token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshTokenFuncAdmin() {
  try {
    const response = await fetch("http://localhost:3000/api/admin/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.error && data.error == "jwt expired") {
      console.log("RefreshTokenni ham vaqti chiqib ketgan! ");
      console.log("Shu yerda");
      return window.location.replace("/adminLogin");
    }
    console.log(data);
    localStorage.setItem("Admin_accesToken", data.accesToken);
    return data.accesToken;
  } catch (error) {
    console.log("RefreshTokenAdmin: ", error);
    return window.location.replace("/adminLogin");
  }
}
