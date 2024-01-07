import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {AppCurrentVisits, AppWebsiteVisits,AppWidgetSummary,} from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const userId = localStorage.getItem("id");
const [clients, setClients] = useState([]);
const [address,setAddress]=useState([])
const [monthlyaudience,setMonthlyaudiance]=useState(0)
const [cliennts,setCliennts]= useState([])
const [cuurentmonth, setCurrentMonth] = useState([]);
const [datastat,setDatastat]=useState([])
  const [addressOccurrences, setAddressOccurrences] = useState([])
useEffect(() => {
  getdata();
}, []);
const getdata = () => {
  axios
    .get(`https://test-al-makteb.onrender.com/getdata/${userId}`)
    .then((res) => {
      const datas=res.data
      const addresses = datas.map((contract) => contract.ville);
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
      

      const clientes = datas.map((Client) => Client.demandeur);
      setCliennts(clientes);

      const ClientsCounts = [];

      clientes.forEach((Client) => {
        const existingClient = ClientsCounts.find(
          (item) => item.label === Client
        );
        if (existingClient) {
          existingClient.value+=1;
        } else {
          ClientsCounts.push({ label: Client, value: 1 });
        }
      });

      setClients(ClientsCounts);

      const Meeting = datas.map((contract) =>contract.Datedelaudience.slice(5,7));
     const currentMonthMeeting=[]
     const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));

     Meeting.forEach((address) => {
       const existingAddress = currentMonthMeeting.find((item) => item.label === address);
       
       if (existingAddress) {
         existingAddress.value += 1;
       } else {
         currentMonthMeeting.push({ label: address, value: 1 });
       }
     });
     
     const result = months.map((month) => {
       const existingMonth = currentMonthMeeting.find((item) => item.label === month);
       return existingMonth || { label: month, value: 0 };
     });

     const valuesArray = result.map((item) => item.value);
       const numberofmonth = () => {
        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      
        const item = currentMonthMeeting.find(entry => entry.label === currentMonth);
        return item ? item.value : null;
      };
      
       setMonthlyaudiance(numberofmonth)
       setCurrentMonth(result)
       setDatastat(valuesArray)
       })
    .catch((err) => console.log(err));
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
            <AppWidgetSummary title="عدد القضايا" total={cliennts.length} icon={'arcticons:opensstpclient'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد الموكلين" total={clients.length} color="info" icon={'guidance:meeting-point'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد المحاكم" total={addressOccurrences.length} color="warning" icon={'streamline:computer-logo-paypal-payment-paypal'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="عدد القضايا هذا شهر" total={monthlyaudience} color="error" icon={'carbon:event'} />
          </Grid>
          

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title=" عدد القضايا"
              // subheader={`نطق بالحكم`}
              chartLabels={[
                '01/02/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
                '12/01/2024',
                "01/01/2025"
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: datastat,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="توزيع سكني للمواكلين حسب الماحكم  "
              chartData={addressOccurrences}
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
