import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    watched_movies: {
        type: [Types.ObjectId],
        ref: "Movie",
        default: [],
    },
    watched_series: {
        type: [Types.ObjectId],
        ref: "Series",
        default: [],
    },
    saved_movies: {
      type: [Types.ObjectId],
      ref: "Movie",
      default: [],
    },
    saved_series: {
      type: [Types.ObjectId],
      ref: "Series",
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.Admin || mongoose.model("User", userSchema);
export default User;