import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useState } from "react";
import { sendDataAPI } from "../helpers/api.jsx";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import {Link} from "react-router-dom";

export default function Login() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    // TODO CHANGE FOR LOGIN FUNCTION
    async function handleLogin() {

            return;


        // const data = await sendDataAPI({
        //     email: emailValue, password: passwordValue, status: 'active', addedDate: new Date()
        // }, "registration");
        //
        // setEmailValue('');
        // setPasswordValue('');
        //
        // console.log(data);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmailValue(email);
    };

    return (
        <Container maxWidth="xl" style={{ marginTop: "150px" }}>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 3
                      }}
                >
                    <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
                        Logowanie
                    </Typography>
                    <WavingHandOutlinedIcon fontSize="large" />
                    <Typography
                        variant="h6"
                        gutterBottom sx={{ textAlign: "center" }}
                    >
                        Cześć!<br/>
                        Gotowy na nowy dzień pełny przygód?<br/>
                        Zaloguj się i zacznij działać!
                    </Typography>
                    <ArrowDownwardOutlinedIcon fontSize="large" />
                    <TextField
                        id="outlined-basic"
                        label="Podaj Twój e-mail"
                        variant="outlined"
                        value={emailValue}
                        onChange={handleEmailChange}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Link style={{textDecoration: "none"}} to="/daily">
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                    >
                        Zaloguj się!
                    </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}
