import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Container maxWidth="xl" sx={{
            backgroundColor: "lightgray",
            marginTop: "100px",
            textDecoration: "none",
        }}>
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}
                  sx={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button component={Link} to="/">
                        Jak zacząć?
                    </Button>
                    <Button component={Link} to="/daily">
                        Daily
                    </Button>
                    <Button component={Link} to="/registration">
                        Zarejestruj się
                    </Button>
                    <Button component={Link} to="/login">
                        Logowanie
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item md={12} sm={12} xs={12} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Typography variant="subtitle2" gutterBottom>SocialMediaManager</Typography>
                <Typography variant="subtitle2" gutterBottom>© 2023 Your Company.  All rights reserved.</Typography>
            </Grid>
        </Grid>
        </Container>
    )
}