const express = require('express');
const {users} = require("../data/users.json")

const router = express.Router();
/**
 * Route: /users
 * Method: GET
 * Description: Get all users int the sysetm
 * Access: Public
 * Parameters: None
 * 
 */

router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {

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
router.post('/', (req, res) => {
        
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

/**
 * Route: /books/subscriptions-details/:id
 * Method: GET
 * Description: Get all subscription details of a book by their ID
 * Access: Public
 * Parameters: None
 * 
 */
router.get('/subscriptions-details/:id', (req, res) => {

    const {id}  = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data){
            date = new Date(data);
        }
        else{
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }
        else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }
        else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    }

    // Subscription Expiration Calculation
    // January 1, 1970 UTC // millisconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForReturn: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book return date has passed" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data: data
    });
});
module.exports = router;