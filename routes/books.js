const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();


/**
 * Route: /books
 * Method: GET
 * Description: Get all books in the system
 * Access: Public
 * Parameters: None
 * 
 */

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });

});



/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their ID
 * Access: Public
 * Parameters: None
 * 
 */
router.get('/:id', (req, res) => {

    const {id}  = req.params;
    const book = books.find((each)=> each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        });
    }
    res.status(200).json({
        success: true,
        data: book
    });
});



/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 * 
 */

router.post('/', (req, res) => {
        
        // "id": "1",
        // "name": "The Hobbit",
        // "author": "J.R.R. Tolkien",
        // "genre": "Fantasy",
        // "price": "12.99",
        // "publisher": "Houghton Mifflin"


        // req.body should have all the below fields
        const {id, name, author, genre, price, publisher} = req.body;

        // check if all fields are provided
        if(!id || !name || !author || !genre || !price || !publisher){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if book already exists
        const book = books.find((each)=> each.id === id);

        if(book){
            return res.status(409).json({
                success: false,
                message: `Book already exists with id ${id}`
            });
        }

        books.push({
            id,
            name,
            author,
            genre,
            price,
            publisher
        });

        res.status(201).json({
            success: true,
            data: books
        });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book details by their ID
 * Access: Public
 * Parameters: ID
 * 
 */
router.put('/:id', (req, res) => {
    const {id}  = req.params;
    const {data} = req.body;

    // check if book exists
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        });
    }

    // Object.assign(book, data);
    // with Spread Operator
    const updatedBooks = books.map((each)=>{
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
        data: updatedBooks,
        message: `Book with id ${id} updated successfully`,
    });
});




/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by their ID
 * Access: Public
 * Parameters: ID
 * 
 */
router.delete('/:id', (req, res) => {
    const {id}  = req.params;

    // check if book exists
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        });
    }

    // iF BOOK EXISTS, filter that book out from books array
    const updatedBooks = books.filter((each) => each.id !== id);

    // 2nd method
    // const index = users.indexOf(user);
    // users.splice(index, 1);
    // const updatedUsers = users;

    return res.status(200).json({
        success: true,
        data: updatedBooks,
        message: `Book with id ${id} deleted successfully`,
    });
});


/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all issued books in the system
 * Access: Public
 * Parameters: None
 * 
 */
router.get('/issued/for-users', (req, res) => {
    // issued books are those books which are issued to users
    // so we need to find the books which are issued to users

    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook){
            return each;
        }
    });

    const issuedBooks = [];
    
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if(!issuedBooks ===0){
        return res.status(404).json({
            success: false,
            message: "No books are issued currently"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
});







    


module.exports = router;