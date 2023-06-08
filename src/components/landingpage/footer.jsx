import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function Footer() {
    return (
        <Container maxWidth="xl" sx={{
            backgroundColor: "lightgray",
            marginTop: "100px",
            textDecoration: "none",
        }}>
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Button href="/">Jak zacząć?</Button>
                <Button href="/daily">Daily</Button>
                <Button href="/">Zarejestruj się</Button>
                <Button href="/login">Logowanie</Button>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <p>SocialMediaManager</p>
                <p>© 2023 Your Company.  All rights reserved.</p>
            </Grid>
        </Grid>
        </Container>
    )
}