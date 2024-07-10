import mongoose from "mongoose";

const UserSchema = (mongoose as any).Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provide"],
      unique: [true, "Username must be unique"],
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email must be provide"],
      unique: [true, "Email must be unique"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
