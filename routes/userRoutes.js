import express from "express";
import { login, register, logout, getMyProfile, changePassword, updateProfile, updateProfilePictures, forgetPassword, resetPassword, addtoPlaylist, removeFromPlaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(isAuthenticated, logout);

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// change my password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update profile pictures
router.route("/updateprofilepictures").put(isAuthenticated, singleUpload, updateProfilePictures);

// forget password
router.route("/forgetpassword").post(forgetPassword);

// reset password
router.route("/resetpassword/:token").put(resetPassword);

// add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addtoPlaylist);

// remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router.route("/admin/user/:id")
    .put(isAuthenticated, authorizeAdmin, updateUserRole)
    .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;