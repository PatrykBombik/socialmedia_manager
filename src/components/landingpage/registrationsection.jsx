import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function RegistrationSection() {
    const gridStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px"
    }
    return (
        <Container maxWidth="xl">
            <Grid item md={6} sm={6} xs={12} sx={gridStyle}>
            <h2 style={{textAlign: "center"}}>Zaufaj nam i przekonaj się sam!</h2>
                <p style={{textAlign: "center"}}>Pamiętaj, że jeśli nie uda Ci się zarobić w pierwszym miesiącu 25$, zwrócimy Ci pieniądze!</p>
                <Button variant="contained" sx={{marginTop: "30px"}}>Zarejestruj się!</Button>
            </Grid>
        </Container>
    )
}