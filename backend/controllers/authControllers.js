import dotenv from 'dotenv';
import axios from 'axios';

import { generateState } from '../utils/authUtils.js';
dotenv.config();


export const gitHubLogin = async (req, res) => {

    const state = generateState();

    // Store state and nonce in session cookies
    res.cookie("oauth_state", state, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: "lax",
    });

    const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${process.env.GITHUB_CLIENTID}` +
        `&scope=repo` +
        `&redirect_uri=${encodeURIComponent(process.env.GITHUB_CALLBACK_URI)}` +
        `&state=${state}`;


    res.redirect(githubAuthUrl);

}

let temp_acc_token = null;

export const gitHubCallback = async (req, res) => {


    try {
        const { code, state } = req.query;
        const savedState = req.cookies.oauth_state;

        console.log("State from query:", state);
        console.log("Saved state from cookies:", savedState);
        console.log("Code from query:", code);

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENTID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: req.query.code,
                redirect_uri: process.env.GITHUB_CALLBACK_URI
            },
            {
                headers: { Accept: "application/json" }
            }
        );

        console.log("data is : ", tokenResponse.data);
        temp_acc_token = tokenResponse.data.access_token;

        res.redirect('http://localhost:8000/auth/github/profile');

    } catch (error) {
        console.error("Error during GitHub callback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const gitHubProfile = async (req, res) => {

    const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${temp_acc_token}`,
            Accept: "application/json",
            "User-Agent": "YourAppName" // optional but good practice
        }
    });

    console.log(userResponse.data);
    res.status(200).json({
        message: "User profile fetched successfully",
        user: userResponse.data
    }
    );

}