const Comment = require("../models/Post/comment");
const Post = require("../models/Post/post");
const Report = require("../models/Post/report");
const ErrorHandler = require("../utils/ErrorHandler");
const SuccessHandler = require("../utils/SuccessHandler");

const createPost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'Create a post'
  try {
    const {
      title,
      description,
      tags,
      category,
      plan,
      country,
      price,
      comission,
      link,
      purchaseFirst,
      type,
      countryCode,
      comissionValue,
    } = req.body;
    console.log("req.body", req.body);
    const post = new Post({
      title,
      image: req.awsImages?.length > 0 ? req.awsImages?.[0] : "",
      description,
      tags: JSON.parse(tags),
      category: JSON.parse(category),
      plan: JSON.parse(plan),
      country,
      countryCode,
      price,
      comission: JSON.parse(comission),
      link,
      purchaseFirst,
      type,
      comissionValue,
      user: req.user._id,
    });
    const savedPost = await post.save();
    if (!savedPost) {
      return ErrorHandler("Post not saved", 400, req, res);
    }
    return SuccessHandler("Post created successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const fetchPosts = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'Fetch all posts'
  try {
    const user = req.user;
    // if (user.premium == false && req.body.commmision) {
    //   return ErrorHandler("User not premium", 400, req, res);
    // }
    // if (user.premium == false && req.body.type) {
    //   return ErrorHandler("User not premium", 400, req, res);
    // }
    // if (user.premium == false && req.body.purchaseFirst) {
    //   return ErrorHandler("User not premium", 400, req, res);
    // }

    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter = req.body.search
      ? {
          $or: [
            {
              title: {
                $regex: req.body.search,
                $options: "i",
              },
            },
            {
              tags: {
                $in: [req.body.search],
              },
            },
          ],
        }
      : {};
    // const searchFilter = req.body.search
    //   ? {
    //       title: {
    //         $regex: req.body.search,
    //         $options: "i",
    //       },
    //     }
    //   : {};

    // const tagFilter = req.body.tags
    //   ? {
    //       tags: {
    //         $in: [req.body.tags],
    //       },
    //     }
    //   : {};

    const categoryFilter = req.body.category
      ? {
          category: {
            $in: req.body.category,
          },
        }
      : {};

    const planFilter = req.body.plan
    ? {
        plan: {
          $in: req.body.plan,
        },
      }
    : {};

    const countryFilter = req.body.country
      ? {
          country: {
            $regex: req.body.country,
            $options: "i",
          },
        }
      : {};

    const comissionFilter = req.body.comission
      ? {
        comission: [req.body.comission],
          // comission: {
          //   $in: [req.body.comission],
          // },
        }
      : {};

    const typeFilter = req.body.type
      ? {
          type: req.body.type,
        }
      : {};

    const purchaseFirstFilter =
      String(req.body.purchaseFirst) !== ""
        ? {
            purchaseFirst: Boolean(req.body.purchaseFirst),
          }
        : {};

    console.log("purchaseFirstFilter", purchaseFirstFilter);

    const priceRangeFilter =
      req.body.priceRange &&
      req.body.priceRange.length == 2 &&
      req.body.priceRange[0] !== 0 &&
      req.body.priceRange[1] !== 0
        ? {
            price: {
              $gte: req.body.priceRange[0],
              $lte: req.body.priceRange[1],
            },
          }
        : {};

    // const reportIds = await Report.find({ user: user?._id }).distinct("_id");

    const reportFilter = false
      ? {
          reports: { $nin: reportIds },
        }
      : {};

    const total = await Post.find({
      ...searchFilter,
      // ...tagFilter,
      ...countryFilter,
      ...comissionFilter,
      ...typeFilter,
      ...purchaseFirstFilter,
      ...priceRangeFilter,
      ...reportFilter,
      ...categoryFilter,
      ...planFilter,
      isActive: true,
      expired: false,
    }).countDocuments();
    const livePosts = await Post.find({
      ...searchFilter,
      // ...tagFilter,
      ...countryFilter,
      ...comissionFilter,
      ...typeFilter,
      ...purchaseFirstFilter,
      ...priceRangeFilter,
      ...reportFilter,
      ...categoryFilter,
      ...planFilter,
      isActive: true,
      expired: false,
    })
      .populate("user likes comments reports")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .skip(skip)
      .limit(limit);
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "post",
    //     model: "Post",
    //   },
    // });
    // }).populate("user", "name email");
    // .sort({ createdAt: -1 })
    // .limit(10)
    // .skip(req.body.page * 10);

    // const expiredPosts = await Post.find({
    //   ...searchFilter,
    //   ...tagFilter,
    //   ...countryFilter,
    //   ...comissionFilter,
    //   ...typeFilter,
    //   ...purchaseFirstFilter,
    //   ...priceRangeFilter,
    //   isActive: true,
    //   expired: true,
    // }).populate("user", "name email");
    // .sort({ createdAt: -1 })
    // .limit(10)
    // .skip(req.body.page * 10);

    // if (user.premium == false) {
    //   await livePosts.select("-likes");
    //   await expiredPosts.select("-likes");
    // }
    return SuccessHandler(
      {
        livePosts,
        total,
        // expiredPosts,
        message: "Posts fetched successfully",
      },
      200,
      res
    );
  } catch (error) {
    console.log("error fetch", error);
    return ErrorHandler(error.message, 500, req, res);
  }
};

const HeartReactPost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'Heart react to a post'
  try {
    const { post, react } = req.body;

    Post.findByIdAndUpdate(
      post,
      react
        ? { $push: { likes: req.user._id } }
        : { $pull: { likes: req.user._id } },
      { new: true }
    )
      .then(() => {
        return SuccessHandler("Post updated successfully", 200, res);
      })
      .catch((err) => {
        return ErrorHandler("Post not updated", 400, req, res);
      });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const rePost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'repost'
  try {
    const { post } = req.body;

    Post.findByIdAndUpdate(
      post,
      { expired: false, updatedAt: Date.now(), $inc: { repostCount: 1 } },
      { new: true }
    )
      .then(() => {
        return SuccessHandler("Post reposted successfully", 200, res);
      })
      .catch((err) => {
        return ErrorHandler("Post not reposted", 400, req, res);
      });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const addNewComment = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'repost'
  try {
    const { post, text } = req.body;

    await Comment.create({
      post,
      text,
      user: req.user._id,
    }).then((data) => {
      Post.findByIdAndUpdate(
        post,
        { $push: { comments: data?._id } },
        { new: true }
      )
        .then(() => {
          return SuccessHandler("Comment Added successfully", 200, res);
        })
        .catch((err) => {
          return ErrorHandler("comment not added", 400, req, res);
        });
    });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const reportPost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'report'
  try {
    const { postId, text } = req.body;
    const newReport = await Report.create({
      post: postId,
      text,
      user: req.user._id,
    });
    await Post.findByIdAndUpdate(
      postId,
      { $push: { reports: newReport._id } },
      { new: true }
    );
    return SuccessHandler("Reported successfully", 200, res);
  } catch (error) {
    console.log("error report", error);
    return ErrorHandler(error.message, 500, req, res);
  }
};

const fetchSinglePost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'fetch single post'
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("user likes comments reports")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
        },
      });
    // .populate("user", "name email")
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "user",
    //     select: "name email",
    //   },
    // });
    if (!post) {
      return ErrorHandler("Post not found", 404, req, res);
    }
    return SuccessHandler(
      {
        post,
        message: "Post fetched successfully",
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const fetchMyPosts = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'Fetch all posts of a user'
  try {
    const user = req.user;
    const userFilter = user?._id
      ? {
          user: user?._id,
        }
      : {};

    const favFilter = user?._id
      ? {
          likes: { $in: user?._id },
        }
      : {};

    const reportIds = await Report.find({ user: user?._id }).distinct("_id");

    const reportFilter = user?._id
      ? {
          reports: { $in: reportIds },
        }
      : {};
    // const searchFilter = req.body.search
    //   ? {
    //       title: {
    //         $regex: req.body.search,
    //         $options: "i",
    //       },
    //     }
    //   : {};

    // const tagFilter =
    //   req.body.tags?.length > 0
    //     ? {
    //         tags: {
    //           $in: req.body.tags,
    //         },
    //       }
    //     : {};

    // const countryFilter = req.body.country
    //   ? {
    //       country: {
    //         $regex: req.body.country,
    //         $options: "i",
    //       },
    //     }
    //   : {};

    // const comissionFilter = req.body.comission
    //   ? {
    //       comission: req.body.comission,
    //     }
    //   : {};

    // const typeFilter = req.body.type
    //   ? {
    //       type: req.body.type,
    //     }
    //   : {};

    // const purchaseFirstFilter = req.body.purchaseFirst
    //   ? {
    //       purchaseFirst: req.body.purchaseFirst,
    //     }
    //   : {};

    // const priceRangeFilter =
    //   req.body.priceRange && req.body.priceRange.length == 2
    //     ? {
    //         price: {
    //           $gte: req.body.priceRange[0],
    //           $lte: req.body.priceRange[1],
    //         },
    //       }
    //     : {};

    const myPosts = await Post.find({
      ...userFilter,
      // ...searchFilter,
      // ...tagFilter,
      // ...countryFilter,
      // ...comissionFilter,
      // ...typeFilter,
      // ...purchaseFirstFilter,
      // ...priceRangeFilter,
      isActive: true,
      expired: false,
    })
      .populate("user likes comments reports")
      .sort({ createdAt: -1 });
    // }).populate("user", "name email");
    // .limit(10)
    // .skip(req.body.page * 10);

    const expiredPosts = await Post.find({
      ...userFilter,
      isActive: true,
      expired: true,
    })
      .populate("user likes comments reports")
      .sort({ createdAt: -1 });

    const favPosts = await Post.find({
      ...favFilter,
      isActive: true,
      expired: false,
    })
      .populate("user likes comments reports")
      .sort({ createdAt: -1 });

    const reportedPosts = await Post.find({
      ...reportFilter,
      isActive: true,
      expired: false,
    })
      .populate("user likes comments reports")
      .sort({ createdAt: -1 });

    return SuccessHandler(
      {
        myPosts,
        expiredPosts,
        favPosts,
        reportedPosts,
        message: "Posts fetched successfully",
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const deletePost = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'delete post'
  try {
    const { post } = req.body;

    Post.findByIdAndDelete(post)
      .then(() => {
        return SuccessHandler("Post deleted successfully", 200, res);
      })
      .catch((err) => {
        return ErrorHandler("Post not deleted", 400, req, res);
      });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const deleteComment = async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.description = 'delete comment'
  try {
    const { commentId } = req.body;

    Comment.findByIdAndDelete(commentId)
      .then(() => {
        return SuccessHandler("Comment deleted successfully", 200, res);
      })
      .catch((err) => {
        return ErrorHandler("Comment not deleted", 400, req, res);
      });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

module.exports = {
  createPost,
  fetchPosts,
  HeartReactPost,
  rePost,
  addNewComment,
  reportPost,
  fetchSinglePost,
  fetchMyPosts,
  deletePost,
  deleteComment,
};
