import {
  Box,
  Paper,
  IconButton,
  InputBase,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ownerFetchBooksRequest, setSearchTerm } from '../../services/actions/bookActions';

export const OwnerViewBooks = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { loading, books, error } = useSelector(state => state.books);

  // Fetch books on component mount
  useEffect(() => {
    dispatch(ownerFetchBooksRequest());
  }, [dispatch]);

  // Handle search input
  const handleSearch = (event) => {
    setSearch(event.target.value);
    dispatch(setSearchTerm(event.target.value));
  };

  // Filter books based on the search query
  const filteredBooks = books.filter(book =>
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.book_title.toLowerCase().includes(search.toLowerCase()) ||
    book.book_status.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ paddingTop: '5%', marginLeft: '20%', justifyContent: 'center' }}>
      <Box sx={{ paddingTop: 2 }}>
        <Paper
          component="form"
          sx={{
            display: 'flex',
            width: '45%',
            border: 1,
            borderRadius: 4,
            borderColor: 'blue',
            mb: 2
          }}
        >
          <IconButton sx={{ p: '6px', color: 'blue' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            size="small"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </Paper>
      </Box>

      {books.length !== 0 ? (
        <Table sx={{ maxWidth: '95%', border: 'black' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'blue' }}>
              {['No', 'Book Title', 'Author', 'Total Quantity', 'Rent Quantity', 'Available Books', 'Rent Price', 'Book Category', 'Book Cover', 'Status'].map(header => (
                <TableCell key={header} sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book, index) => (
              <TableRow
                key={book.id}
                sx={{
                  alignItems: 'center',
                  height: '40px',
                  bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA'
                }}
              >
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_title}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.author}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.total_quantity}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.rent_quantity}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.total_quantity - book.rent_quantity}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.price}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.category}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                  <img
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${book.book_cover}`}
                    alt="Book Cover"
                    style={{ width: '20px', height: '25px' }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: '0px',
                    textAlign: 'center',
                    color: 'white',
                    bgcolor:
                      book.book_status === 'Pending'
                        ? '#FFA500'
                        : book.book_status === 'Accepted'
                        ? '#008000'
                        : '#FF0000'
                  }}
                >
                  {book.book_status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <Typography>You have no rent</Typography>
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </Box>
  );
};
