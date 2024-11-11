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
import { Divider, MenuItem } from '@mui/material';
import { Profile } from './profile'

const drawerWidth = 240;

export const MainBar = (props) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { window } = props;


  const drawer = (
    <List sx={{ bgcolor: "#151B54", height: "100%", color: 'white' }}>
      <Stack alignItems="center" padding={2} direction="row" gap={3}>
        <MenuIcon sx={{ fontSize: { xs: '1.5rem', sm: 'default' } }} />
        <Stack direction="row" gap={2}>
          <Typography 
            variant="h6"
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >Book Rental</Typography>
        </Stack>
      </Stack>
      <Divider sx={{borderColor:'white'}}/>

              {/* Admin Links */}
      {userRole === "Admin" && (
      <>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("admin/dashboard") }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
              <SpaceDashboardIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/books") }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
              <MenuBook fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Books" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/users") }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
              <Groups2OutlinedIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/approve/books") }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
              <PermIdentityIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Owner Requests" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { navigate("admin/renters") }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
              <PeopleOutlineIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Renter Requests" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }} />
          </ListItemButton>
        </ListItem>
      </>
    )}


        {/* Owner Links */}
      {userRole === "Owner" && (
          <>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("owner/dashboard") }}>
        <ListItemButton >
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <SpaceDashboardIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => { navigate("owner/bookupload") }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <UploadFileIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Book Upload" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => { navigate("owner/viewbooks") }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <MenuBook fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Books" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>

          </>
        )}

         {/* Renter Links */}
        {userRole === 'Renter' && (
          <>
          <ListItem  disablePadding onClick={() => { navigate("renter/dashboard") }}>
            <ListItemButton >
              <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
                <SpaceDashboardIcon fontSize="inherit"/>
              </ListItemIcon>
              <ListItemText primary= "Dashboard" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => { navigate("renter/books") }}>
            <ListItemButton >
                <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
                  <MenuBook fontSize="inherit"/>
                </ListItemIcon>
            <ListItemText primary= "Books" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
          </ListItemButton>
          </ListItem>

          <ListItem  disablePadding onClick={() => { navigate("renter/rents") }}>
            <ListItemButton >
                <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
                  <MenuBook fontSize="inherit"/>
                </ListItemIcon>
            <ListItemText primary= "Rents" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
          </ListItemButton>
          </ListItem>
          </>
        )}

      <Divider sx={{ borderColor: 'white' }} />

      <ListItem disablePadding onClick={() => navigate('/contact')}>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <ContactPageIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Contact" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding onClick={() => navigate('/about')}>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <InfoIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="About" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white', fontSize: { xs: '1.2rem', sm: 'default' } }}>
            <RuleFolderIcon fontSize="inherit"/>
          </ListItemIcon>
          <ListItemText primary="Regulations" sx={{ fontSize: { xs: '0.8rem', sm: 'default' } }}/>
        </ListItemButton>
      </ListItem>
    </List>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" gap={2} sx={{alignItems:'end', color: "white", 
                                            width: 1, bgcolor: '#151B54' }}>
        <Toolbar>
          <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
          {(!userRole) ? (
              <>
              <MenuItem onClick={() => navigate('/signup')}>Sign up</MenuItem>
              <MenuItem onClick={() => navigate('/signin')}>Sign in</MenuItem>
              </>
          ):(
            <>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <NotificationsActiveIcon />
              </ListItemIcon>
          </ListItemButton>
          <Profile/>
          </>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 180 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
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
