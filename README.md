# AirBnB Clone

[Live Link](https://bnb-ground.herokuapp.com/)

This AirBnB clone is a fullstack application using React/Redux for the frontend, and Express/PostgresSQL for the backend. This app allows users to either host or book listings for renting over a period of time. Users also have the ability to edit their listings/bookings as long as they are validated by the backend.

![landing-page-screen](./readme-resources/Screen%20Shot%202022-09-06%20at%208.18.46%20AM.png)

## Landing Page

The landing page gives users speedy access to different routes with the usage of React's render and route features. New listings that are created are constantly added and immediately displayed on the landing page through the usage of Redux states. On this particular page, Redux pulls all of the listings from the PostgresSql database by making fetch calls to the Express server. In order to optimize loading time as users navigate throughout the app, Redux clears up particular states using it's built in cleanup function in order to free up space on the browser.

As this was only a two-week long project, only very basic features are present on the site. More features will continually be added giving users more flexibility when it comes to hosting/booking a listing.
