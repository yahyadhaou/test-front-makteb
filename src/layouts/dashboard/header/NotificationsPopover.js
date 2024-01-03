import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Box,List,TextField,Badge,Modal,Button,Avatar,Tooltip,Divider,
  Popover,Typography,IconButton,ListItemText,ListSubheader,
  ListItemAvatar,ListItemButton
} from '@mui/material';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';



export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("id");
  const [usersData, setUsersData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    users_id: '',
    deadline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddNotification = () => {
    axios.post('https://test-al-makteb.onrender.com/insertrappellesdata', formData)
      .then((response) => {
        console.log('Notification added successfully:', response.data);
        // Reset the form data and close the modal
        setFormData({
          title: '',
          description: '',
          users_id: userId,
          deadline: '',
        });
        alert("Notification added successfully")
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error adding notification:', error);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    handleClose(); // Close the popover when opening the modal
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setFormData((prevData) => ({
      ...prevData,
      users_id: userId,
    }));

    getUsersData();
  }, []);
  const getUsersData = () => {
    axios
      .get(`https://test-al-makteb.onrender.com/getdatarappeles/${userId}`)
      .then((res) => {
        const userDatas = res.data;
        console.log(res.data)
        const usersArray = userDatas.map((userData) => ({
          id: userData.idrappelles,
          title: `${userData.title} ${userData.description}`,
          deadline: userData.deadline,
          isUnRead:userData.isUnRead
        }));
        const yahya = userDatas.map((userData) => {
          const fulldetails = `${userData.title} ${userData.description}`;
          const isUnRead = userData.isUnRead === 'false';
        console.log(isUnRead,"edneineiej")
          return {
            id: userData.idrappelles,
            title: `${fulldetails}`,
            description: ``,
            avatar: userData.image || null,
            type: 'chat_message',
            deadline: userData.deadline.slice(0,10),
            isUnRead: userData.isUnRead,
          };
        });
            setNotifications(yahya)
            console.log(yahya, "yahay");
             setUsersData(usersArray);
      })
      .catch((err) => console.log(err));
  };

  const totalUnRead = notifications.filter((item) => item.isUnRead === "false").length;
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleSubmit = () => {
    console.log("response")
    // axios.put(`http://localhost:5000/isUnRead`)
    // .then((response) => {
    //   setOpen(null)
    //   getUsersData();
    //   navigate("meetings")
    
  
    //    })
    // .catch((error) => {
    //   console.log(error);
    // });
};
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">إشعارات</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            رسائل غير مقروءة {totalUnRead} لديك
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" اشر عليها بانها قرات">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
           
            </Tooltip>
          )}
               <Tooltip title="إضافة عنصر جديد">
               <IconButton color="primary" onClick={handleModalOpen}>
               <Iconify icon="eva:file-add-outline" />
              </IconButton>
              </Tooltip>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340 } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                جديد 
              </ListSubheader>
            }
          >
            
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List disablePadding>
  {notifications.slice(notifications.length).map((notification) => (
    <NotificationItem key={notification.id} notification={notification} />
  ))}
</List>

        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleSubmit}>
          عرض الكل
          </Button>
        </Box> */}
      </Popover>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="div">
            Add Notification
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Deadline"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddNotification}>
            Add Notification
          </Button>
          <Button onClick={handleModalClose}>Close Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    deadline: PropTypes.string,
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {notification.deadline}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
