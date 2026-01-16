const {UserModel , BookModel} = require('../models');


// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     });
// });
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    if(!users || users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No users found in the database"
        });
    }

    res.status(200).json({
        success: true,
        data: users
    });
}



// router.get('/:id', (req, res) => {

//     const {id}  = req.params;
//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id ${id}`
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: user
//     });
// });

exports.getSingleUserByID = async (req, res) => {
    const {id}  = req.params;
    const user = await UserModel.findById(id);

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
}

// router.post('/', (req, res) => {
        
//         // "id": "4",
//         // "name": "Jane",
//         // "surname": "Doe",
//         // "email": "user@email.com",
//         // "subscriptionType": "Premium",
//         // "subscriptionDate": "01/01/2022"


//         // req.body should have all the below fields
//         const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

//         // check if all fields are provided
//         if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         // check if user already exists
//         const user = users.find((each)=> each.id === id);

//         if(user){
//             return res.status(409).json({
//                 success: false,
//                 message: `User already exists with id ${id}`
//             });
//         }

//         users.push({
//             id,
//             name,
//             surname,
//             email,
//             subscriptionType,
//             subscriptionDate
//         });

//         res.status(201).json({
//             success: true,
//             data: users
//         });
// });
exports.createUser = async (req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "User data is required to create a new user"
        });
    }

    await UserModel.create(data);
    const getAllUsers = await UserModel.find();

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: getAllUsers
    });
}

// router.put('/:id', (req, res) => {
//     const {id}  = req.params;
//     const {data} = req.body;

//     // check if user exists
//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id ${id}`
//         });
//     }

//     // Object.assign(user, data);
//     // with Spread Operator
//     const updatedUsers = users.map((each)=>{
//         if(each.id === id){
//             return {
//               ...each,
//               ...data
//             }
//         }
//         return each;
//     });

//     return res.status(200).json({
//         success: true,
//         data: updatedUsers,
//         message: `User with id ${id} updated successfully`,
//     });
// });
exports.updateUserByID = async (req, res) => {
    const {id}  = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "User data is required to update a user"
        });
    }
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});

    return res.status(200).json({
        success: true,
        message: `User with id ${id} updated successfully`,
        data: updatedUser
    });
}

exports.deleteUserByID = async (req, res) => {
    const {id}  = req.params;

    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id ${id}`
        });
    }
    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: `User with id ${id} deleted successfully`,
    });
}

// router.get('/subscriptions-details/:id', (req, res) => {

//     const {id}  = req.params;
//     const user = users.find((each)=> each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id ${id}`
//         });
//     }

//     const getDateInDays = (data = "") => {
//         let date;
//         if(data){
//             date = new Date(data);
//         }
//         else{
//             date = new Date();
//         }
//         let days = Math.floor(date / (1000 * 60 * 60 * 24));
//         return days;
//     }

//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "Basic"){
//             date = date + 90;
//         }
//         else if(user.subscriptionType === "Standard"){
//             date = date + 180;
//         }
//         else if(user.subscriptionType === "Premium"){
//             date = date + 365;
//         }
//         return date;
//     }

//     // Subscription Expiration Calculation
//     // January 1, 1970 UTC // millisconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration - currentDate,
//         daysLeftForReturn: returnDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book return date has passed" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success: true,
//         data: data
//     });
// });
exports.getSubscriptionDetailsByID = async (req, res) => {
    const {id}  = req.params;
    const user = await UserModel.findById(id);
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
        ...user._doc,
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
}   