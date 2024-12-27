const router = require("express").Router();

const authorRouter = require("./author.routes");
const author_socialRouter = require("./author_social.routes");
const categoryRouter = require("./category.routes");
const dictRouter = require("./dictionary.routes");
const synonymRouter = require("./synonym.routes");
const descriptionRouter = require("./description.routes");
const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const topicRouter = require("./admin.routes")

router.use("/author", authorRouter);
router.use("/author_social", author_socialRouter);
router.use("/category", categoryRouter);
router.use("/dictionary", dictRouter);
router.use("/synonym", synonymRouter);
router.use("/description", descriptionRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/topic", topicRouter)

module.exports = router;