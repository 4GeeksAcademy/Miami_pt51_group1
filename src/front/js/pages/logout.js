// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import { Context } from "../store/appContext";

export const Logout = () => {
    const express = require('express');
    const app = express();

    app.post('/logout',(res) => {
        res.status(200).send('Logged out successfully');
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}
document.getElementById('logoutButton').addEventListener ('click',async () => {
    try{
        await fetch('/logout', {
            method: 'POST',
        });
        window.location.href="/";
    } catch (error) {
        console.error('Logout failed:', error);
    }
});