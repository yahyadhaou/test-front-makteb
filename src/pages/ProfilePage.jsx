import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function ProfilePage() {
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getData();
  }, []);

  // getData gets all the data about the user
  const getData = () => {
    axios
      .get(`https://test-al-makteb.onrender.com/getUser/${userId}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
    return <div>Wait for data</div>;
  }

  return  (
    <>
<Card sx={{ maxWidth: 345,border: '1px solid #ccc'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={user.image_url}
        sx={{ maxWidth: '70%', height: 'auto' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {user.name} {user.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lawyer specialiste in {user.sector}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card item xs={12} sm={6}>
             
                <TextField
                  label="First Name"
                  defaultValue="yahya"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  defaultValue="dhaou"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  defaultValue="rades"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email Address"
                  defaultValue="yahya.dhaou75@gmail.com"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Country"
                  defaultValue="tunisia"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone"
                  defaultValue="90620017"
                  fullWidth
                  margin="normal"
                />
             
            
              <Button variant="contained" color="primary">
                Update Profile
              </Button>

        </Card>
        </>
  );
}

export default ProfilePage;




