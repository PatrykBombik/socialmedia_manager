import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI} from "../../helpers/api.jsx";
import Twitter from "./twitter/twitter.jsx";

export default function Daily() {

    const [tasksSnapchat, setTasksSnapchat] = useState([]);
    const [titleSnapchat, setTittleSnapchat] = useState('');
    const [descSnapchat, setDescSnapchat] = useState('');

    useEffect(() => {
        getDataAPI("Snapchat")
            .then((data) => {
                setTasksSnapchat(data)
            })
            .catch(console.error)
    }, [])


    return (<>
        <Container maxWidth="xl" style={{marginTop: "10%"}}>
            <Grid item md={12} sm={12} xs={12}>
               <Twitter/>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <h1>Reddit</h1>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <h1>Instagram</h1>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <h1>Snapchat</h1>
            </Grid>
        </Container>
    </>)
}