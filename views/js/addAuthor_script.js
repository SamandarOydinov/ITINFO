async function addAuthor() {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const nick_name = document.getElementById("nick_name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const info = document.getElementById("info").value;
  const position = document.getElementById("position").value;
  console.log(first_name);
  console.log(last_name);
  console.log(email);
  console.log(nick_name);
  console.log(phone);
  console.log(phone);
  try {
    await fetch("http://localhost:3000/api/author", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        nick_name,
        email,
        phone,
        password,
        info,
        position,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("respons=>", response);
          throw new Error(`${response.status}`);
        }

        console.log("Salom Samandar");
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  } catch (error) {
    console.log("addAuthorSCRIPT: Error:", error.message);
  }
}
