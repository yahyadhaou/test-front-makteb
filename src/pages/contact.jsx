import React, { useState ,useRef}  from 'react';
import emailjs from 'emailjs-com';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

export default function Meetings() {
    const form = useRef();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
    // here you should put your service from emailjs
      .sendForm('service_crme486', 'template_09bbnap',form.current, 'gpmedy2RKrayyAULB')
      .then((result) => {
        console.log(result.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Error sending email. Please try again later.');
      });
  };

  
  return (
    <div className="App" >
      <Typography gutterBottom variant="h3" align="center">
      TuniDesign دعم المحامين من قبل 
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
            اتصل بنا
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              املأ النموذج وسيقوم فريقنا بالرد عليك خلال 24 ساعة.
            </Typography>
            <form ref={form} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="from_name"
                    // value={formData.firstName}
                    // onChange={handleChange}
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid xs={12} sm={6} item>
                  <TextField
                    name="from_name"
                    // value={formData.lastName}
                    // onChange={handleChange}
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    name="reply_to"
                    // value={formData.email}
                    // onChange={handleChange}
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    name="message"
                    // value={formData.phone}
                    // onChange={handleChange}
                    type="tel"
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    // value={formData.message}
                    // onChange={handleChange}
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Type your message here"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                  يرسل
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}