import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <Container maxWidth="xl" sx={{
            backgroundColor: "lightgray",
            marginTop: "100px",
            textDecoration: "none",
        }}>
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button>Jak zacząć?</Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/daily">
                    <Button>Daily</Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/registration">
                <Button>Zarejestruj się</Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/login">
                <Button>Logowanie</Button>
                </Link>
            </Grid>
            <Grid item md={12} sm={12} xs={12} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <p>SocialMediaManager</p>
                <p>© 2023 Your Company.  All rights reserved.</p>
            </Grid>
        </Grid>
        </Container>
    )
}