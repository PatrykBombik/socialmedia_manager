import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";
import {sendDataAPI} from "../../helpers/api.jsx";

export default function AskForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [question, setQuestion] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);


   async function handleSubmitQuestion() {
       if (!isEmailValid || email ==='' || name === '' || question === '') {
           return ;
       }
       const data = await sendDataAPI({
           email, name, question, addedDate: new Date()
       }, "questions")

       setEmail('')
       setName('')
       setQuestion('')

       return console.log(data)
    }

    const handleEmailChange = (e) => {
       const email = e.target.value;
       setEmail(email);
       setIsEmailValid(validateEmail(email));
    }

    const handleNameChange = (e) => {
       const name = e.target.value;
       setName(name);
    }

    const handleQuestionChange = (e) => {
       const question = e.target.value;
       setQuestion(question);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



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
                                   value={email}
                                   onChange={handleEmailChange}
                                   error={!isEmailValid}
                                   helperText={!isEmailValid ? 'Nieprawidłowy adres email' : ''}

                        />
                        <TextField style={{marginLeft: "20px"}}
                            id="outlined-basic"
                            label="Wpisz swoje imię"
                            variant="outlined"
                                   value={name}
                                   onChange={handleNameChange}
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
                            value={question}
                            onChange={handleQuestionChange}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSubmitQuestion}
                        >
                            Wyślij
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}