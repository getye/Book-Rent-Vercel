import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${window.location.origin}/renter/view/books`); 
        const data = await response.json();
        console.log('Menus :', data);
        setBooks(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
        <Grid 
            container 
            sx={{
                alignItems: 'center', 
                paddingTop: 9, 
                pl: {xs: '1%', sm: '2%', md: '3%', lg: '5%'},
                background: 'linear-gradient(to bottom, #FFFFFF, #F5D58E, #FFFFFF)',
            }}
            >
            <Typography 
            sx={{
                background: 'linear-gradient(to right, #FF8C00, #FFCBA4)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: {xs: '1.5rem', sm: '3rem', md: '5rem', lg: '7rem'},
                fontWeight: 'bold',
            }}
            >
            Rent Now
            </Typography>
            <Typography 
            sx={{
                fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'},
            }}
            >Rent fiction, business and self-help books. </Typography>
        </Grid>
        <Box sx={{ paddingTop: 1, 
            ml: {xs: '2%', sm: '5%', md: '10%', lg: '15%'},
            mr: {xs: '2%', sm: '5%', md: '10%', lg: '15%'},
            mb: {xs: 1, sm: 2, md: 3, lg: 4},
            }}>
            <Typography>Available Books</Typography>
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
                        {book.author}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                    {book.price}
                    </Typography>
                    <Typography sx={{ display: 'inline', color: 'inherit' }}>
                    <sup>Birr</sup>
                    </Typography>
                    <Button 
                        onClick={() => navigate('/signin')} 
                        sx={{ bgcolor: '#FF8C00', color: 'white', fontWeight: 'bold', marginLeft: 1, pl:2, pr:2, borderRadius:2, textTransform: 'none' }}>
                            Order Now
                    </Button>

                    <Divider sx={{mt:2}}/>
    
                        <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                        {book.book_owner}
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
