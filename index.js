const dotenv = require('dotenv');
dotenv.config();

const express = require("express");

// const {users} = require("./data/users.json")




// import database connection file
const DbConnection = require('./databaseConnection');

// importing routers
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');



const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Home Page :-)"
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);
/**
 * Route: /users
 * Method: GET
 * Description: Get all users int the sysetm
 * Access: Public
 * Parameters: None
 * 
 */

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: None
 * 
 */
app.get('/users/:id', (req, res) => {

    const {id}  = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
});


/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 * 
 */
app.post('/users', (req, res) => {
        
        // "id": "4",
        // "name": "Jane",
        // "surname": "Doe",
        // "email": "user@email.com",
        // "subscriptionType": "Premium",
        // "subscriptionDate": "01/01/2022"


        // req.body should have all the below fields
        const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

        // check if all fields are provided
        if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user already exists
        const user = users.find((each)=> each.id === id);

        if(user){
            return res.status(409).json({
                success: false,
                message: `User already exists with id ${id}`
            });
        }

        users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate
        });

        res.status(201).json({
            success: true,
            data: users
        });
});



/**
 * Route: /users/:id
 * Method: POST
 * Description: Update user details by their ID
 * Access: Public
 * Parameters: ID
 * 
 */
app.put('/users/:id', (req, res) => {
    const {id}  = req.params;
    const {data} = req.body;

    // check if user exists
    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }

    // Object.assign(user, data);
    // with Spread Operator
    const updatedUsers = users.map((each)=>{
        if(each.id === id){
            return {
              ...each,
              ...data
            }
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedUsers,
        message: `User with id ${id} updated successfully`,
    });
});



/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Parameters: ID
 * 
 */
app.delete('/users/:id', (req, res) => {
    const {id}  = req.params;

    // check if user exists
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }

    // iF USER EXISTS, filter that user out from users array
    const updatedUsers = users.filter((each) => each.id !== id);

    // 2nd method
    // const index = users.indexOf(user);
    // users.splice(index, 1);
    // const updatedUsers = users;

    return res.status(200).json({
        success: true,
        data: updatedUsers,
        message: `User with id ${id} deleted successfully`,
    });
});

















// app.all('*', (req, res) => {
//     res.status(500).json({
//         message: "Not Built yet :-("
//     });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

