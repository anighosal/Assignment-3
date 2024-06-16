Project name is Sports Facility Booking Platform.This project is mainly developing the backend for a sports facility booking platform.

This project focuses on implementing the following key functionalities: Error Handling, CRUD operations, Authentication & Authorization, and Transaction & Rollback if needed.

I am using 3 technologies Typescript, ExpressJs and Mongoose for mongodb in this project.

There are three models in this project.The models are user, facility and booking model.

User have 2 role ADMIN OR USER.When a user signs up, he will be registered as a user

Admin or User when logged in then got the secret token/jwt token from response body.

All functionality requires this bearer jwt access secret token.

When create admin then the user will registered as a admin because the user role is admin & when the create user , the user will user will registered as a USER because the user role is user.

Admin & User have some power to manage the booking model and facility model.

Before creating the booking facility check the availability of the time slots.If the time slots are available then user can create a booking facility and booked facility is cancelled by the user.If the time slots are not available show the error message

The facility created by the admin, admin can update and delete the facility with admin logged in jwt access secret token, Everyone see all the facilities created by the admin.

User can create a booking facility and the booking facility user can see his booking facility with user logged in Bearer jwt access secret token.Admin view all the booking facilities with admin bearer token created by the user.

live-link:https://assignment-3-orpin-chi.vercel.app/
