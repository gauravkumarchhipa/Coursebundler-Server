import express from "express";
import { getAllCourse, createCourse, getCourseLectures, addLecture, deleteCourse, deleteLecture } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without Lectures
router.route("/courses").get(getAllCourse);

// create new course only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add lectures, delete Course, Get Course Details
router
    .route("/course/:id")
    .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
    .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
    .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lecture 
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture)

export default router;