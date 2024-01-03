import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Stack,Typography,} from '@mui/material';

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
      const [tribunal, setTribunal] = useState('');
      const [ville,setVille] =useState('')
      const [Matière,setMatières]=useState('')

    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleTribunalChange = (event) => {
        setTribunal(event.target.value);
        setFormData({
          ...formData,
          Tribunal: event.target.value,
        });
      };
      
      const handleVilleChange = (event) => {
        setVille(event.target.value);
        setFormData({
          ...formData,
          ville: event.target.value,
        });
      };
      const handleMatièreChange = (event) => {
        setMatières(event.target.value);
        setFormData({
          ...formData,
          Matière: event.target.value,
        });
      };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://test-al-makteb.onrender.com/InsertFolderData",
        formData
      );

      navigate("/dashboard/app")
      console.log(response.data);
    } catch (error) {
      console.log(formData)
      console.error(error);
    }
  };
  const yahyacloo=()=>{
    console.log(formData,"yhayayayyayaya");
  }
  return  (
    <>

<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom  style={{ textAlign: 'right', marginLeft: 'auto' }}>
          إضافة قضية جديدة
          </Typography>
        </Stack>
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
               <FormControl fullWidth margin="normal">
          <InputLabel id="tribunal-label">المحكمة</InputLabel>
          <Select
            labelId="tribunal-label"
            id="Tribunal"
            value={tribunal}
            onChange={handleTribunalChange}
          >
            <MenuItem value="التعقيـب">التعقيـب</MenuItem>
            <MenuItem value="الاستئناف">الاستئناف</MenuItem>
            <MenuItem value="الإبتدائية"> الإبتدائية</MenuItem>
            <MenuItem value="الناحية">الناحية</MenuItem>
            <MenuItem value="العقارية">العقارية</MenuItem>
            <MenuItem value="الدستورية">الدستورية</MenuItem>
            <MenuItem value="الإدارية">الإدارية</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="ville-label">مدينة</InputLabel>
          <Select
            labelId="ville-label"
            id="ville"
            value={ville}
            onChange={handleVilleChange}
          >
            <MenuItem value="تونس">تونس </MenuItem>
            <MenuItem value="تونس 2 ">تونس 2  </MenuItem>
            <MenuItem value="أريانة">أريانة </MenuItem>
            <MenuItem value="بن عروس">بن عروس </MenuItem>
            <MenuItem value="منوبة">منوبة </MenuItem>
            <MenuItem value="قرمبالية">قرمبالية </MenuItem>
            <MenuItem value="زغوان">زغوان </MenuItem>
            <MenuItem value="نابل">نابل </MenuItem>
            <MenuItem value="بنزرت">بنزرت </MenuItem>
            <MenuItem value="باجة">باجة </MenuItem>
            <MenuItem value="الكاف">الكاف </MenuItem>
            <MenuItem value="جندوبة">جندوبة </MenuItem>
            <MenuItem value="سليانة">سليانة </MenuItem>
            <MenuItem value="القصرين">القصرين </MenuItem>
            <MenuItem value="سوسة">سوسة </MenuItem>
            <MenuItem value="سوسة 2">سوسة 2 </MenuItem>
            <MenuItem value="القيروان">القيروان </MenuItem>
            <MenuItem value="المنستير">المنستير </MenuItem>
            <MenuItem value="المهدية">المهدية </MenuItem>
            <MenuItem value="صفاقس">صفاقس </MenuItem>
            <MenuItem value="صفاقس 2">صفاقس 2 </MenuItem>
            <MenuItem value="توزر">توزر </MenuItem>
            <MenuItem value="قابس">قابس </MenuItem>
            <MenuItem value="قبلي">قبلي </MenuItem>
            <MenuItem value="مدنين">قفصة </MenuItem>
            <MenuItem value="تطاوين">تطاوين </MenuItem>
            <MenuItem value="سيدي بوزيد">سيدي بوزيد</MenuItem>


          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="Matière-label">المادة</InputLabel>
          <Select
            labelId="Matière-label"
            id="Matière"
            value={Matière}
            onChange={handleMatièreChange}
          >
            <MenuItem value="مدنية">مدنية</MenuItem>
            <MenuItem value="جناحية">جناحية</MenuItem>
            <MenuItem value="جزائية"> جزائية</MenuItem>
            <MenuItem value="شخصية">شخصية</MenuItem>
          </Select>
        </FormControl>
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




