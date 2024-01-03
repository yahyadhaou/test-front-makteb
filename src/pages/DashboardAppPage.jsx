import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {AppCurrentVisits, AppWebsiteVisits,AppWidgetSummary,} from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const userId = localStorage.getItem("id");
const [meeting, setMeeting] = useState([]);
const [address,setAddress]=useState([])
const [cuurentmonth, setCurrentMonth] = useState([]);
const [activeprcentage, setActiveprcentage] = useState(0);
  const [addressOccurrences, setAddressOccurrences] = useState([])
useEffect(() => {
  getdata();
}, []);
const uahya=[
  { label: 'تونس', value: 15 },
  { label: 'سوسة', value: 2 },
  { label: 'صفاقس ', value: 4 },
  { label: 'بن عروس ', value: 5 },
  { label: 'منوبة ', value: 3 },
  // ... other addresses and their occurrences
]
const getdata = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const previousMonth = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
  
  axios
    .get(`https://test-al-makteb.onrender.com/getUser/${userId}`)
    .then((res) => {
      const data=res.data
      const addresses = data.map((contract) => contract.address);
      setAddress(addresses);


      const addressCounts = [];
      addresses.forEach((address) => {
        const existingAddress = addressCounts.find(
          (item) => item.label === address
        );
        if (existingAddress) {
          existingAddress.value+=1;
        } else {
          addressCounts.push({ label: address, value: 1 });
        }
      });

      setAddressOccurrences(addressCounts);
      const currentMonthMeeting = res.data.filter((contract) => {
        const parts = contract.date.split('-');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10);
        
        return year === currentYear && month === currentMonth;
      });
      const previousMonthMeeting =  res.data.filter((contract) => {
        const parts = contract.date.split('-');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10);
        
        return year === currentYear && month === previousMonth
       } );

       const formpercantage=((currentMonthMeeting.length-previousMonthMeeting.length)/previousMonthMeeting.length)*100
       setCurrentMonth(currentMonthMeeting)
       setActiveprcentage(formpercantage)
      setMeeting(res.data); })
    .catch((err) => console.log(err));
};

const hello = () => {
  console.log(addressOccurrences);
};
      
  return (
    <>
    
      <Helmet>
        <title> Dashboard || قضية </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} >
        مرحبا بكم 
                </Typography>
      
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد القضايا" total={520} icon={'arcticons:opensstpclient'}  onClick={hello}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد الموكلين" total={430} color="info" icon={'guidance:meeting-point'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد المحاكم" total={8} color="warning" icon={'streamline:computer-logo-paypal-payment-paypal'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد القضايا هذا شهر" total={12} color="error" icon={'carbon:event'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title=" عدد القضايا"
              subheader={`${Math.trunc(activeprcentage)}% than last Month`}
              chartLabels={[
                '01/02/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
                "01/01/2024"
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [50,23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,80],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="توزيع سكني للمواكلين حسب الماحكم  "
              chartData={uahya}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>   
        </Grid>
      </Container>
    </>
  );
}
