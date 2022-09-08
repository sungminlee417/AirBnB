# AirBnB Clone

[Live Link](https://bnb-ground.herokuapp.com/)

## Setup

In order to start up this app after cloning it from https://github.com/sungminlee417/AirBnB.git, run `npm install` in both the backend and frontend folders to install all necessary dependencies.

In the backend folder

1. Create a `.env` file following the `.env.example` to set up your local environement variables.
2. Setup the database by running:

- `dotenv npx sequelize db:migrate`
- `dotenv npx sequelize db:seed:all`

3. Run `npm start` to start up the backend.

Run `npm start` to start up your frontend.

## About AirBnB Clone

This AirBnB clone is a PERN stack application using React/Redux for the frontend, and Express/PostgresSQL for the backend. This app allows users to either host or book listings for renting over a period of time. Users also have the ability to edit their listings/bookings as long as the edits pass validations listed on the backend.

![landing-page-screen](./readme-resources/Screen%20Shot%202022-09-06%20at%208.18.46%20AM.png)

## Landing Page

The landing page gives users speedy access to different routes with the usage of React's render and route features. New listings that are created are added and immediately displayed on the landing page through the usage of Redux states and fetch calls to the Express server that grab data from the PostgresSql database. In order to optimize loading time as users navigate throughout the app, Redux clears up particular states using it's built in cleanup functions in order to free up space on it's state.

## Creating Listings

A link that gives access to a logged-in user to create a listing is located in the Navigation bar. The user will be led to a form where they can fill in the information of their listing, which must follow more validators listed on the Express server.

## Creating Bookings

![booking-card](./readme-resources/Screen%20Shot%202022-09-06%20at%201.03.27%20PM.png)

Bookings can be made by selecting a listing on the landing page. Like the other forms, pre-built and custom Express validators must be satisfied for a successful fetch call.

## Editing and Deleting Bookings/Listings

Personal bookings and listings can be manipulated in a user's account details. For faster load times, Redux state is manipulated to immediately display changes to a user's account.

## Error Handling

Every form on this site has error handling, which, again, derive from the Express validators in the backend. Any violations to these validators will be sent out and displayed for the user to see.

## What I've Learned

Though this application does not have too much to offer just yet, this was my very first full-stack application, and I have learned a great amount. Learning and seeing how each piece of the stack work together was quite enlightening, and I feel I have a much better understanding of the roles that each piece play.

As this was only a two-week long project, only very basic features are present on the site. More features will continually be added giving users more flexibility when it comes to hosting/booking a listing. Through creating more features on this application, I will continue to solidify and improve my knowledge when it comes to creating a full-stack application.
