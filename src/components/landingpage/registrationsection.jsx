import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function RegistrationSection() {
    const gridStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
    return (
        <Container maxWidth="xl" sx={{marginTop: '100px'}}>
            <Grid item md={6} sm={6} xs={12} sx={gridStyle}>
                <Typography variant="h4" gutterBottom sx={{marginTop: '30px', textAlign: "center"}}>Zaufaj nam i przekonaj się sam!</Typography>
                <Typography variant="subtitle1" gutterBottom sx={{marginTop: '30px', textAlign: "center"}}>Pamiętaj, że jeśli nie uda Ci się zarobić w pierwszym miesiącu 25$, zwrócimy Ci pieniądze!</Typography>
                <Link style={{textDecoration: "none"}} to="/registration">
                <Button variant="contained" sx={{marginTop: "30px"}}>Zarejestruj się!</Button>
                </Link>
            </Grid>
        </Container>
    )
}