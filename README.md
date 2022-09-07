# AirBnB Clone

[Live Link](https://bnb-ground.herokuapp.com/)

This AirBnB clone is a fullstack application using React/Redux for the frontend, and Express/PostgresSQL for the backend. This app allows users to either host or book listings for renting over a period of time. Users also have the ability to edit their listings/bookings as long as they are pass validations from the backend.

![landing-page-screen](./readme-resources/Screen%20Shot%202022-09-06%20at%208.18.46%20AM.png)

## Landing Page

The landing page gives users speedy access to different routes with the usage of React's render and route features. New listings that are created are added and immediately displayed on the landing page through the usage of Redux states. On this particular page, Redux pulls all of the listings from the PostgresSql database by making fetch calls to the Express server. In order to optimize loading time as users navigate throughout the app, Redux clears up particular states using it's built in cleanup function in order to free up space on the browser.

## Creating Listings

A link that allows a user to create a listing is located in the Navigation bar. The user will be led to a form where they can fill in the information of their listing. This information must follow restrictions listed by several Express validators in order for a successful listing.

## Creating Bookings

![booking-card](./readme-resources/Screen%20Shot%202022-09-06%20at%201.03.27%20PM.png)

Bookings can be made by selecting a listing on the landing page. Validations were created using Express validators and custom created validation middleware.

## Editing and Deleting Bookings/Listings

Personal bookings and listings can be manipulated in the user's account details. This is again done through making certain fetch calls to the Express server. For faster load times, Redux state is manipulated to immediately display user's changes to their account.

## Error Handling

Every form on this site has error handling, which, again, come from validators created using Express. If there are any violations to these validators, they will be sent to the front end and displayed to the user.

## What I've Learned

Though this application does not have too much to show just yet, this was my very first full-stack application, and I have learned a great amount. Learning and seeing how each piece of this project work together was quite enlightening, and I feel I have a much better understanding of the role each piece of technology play when it comes to building an application.
As this was only a two-week long project, only very basic features are present on the site. More features will continually be added giving users more flexibility when it comes to hosting/booking a listing. Through creating more features on this application, I will try to solidify and improve my knowledge of all the technologies used in this project.
