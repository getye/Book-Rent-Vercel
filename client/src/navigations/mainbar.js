import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { MenuBook } from '@mui/icons-material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, Divider, MenuItem, useMediaQuery } from '@mui/material';
import { Profile } from './profile'

const drawerWidth = 240;
const theme = createTheme();

export const MainBar = (props) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const [close, setClose] = React.useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { window } = props;

  const drawerHandle = () =>{
    setClose(!close)
  }
  
  const drawer = (
    <List sx={{ bgcolor: "#151B54", height: "100%", color: 'white' }}>
      <Stack alignItems="center" padding={{xs:1, sm:2}} direction="row" gap={2}>
        <MenuIcon 
          sx={{ fontSize: { xs: '1.5rem' } }} 
          onClick={drawerHandle}/>
        {!close && (
        <Stack direction="row" gap={2}>
          <Typography 
            variant="h6"
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >Book Rental</Typography>
        </Stack>
        )}
      </Stack>
      
      {!close && (
        <>
        <Divider sx={{borderColor:'white'}}/>
              {/* Admin Links */}
      {userRole === "Admin" && (
      <>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("admin/dashboard") }}>
          <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{ xs: 0.25, sm: 0.5 }}}} >
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
              <SpaceDashboardIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ fontSize: { xs: '0.8rem' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/books") }}>
          <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
              <MenuBook fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Books" sx={{ fontSize: { xs: '0.8rem' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/users") }}>
          <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
              <Groups2OutlinedIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ fontSize: { xs: '0.8rem' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/approve/books") }}>
          <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem'} }}>
              <PermIdentityIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Owner Requests" sx={{ fontSize: { xs: '0.8rem' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/renters") }}>
          <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem'} }}>
              <PeopleOutlineIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Renter Requests" sx={{ fontSize: { xs: '0.8rem' } }} />
          </ListItemButton>
        </ListItem>
      </>
    )}


        {/* Owner Links */}
      {userRole === "Owner" && (
          <>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("owner/dashboard") }}>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem'} }}>
            <SpaceDashboardIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ fontSize: { xs: '0.8rem' } }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => { navigate("owner/bookupload") }}>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
            <UploadFileIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Book Upload" sx={{ fontSize: { xs: '0.8rem'} }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => { navigate("owner/viewbooks") }}>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
            <MenuBook fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Books" sx={{ fontSize: { xs: '0.8rem' } }}/>
        </ListItemButton>
      </ListItem>

          </>
        )}

         {/* Renter Links */}
        {userRole === 'Renter' && (
          <>
          <ListItem  disablePadding onClick={() => { navigate("renter/dashboard") }}>
            <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
              <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
                <SpaceDashboardIcon fontSize="inherit"/>
              </ListItemIcon>
              <ListItemText primary= "Dashboard" sx={{ fontSize: { xs: '0.8rem' } }}/>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => { navigate("renter/books") }}>
            <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
                <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
                  <MenuBook fontSize="inherit"/>
                </ListItemIcon>
            <ListItemText primary= "Books" sx={{ fontSize: { xs: '0.8rem' } }}/>
          </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => { navigate("renter/rents") }}>
            <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
                <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
                  <MenuBook fontSize="inherit"/>
                </ListItemIcon>
            <ListItemText primary= "Rents" sx={{ fontSize: { xs: '0.8rem' } }}/>
          </ListItemButton>
          </ListItem>
          </>
        )}

      <Divider sx={{ borderColor: 'white' }} />

      <ListItem disablePadding onClick={() => navigate('/contact')}>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
            <ContactPageIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Contact" sx={{ fontSize: { xs: '0.8rem' } }}/>
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding onClick={() => navigate('/about')}>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
            <InfoIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="About" sx={{ fontSize: { xs: '0.8rem' } }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton sx={{paddingLeft:{xs:1, sm:2, gap:{xs:1, sm:2}}}} >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem' } }}>
            <RuleFolderIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Regulations" sx={{ fontSize: { xs: '0.8rem'} }}/>
        </ListItemButton>
      </ListItem>
      </>
      )}
    </List>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" gap={2} sx={{alignItems:'end', color: "white", 
                                            width: 1, bgcolor: '#151B54' }}>
        <Toolbar>         
          <MenuItem onClick={() => navigate('/')}> {(isMobile)? (
            <HomeIcon sx={{ color: 'white' }}/>
            ):(
              'Home'
            )}
          </MenuItem>
          {(!userRole) ? (
              <>
              <MenuItem onClick={() => navigate('/signup')}>Sign up</MenuItem>
              <MenuItem onClick={() => navigate('/signin')}>Sign in</MenuItem>
              </>
          ):(
            <>
              <NotificationsActiveIcon sx={{ color: 'white' }}/>
              <Profile/>
          </>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
           container={container}
           variant="persistent"
           open
           sx={{
            width: close ? '50px' : '210px', 
            height:'auto', 
            display: { xs:'block', sm:'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: close ? '50px' : '210px',
              height:'auto'
            },
           }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open
          sx={{
            width: close ? '60px' : 240,  
            display: { xs:'none', sm:'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: close ? '60px' : 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

MainBar.propTypes = {
  window: PropTypes.func,
};
