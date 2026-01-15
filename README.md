# library-management

    This is a library management API backend for the management of users and the books

# Routes and the Endpoints

## /users
GET: GET all the list of users in the system
POST: Create/Register a new user

## /users(id)
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Delating a user by their ID(Check if the user still has asn issued book) && (is there any fine/penalty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription detials by their ID
    >> Date of subscription
    >> Valid till?
    >> Fine if any?

## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT: Update a book by its ID
Delete: Delte a book by itsID

## /books/isued

## /books/issued/withFine
GET: Get all issued books with their fine amount

### Subscription Types
    >> Basic(3months)
    >> Standard(6months)
    >>Premium(12months)

>> If a user missed the renewable date , then user should be collected with $100
>> If a user misses his subscription, then user is expected to pay $100
>> If a user misses both renewable & subscription, then the collected amount should be $200

## Commands:
npm init 
npm i express
npm i nodemon --save-dev

npm run dev --> To start the application

To restore  node modules and package-lock.json --> npm i/npm install    
