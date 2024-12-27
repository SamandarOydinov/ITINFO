async function getDictionary() {
  await fetch("http://localhost:3000/api/dictionary/", {
    method: "GET",
    headers: {
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
    .then((dict) => {
      console.log("salom+>/", dict.data);
      displayDict(dict.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayDict(dicts) {
  const dictionaryList = document.getElementById("dict-list");
  dicts.forEach((dictionary) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${dictionary.term}`;
    dictionaryList.appendChild(listItem);
  });
}
