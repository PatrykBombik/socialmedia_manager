import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AlertTitle, FormControl, InputLabel, OutlinedInput, TextField} from "@mui/material";
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
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";

export default function Registration() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    async function handleRegistry() {
        if (!isEmailValid) {
            return;
        }

        const data = await sendDataAPI({
            email: emailValue, password: passwordValue, status: 'active', addedDate: new Date()
        }, "registration");

        setEmailValue('');
        setPasswordValue('');
        setIsRegistered(true);

        console.log(data);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmailValue(email);
        setIsEmailValid(validateEmail(email));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
                        Zostań niezależny finansowo już dziś!
                    </Typography>
                    <MonetizationOnOutlinedIcon fontSize="large" />
                    <Typography
                        variant="h6"
                        gutterBottom sx={{ textAlign: "center" }}
                    >
                        Zarejestruj się i zacznij zarabiać od pierwszego dnia
                    </Typography>
                    <ArrowDownwardOutlinedIcon fontSize="large" />
                    {!isRegistered ? (
                        <>
                    <TextField
                        id="outlined-basic"
                        label="Podaj Twój e-mail"
                        variant="outlined"
                        value={emailValue}
                        onChange={handleEmailChange}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? 'Nieprawidłowy adres email' : ''}
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
                    <Button
                        variant="contained"
                        onClick={handleRegistry}
                    >
                        Zarejestruj się!
                    </Button>
                        </>
                    ) : (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Dziękujemy za rejestrację!<br/>
                            <Link style={{textDecoration: "none", textAlign: "center"}} to="/login">
                            <strong>Zaloguj się</strong>
                            </Link>
                        </Alert>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}
