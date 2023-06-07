import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function AskForm() {
    return (
        <Container maxWidth="xl" sx={{
            marginTop: "5%",

        }}>
            <Grid container spacing={2}>
                <Grid item md={6} sm={6} xs={12}>
                    <h1>Masz pytania, wątpliwości?</h1>
                    <p>Nie wstydź się i zadaj nam pytanie!</p>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={4} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail required"

                        />
                        <TextField
                            sx={{
                                marginTop: "10%"
                        }}
                            id="outlined-basic"
                            label="Wpisz swoje imię"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                        <TextField
                            id="outlined-textarea"
                            label="Wpisz swoje pytanie"
                            placeholder="Co chciałbyś nas zapytać?"
                            multiline
                        />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Wyślij
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}