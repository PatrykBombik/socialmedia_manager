import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function RegistrationSection() {
    return (
        <Container maxWidth="xl">
            <Grid item md={6} sm={6} xs={12}>
            <h2>Zaufaj nam i przekonaj się sam!</h2>
                <p>Pamiętaj, że jeśli nie uda Ci się zarobić w pierwszym miesiącu 25$, zwrócimy Ci pieniądze!</p>
                <Button variant="contained">Zarejestruj się!</Button>
            </Grid>
        </Container>
    )
}