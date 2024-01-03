import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import {Stack,Container} from '@mui/material';

function UpdateFolderCase() {
    const navigate=useNavigate()
    const { numeroDossier } = useParams();

    const userId = localStorage.getItem("id");
    useEffect(() => {
        console.log("Numero Dossier:", numeroDossier);
      }, [numeroDossier]);
      const [usersData, setUsersData] = useState([]);
    const [formData, setFormData] = useState({
        numeroDossier: "",
        demandeur: "",
        nomdedemandeur: "",
        Tribunal: "",
        ville: "",
        Matière: "",
        T: "",
        nuLecas: "",
        Datedelaudience: "",
        conclusion: "",
        Ledéfendeur: "",
        nomdudéfendeur: "",
        honoraires: "",
        reste: "",
        Textedujugement: "",
        Datedujugement: "",
        users_id:userId
      })

  useEffect(() => {
    getUsersData();
  }, []);
  const getUsersData = () => {
    axios
      .get(`https://test-al-makteb.onrender.com/number/${numeroDossier}`)
      .then((res) => {
        const userDatas = res.data;
        const usersArray = userDatas.map((userData) => ({
          id: userData.id,
          numeroDossier: userData.numeroDossier,
          demandeur: userData.demandeur,
          nomdedemandeur: userData.nomdedemandeur,
          Tribunal: userData.Tribunal,
          ville: userData.ville,
          Matière: userData.Matière,
          T: userData.T,
          nuLecas: userData.nuLecas,
          Datedelaudience: userData.Datedelaudience,
          nomdudéfendeur:userData.nomdudéfendeur,
          Ledéfendeur:userData.Ledéfendeur,
          honoraires:userData.honoraires,
          reste:userData.reste,
          Datedujugement:userData.Datedujugement,
          Textedujugement:userData.Textedujugement,
          conclusion:userData.conclusion

        }));
        setUsersData(usersArray);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://test-al-makteb.onrender.com/updateDetails/${numeroDossier}`,
        formData
      );
console.log(formData,"formData")
      navigate("/dashboard/app");
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  if (!usersData[0]){
    return <div>waiting the data</div>
  }
  return  (
    <>
      <Helmet>
        <title>تعديل معلومات  قضية </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'right', marginLeft: 'auto' }}>
          {numeroDossier} تعديل معلومات  قضية عدد
          </Typography>
        </Stack>

    
    <Card item xs={12} sm={6}>
             
                <TextField
               id="Tribunal"
               label="المحكمة"
               defaultValue={usersData[0].Tribunal}
               onChange={handleChange}
               fullWidth
               margin="normal"
                />
                <TextField
                id="ville"
                  label="مدينة"
                  defaultValue={usersData[0].ville}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Matière"
                  label="المادة"
                  defaultValue={usersData[0].Matière}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="T"
                  label="ط"
                  defaultValue={usersData[0].T}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="nuLecas"
                  label="ع.القظية"
                  defaultValue={usersData[0].nuLecas}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="honoraires"
                  label="الاتعاب"
                  defaultValue={usersData[0].honoraires}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="reste"
                  label="ماتبقى"
                  defaultValue={usersData[0].reste}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Textedujugement"
                  label="نص.الحكم"
                  defaultValue={usersData[0].Textedujugement}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Datedujugement"
                  label="ت.الحكم"
                  defaultValue={usersData[0].Datedujugement.slice(0, 10)}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Datedelaudience"
                  label="ت.الجلسة"
                  defaultValue={usersData[0].Datedelaudience.slice(0, 10)}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="conclusion"
                  label="الفرض"
                  defaultValue={usersData[0].conclusion}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
             
              <Button variant="contained" color="primary" onClick={handleSubmit}>
              تعديل معلومات  قضية
              </Button>

        </Card>
        </Container>
        </>
  );
}

export default UpdateFolderCase;




