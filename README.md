#﻿# stock-watchlist-app

##Overview

This is a web application that allows users to manage a stock watchlist, view real-time stock prices, and visualize historical data with charts. Users can create an account, log in to manage their watchlis.

#Features

-User Authentication: Secure login and registration for users to access their personalized watchlists.
-Stock Watchlist: Add and manage a list of companies by their ticker symbols.
-Real-Time Prices: Display up-to-date stock prices for all companies in the watchlist.
-Historical Data Visualization: Interactive charts to visualize historical stock price data for companies in the watchlist.
-Responsive Design: Optimized for both desktop and mobile users.

##Tech Stack

-Frontend: React, Chart.js for data visualization.
-Backend: Node.js, Express.js.
-Database: MongoDB for storing user information and watchlists.
-API Integration: Alpha Vantage API for fetching real-time and historical stock data.
-Authentication: JSON Web Tokens (JWT) for secure authentication and session management.

##Backend Setup

-Clone the repository:
  git clone https://github.com/yourusername/stock-watchlist-app.git
  cd stock-watchlist-app
-Install dependencies:
 cd api
 npm install
 cd ..
 cd client
 npm start
-Create a .env file and add your environment variables:
 MONGO_URI=your_mongodb_uri
 JWT_SECRET=your_jwt_secret
 ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key

  
