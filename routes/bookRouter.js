const express = require('express');
const multer = require('multer');
const path = require('path');
const BookController = require('../controllers/BookController');
const protect = require('../middleware/auth');
const cover = require('../middleware/pizza-images')

const bookRouter = express.Router();


// Routes
bookRouter.post('/owner/book/upload', protect, cover.single("cover"), BookController.uploadBook);
bookRouter.get('/admin/view/books', BookController.getBooks);
bookRouter.get('/admin/approve/book', BookController.getBooks);
bookRouter.put('/admin/approve/book/accept/:book_id', BookController.acceptBook);
bookRouter.put('/admin/approve/book/reject/:book_id', BookController.rejectBook);
bookRouter.get('/renter/view/books', BookController.getBooks);
bookRouter.get('/admin/approve/rents', BookController.getNewRent);
bookRouter.put('/admin/approve/rent/accept', BookController.acceptRent);
bookRouter.put('/admin/approve/rent/reject', BookController.rejectRent);
bookRouter.get('/owner/view/books', protect, BookController.ownerViewBooks);

module.exports = bookRouter;