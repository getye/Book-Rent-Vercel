import React, { useState, useEffect } from 'react';
import {MaterialReactTable} from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { ownerFetchBooksRequest } from '../../services/actions/bookActions';

export const OwnerViewBooks = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const { loading, books, error } = useSelector(state => state.books);

    // Fetch books on component mount
    useEffect(() => {
        dispatch(ownerFetchBooksRequest());
    }, [dispatch]);

    const handleSearch = (event) => {
      setSearch(event.target.value);   
    };

    const filteredBooks = books.filter(book => 
      book.author.toLowerCase().includes(search.toLowerCase()) || 
      book.book_title.toLowerCase().includes(search.toLowerCase()) ||
      book.book_status.toLowerCase().includes(search.toLowerCase()) ||  
      book.catagory.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const columns = [
      { header: 'No', accessorKey: 'no' },
      { header: 'Book Title', accessorKey: 'book_title' },
      { header: 'Author', accessorKey: 'author' },
      { header: 'Total Quantity', accessorKey: 'total_quantity' },
      { header: 'Rent Quantity', accessorKey: 'rent_quantity' },
      { header: 'Available Books', accessorKey: 'available_books' },
      { header: 'Rent Price', accessorKey: 'price' },
      { header: 'Book Category', accessorKey: 'catagory' },
      { header: 'Book Cover', accessorKey: 'book_cover' },
      { header: 'Status', accessorKey: 'book_status' },
    ];

    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <MaterialReactTable
          columns={columns}
          data={filteredBooks.map((book, index) => ({
            no: index + 1,
            book_title: book.book_title,
            author: book.author,
            total_quantity: book.total_quantity,
            rent_quantity: book.rent_quantity,
            available_books: book.total_quantity - book.rent_quantity,
            price: book.price,
            catagory: book.catagory,
            book_cover: book.book_cover,
            book_status: book.book_status,
          }))}
        />
      </div>
    );
};
