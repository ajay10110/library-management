const {BookModel , UserModel} = require("../models/index");

const issuedBook = require("../dtos/book-dto");

// const getAllBooks = () =>{

// }

// const getSingleBookID = () =>{

// }

// module.exports = {
//     getAllBooks,
//     getSingleBookID
// };



// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     });

// });

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books found in the database"
        });
    }

    res.status(200).json({
        success: true,
        data: books
    });
}



// router.get('/:id', (req, res) => {

//     const {id}  = req.params;
//     const book = books.find((each)=> each.id === id);

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for id ${id}`
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: book
//     });
// });
exports.getSingleBookID = async (req, res) =>{
    const {id}  = req.params;
    const book = await BookModel.findById(id);

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
}


// router.get('/issued/for-users', (req, res) => {
//     // issued books are those books which are issued to users
//     // so we need to find the books which are issued to users

//     const usersWithIssuedBooks = users.filter((each) => {
//         if(each.issuedBook){
//             return each;
//         }
//     });

//     const issuedBooks = [];
    
//     usersWithIssuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book);
//     })

//     if(!issuedBooks ===0){
//         return res.status(404).json({
//             success: false,
//             message: "No books are issued currently"
//         });
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });
exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBooks: { $exists: true},
        
    }).populate('issuedBooks');

    const issuedBooks = users.map((each) => {
        return new issuedBook(each);
    });

    if(issuedBooks.length ===0){
        return res.status(404).json({
            success: false,
            message: "No books are issued currently"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
}


// router.post('/', (req, res) => {
        
//         // "id": "1",
//         // "name": "The Hobbit",
//         // "author": "J.R.R. Tolkien",
//         // "genre": "Fantasy",
//         // "price": "12.99",
//         // "publisher": "Houghton Mifflin"


//         // req.body should have all the below fields
//         const {id, name, author, genre, price, publisher} = req.body;

//         // check if all fields are provided
//         if(!id || !name || !author || !genre || !price || !publisher){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         // check if book already exists
//         const book = books.find((each)=> each.id === id);

//         if(book){
//             return res.status(409).json({
//                 success: false,
//                 message: `Book already exists with id ${id}`
//             });
//         }

//         books.push({
//             id,
//             name,
//             author,
//             genre,
//             price,
//             publisher
//         });

//         res.status(201).json({
//             success: true,
//             data: books
//         });
// });
exports.addNewBook = async (req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length ===0){
        return res.status(400).json({
            success: false,
            message: "Book data is required"
        });
    }

    await BookModel.create(data);

    const allBooks = await BookModel.find();

    res.status(201).json({
        success: true,
        message: "New book added successfully",
        data: allBooks
    });
}


// router.put('/:id', (req, res) => {
//     const {id}  = req.params;
//     const {data} = req.body;

//     // check if book exists
//     const book = books.find((each)=> each.id === id);
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for id ${id}`
//         });
//     }

//     // Object.assign(book, data);
//     // with Spread Operator
//     const updatedBooks = books.map((each)=>{
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
//         data: updatedBooks,
//         message: `Book with id ${id} updated successfully`,
//     });
// });
exports.updateBookByID = async (req, res) => {
    const {id}  = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length ===0){
        return res.status(400).json({
            success: false,
            message: "Please provide data to update"
        });
    }
    // const book = await BookModel.findById(id);

    // if(!book){
    //     return res.status(404).json({
    //         success: false,
    //         message: `Book not found for id ${id}`
    //     });
    // }

    // //Update the book details
    // Object.assign(book, data);
    // await book.save();

    // res.status(200).json({
    //     success: true,
    //     message: `Book with id ${id} updated successfully`,
    //     data: book
    // });

    const updatedBook = await BookModel.findByOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );

    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        });
    }

    res.status(200).json({
        success: true,
        message: `Book with id ${id} updated successfully`,
        data: updatedBook
    });
}

exports.deleteBookByID = async (req, res) => {
    const {id}  = req.params;

    // Check if book exists
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id ${id}`
        });
    }

    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: `Book with id ${id} deleted successfully`,
    });
}