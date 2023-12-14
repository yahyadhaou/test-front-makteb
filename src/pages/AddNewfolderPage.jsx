import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function AddNewfolderPage() {
    const navigate=useNavigate()
    const userId = localStorage.getItem("id");
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
  const [user, setUser] = useState([]);
  
useEffect(()=>{
    console.log(userId)
})
const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/InsertFolderData",
        formData
      );

      navigate("/dashboard/app")
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  return  (
    <>
    <Card item xs={12} sm={6}>
             
                <TextField
                id="numeroDossier"
                  label="رقم الملف"
                  defaultValue="رقم الملف"
                  value={formData.numeroDossier}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="demandeur"
                  label="اسم الحريف"
                  defaultValue="اسم الحريف"
                  value={formData.demandeur}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="nomdedemandeur"
                  label="لقبه او ممثله"
                  defaultValue="لقبه او ممثله"
                  value={formData.nomdedemandeur}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Tribunal"
                  label="المحكمة"
                  defaultValue="المحكمة"
                  value={formData.Tribunal}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="ville"
                  label="مدينة"
                  defaultValue="مدينة"
                  value={formData.ville}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Matière"
                  label="المادة"
                  defaultValue="المادة"
                  value={formData.Matière}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="T"
                  label="ط"
                  defaultValue="ط"
                  value={formData.T}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="nuLecas"
                  label="ع.القظية"
                  defaultValue="ع.القظية"
                  value={formData.nuLecas}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Ledéfendeur"
                  label="اسم ضد"
                  defaultValue="اسم ضد"
                  value={formData.Ledéfendeur}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="nomdudéfendeur"
                  label="لقبه او ممثله ضد"
                  defaultValue="لقبه او ممثله ضد"
                  value={formData.nomdudéfendeur}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="honoraires"
                  label="الاتعاب"
                  defaultValue="الاتعاب"
                  value={formData.honoraires}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="reste"
                  label="ماتبقى"
                  defaultValue="ماتبقى"
                  value={formData.reste}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Textedujugement"
                  label="نص.الحكم"
                  defaultValue="نص.الحكم"
                  value={formData.Textedujugement}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Datedujugement"
                  label="ت.الحكم"
                  defaultValue="ت.الحكم"
                  value={formData.Datedujugement}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="Datedelaudience"
                  label="ت.الجلسة"
                  defaultValue="ت.الجلسة"
                  value={formData.Datedelaudience}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                id="conclusion"
                  label="الفرض"
                  defaultValue="الفرض"
                  value={formData.conclusion}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
             
              <Button variant="contained" color="primary" onClick={handleSubmit}>
              إضافة قضية جديدة
              </Button>

        </Card>
        </>
  );
}

export default AddNewfolderPage;




