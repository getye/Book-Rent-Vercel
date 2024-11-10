import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Divider, Button, InputBase, IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { 
  renterFetchBooksRequest,
  setSearchTerm
    } from '../services/actions/bookActions';

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const { loading, books, error } = useSelector(state => state.books);

  // Fetch menu items when the component mounts
  useEffect(() => {
    dispatch(renterFetchBooksRequest());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    dispatch(setSearchTerm(event.target.value));       
  };

    // Filter books based on the search query
  const filteredBooks = books.filter(book => 
    book.author.toLowerCase().includes(search.toLowerCase()) || 
    book.book_owner.toLowerCase().includes(search.toLowerCase()) || 
    book.book_title.toLowerCase().includes(search.toLowerCase()) || 
    book.catagory.toLowerCase().includes(search.toLowerCase())
  );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <>
        <Grid 
            container 
            sx={{
                alignItems: 'center', 
                paddingTop: 12, 
                pl: {xs: '1%', sm: '10%'},
                background: 'linear-gradient(to bottom, #FFFFFF, #F5D58E, #FFFFFF)',
            }}
            >
            <Typography 
            sx={{
                background: 'linear-gradient(to right, #FF8C00, #FFCBA4)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: {xs: '1rem', sm: '2rem'},
                fontWeight: 'bold',
            }}
            >
            A Book Rental Aplication, enable you to rent books.
            </Typography>

            <Box sx={{ paddingTop: 2 }}>
            <Paper
              sx={{ 
                display: 'flex', 
                width: "45%", 
                border: 1, 
                height: '1%',
                borderRadius: 4, 
                borderColor: 'blue', 
                mb: 1 
              }}>
              <IconButton sx={{ p: '6px', color: 'blue' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                size='small'
                placeholder="Search"
                value={search} // Bind the search query
                onChange={handleSearch} // Handle input changes
              />
            </Paper>
          </Box>
          {filteredBooks.map((book, index) => (
                <Grid item xs={12} sm={4} key={book.book_id}> 
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, marginTop: 2 }} // Make image circular and position it at the top
                    image={book.book_cover} 
                    alt={book.book_title}
                />
                <CardContent sx={{ textAlign: 'center' }}> {/* Center align text */}
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>{book.book_title}</Typography>
                    <Typography variant="body2">
                        {book.catagory}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                    {book.price}
                    </Typography>
                    <Typography sx={{ display: 'inline', color: 'inherit' }}>
                    <sup>Birr</sup>
                    </Typography>
                    <Button 
                        onClick={() => navigate('/signin')} 
                        sx={{ 
                            bgcolor: '#FF8C00', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            marginLeft: 1, 
                            pl:2, pr:2, 
                            borderRadius:2, 
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#FF8C00' // Keeps background color the same on hover
                            }}}>
                            Order Now
                    </Button>

                    <Divider sx={{mt:2}}/>
                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                        {book.author}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
              ))}
        </Grid>
        <Box sx={{ paddingTop: 1, 
            ml: {xs: '1%', sm: '7%', md: '10%', lg: '15%'},
            mr: {xs: '1%', sm: '7%', md: '10%', lg: '15%'},
            mb: {xs: 1, sm: 2, md: 3, lg: 4},
            }}>
            <Typography
                sx={{
                    color:'#FF8C00',
                    fontSize: {xs: '1rem', sm: '2rem'},
                    fontWeight: 'bold',
                }}
            >Available Books</Typography>
            <Divider/>
          <Grid container spacing={3}> 
            {books.map((book) => (
            <Grid item xs={12} sm={4} key={book.book_id}> 
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, marginTop: 2 }} // Make image circular and position it at the top
                    image={book.book_cover} 
                    alt={book.book_title}
                />
                <CardContent sx={{ textAlign: 'center' }}> {/* Center align text */}
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>{book.book_title}</Typography>
                    <Typography variant="body2">
                        {book.catagory}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                    {book.price}
                    </Typography>
                    <Typography sx={{ display: 'inline', color: 'inherit' }}>
                    <sup>Birr</sup>
                    </Typography>
                    <Button 
                        onClick={() => navigate('/signin')} 
                        sx={{ 
                            bgcolor: '#FF8C00', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            marginLeft: 1, 
                            pl:2, pr:2, 
                            borderRadius:2, 
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#FF8C00' // Keeps background color the same on hover
                            }}}>
                            Order Now
                    </Button>

                    <Divider sx={{mt:2}}/>
                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                        {book.author}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Box>
    </>
  );
};
