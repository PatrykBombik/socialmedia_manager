import {Container, Grid} from "@mui/material";
import Todolist from "./components/todolist.jsx";

export default function Daily() {

    return (<>
        <Container maxWidth="xl" style={{marginTop: "10%"}}>
            <Grid item md={12} sm={12} xs={12}>
               <Todolist/>
            </Grid>
        </Container>
    </>)
}