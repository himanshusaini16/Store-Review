import express from "express";
import {
  averageRating,
  avgRatingAtOwner,
  getAllRatings,
  getAllStores,
  getProfile,
  getStoreByOwnerId,
  loginUser,
  ratings,
  registerUser,
  resetPassword,
  storeGetById,
  updateProfile,
} from "../controllers/userControllers.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.get("/all-stores", getAllStores);
userRouter.get("/stores/:id", storeGetById);
userRouter.post("/ratings", authUser, ratings);
userRouter.get("/all-ratings/:id", getAllRatings);
userRouter.get("/avg-ratings", averageRating);
userRouter.put("/update-profile", authUser, updateProfile);
userRouter.post("/reset-password", authUser, resetPassword);
userRouter.get("/store-owner", authUser, getStoreByOwnerId);
userRouter.get("/avg-owner", authUser, avgRatingAtOwner);
export default userRouter;
