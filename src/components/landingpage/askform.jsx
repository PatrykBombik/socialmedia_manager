import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function AskForm() {
    return (
        <Container maxWidth="xl" sx={{
            marginTop: "50px",

        }}>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h1>Masz pytania, wątpliwości?</h1>
                    <p>Nie wstydź się i zadaj nam pytanie!</p>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12} xs={12} sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <TextField style={{marginLeft: "20px"}}
                            required
                            id="outlined-required"
                            label="E-mail required"

                        />
                        <TextField style={{marginLeft: "20px"}}
                            id="outlined-basic"
                            label="Wpisz swoje imię"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            style={{marginLeft: "5px"}}
                            id="outlined-textarea"
                            label="Wpisz swoje pytanie"
                            placeholder="Co chciałbyś nas zapytać?"
                            multiline
                            fullWidth={true}
                            rows={4}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Wyślij
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}