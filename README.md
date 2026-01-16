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

npm i mongoose
npm install mongodb

mongodb+srv://ajay101105_db_user:<db_password>@cluster0.vmqargn.mongodb.net/?appName=Cluster0
JHN1Xn7aICMFu4fC

mongodb+srv://ajay101105_db_user:JHN1Xn7aICMFu4fC@cluster0.vmqargn.mongodb.net/?appName=Cluster0

npm i dotenv

## MVC Archictecture
    >>M: Model (Structure of our MongoDb)
    >>V: View
    >>C: Controllers(Brain/Logic of a route)


### DTO(Data Transfer Object)