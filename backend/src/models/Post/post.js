const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    // minLength: 3,
    maxLength: 3,
  },
  category: {
    type: [String],
    maxLength: 2,
  },
  plan: {
    type: [String],
    maxLength: 2,
  },
  country: {
    type: String,
    default: "global",
  },
  countryCode: String,
  price: {
    type: Number,
    required: true,
  },
  comission: {
    type: [String],
    required: true,
    enum: ["cash", "reward"],
  },
  comissionValue: {
    type: String,
  },
  link: {
    type: String,
    required: false,
  },
  purchaseFirst: {
    type: Boolean,
    required: true,
    // default: false,
  },
  type: {
    type: String,
    required: true,
    enum: ["digital", "physical"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }, //for repost only
  expired: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  reports: {
    type: [Schema.Types.ObjectId],
    ref: "Report",
  },
  repostCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
