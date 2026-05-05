# TalkSpace Messaging System

![React](https://img.shields.io/badge/React-18-blue)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

TalkSpace is a real-time messaging web application built with React and Firebase.  
The project focuses on live communication, user presence tracking, and message state handling, similar to modern chat platforms.

Repository:  
https://github.com/Htut-7/TalkSpace_Messaging-System

---

## Overview

This application allows users to communicate in real time with features such as message delivery tracking and online presence detection.  
Real-time chat applications typically rely on live data synchronization to provide instant messaging experiences. :contentReference[oaicite:0]{index=0}

---

## Features

- Real-time messaging using Firestore listeners
- Firebase Authentication (Email/Password)
- Online and offline user presence system
- Dynamic "last seen" status
- Message states:
  - Sent
  - Delivered
  - Read
- Unique chat ID system to avoid duplicate conversations
- Live user search functionality
- Auto-scroll chat behavior
- Responsive design for desktop and mobile
- Modular and reusable component structure

---

## Tech Stack

- React (Vite)
- Firebase Authentication
- Firebase Firestore
- React Router
- CSS (custom UI design)

---

## Project Structure
src/
├── components/
│ ├── Header.jsx
│ ├── Sidebar.jsx
│ ├── Chatwindow.jsx
│ ├── MessageList.jsx
│ ├── MessageInput.jsx
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── Profile.jsx
│
├── hooks/
│ ├── useSignin.js
│ ├── useSignup.js
│ ├── useSignout.js
│
├── firebase/
│ └── Firebase.js
│
├── utils/
│ └── Chat.js


---

## Installation

Clone the repository:
https://github.com/Htut-7/TalkSpace_Messaging-System.git

cd TalkSpace_Messaging-System

## Firebase Setup

Create a Firebase project and enable:

- Authentication (Email/Password)
- Firestore Database

Then configure:
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);