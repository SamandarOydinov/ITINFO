const { getAllDictionary } = require("../controllers/dictionary.controller");
const { creatViewPage } = require("../helpers/createViewPage");
const { errorHandler } = require("../helpers/error_Handler");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(creatViewPage("index"), { title: "Asosiy sahifa", isHome: true });
});
router.get("/dict", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/api/dictionary");

    if (!response.ok) {
      throw new Error(` ${response.status}`);
    }
    const { data: items } = await response.json();

    console.log(items);

    res.render(creatViewPage("dictionary"), {
      title: "Asosiy sahifa",
      isHome: true,
      items: items,
    });
  } catch (error) {
    errorHandler(error, res);
  }
});
router.get("/topics", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/api/user");

    if (!response.ok) {
      throw new Error(` ${response.status}`);
    }
    const { data: items } = await response.json();

    console.log(items);

    res.render(creatViewPage("topics"), {
      title: "Maqolalar",
      isTopic: true,
      items: items,
    });
  } catch (error) {
    errorHandler(error, res);
  }
});
router.get("/authors", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/api/author");

    if (!response.ok) {
      throw new Error(` ${response.status}`);
    }
    const { data: items } = await response.json();

    console.log(items);

    res.render(creatViewPage("authors"), {
      title: "Mualliflar",
      isAuthor: true,
      items: items,
    });
  } catch (error) {
    errorHandler(error, res);
  }
});
router.get("/admins", (req, res) => {
  res.render(creatViewPage("admins"), { title: "Admin", isAdmin: true });
});
router.get("/authorLogin", (req, res) => {
  res.render(creatViewPage("authorLogin"), { title: "Login", isLogin: true });
});
router.get("/adminLogin", (req, res) => {
  res.render(creatViewPage("adminLogin"), { title: "Login", isLogin: true });
});
router.get("/addAuthor", (req, res) => {
  res.render(creatViewPage("addAuthors"), { title: "Add Author", isAddAuthor: true });
});

module.exports = router;
