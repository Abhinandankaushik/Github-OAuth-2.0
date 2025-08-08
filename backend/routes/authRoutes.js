import express from "express";
import { gitHubCallback, gitHubLogin, gitHubProfile } from "../controllers/authControllers.js";


const router = express.Router();

router.get('/githublogin', gitHubLogin);
router.get('/github/callback', gitHubCallback);
router.get('/github/profile', gitHubProfile);



export default router;