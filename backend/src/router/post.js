const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const post = require("../controllers/postController.js");
const { uploadImages } = require("../middleware/uploadImage");

router.post("/create", [isAuthenticated, uploadImages], post.createPost);
router.post("/fetch", post.fetchPosts);

router.post("/react-post", isAuthenticated, post.HeartReactPost);
router.post("/add-comment", isAuthenticated, post.addNewComment);
router.post("/repost", isAuthenticated, post.rePost);

router.post("/delete-post", isAuthenticated, post.deletePost);
router.post("/delete-comment", isAuthenticated, post.deleteComment);

router.post("/report", isAuthenticated, post.reportPost);
router.get("/fetch/:id", isAuthenticated, post.fetchSinglePost);

router.get("/user/fetch", isAuthenticated, post.fetchMyPosts);

module.exports = router;
