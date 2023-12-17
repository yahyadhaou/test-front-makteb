import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';


export default function LoginForm() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleClick = async () => {
    try {
      const user = await axios.post('https://test-al-makteb.onrender.com/login', {
        email,
        pass,
      });
  
      if (email.length>0) {
        console.log(email,pass);
        localStorage.setItem('token', user.data.token);
        localStorage.setItem('id', user.data.id);
        navigate('/dashboard/app');
      } else {
        console.log('invalid token');
      }
    } catch (error) {
      console.log(error.response);
    }
  };
 

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="pass"
          label="Pass"
          type={showPass ? 'text' : 'pass'}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                  <Iconify icon={showPass ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          هل نسيت كلمة السر؟
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
      تسجيل الدخول
      </LoadingButton>
    </>
  );
}