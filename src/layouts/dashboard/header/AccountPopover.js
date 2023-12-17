import { useState,useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    path:"/dashboard/ProfilPage"
  },
  {
    label: 'Logout',
    path:"/login"
  },
];

export default function AccountPopover() {
const navigate=useNavigate()
  const [open, setOpen] = useState(null);
  const [accounts, setAccount] = useState({});
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getAccountData();
  }, []);

  const getAccountData = async () => {
    try {
      const response = await axios.get(`https://test-al-makteb.onrender.com/getUser/${userId}`);
      const accountData = response.data;
  
      const updatedAccount = {
        displayName: `${accountData.name} ${accountData.lastname}`,
        email: accountData.email || '',
        image_url: accountData.image_url || "",
        role:"محامي" 
      };
  
      setAccount(updatedAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (path) => {
    navigate(path);
    setOpen(null); 
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={accounts.image_url} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {accounts.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {accounts.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>{
              handleClose(option.path)
            }}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}
