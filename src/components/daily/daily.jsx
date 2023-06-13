import {Container, Grid} from "@mui/material";
import Twitter from "./twitter/twitter.jsx";
import Instagram from "./instagram/instagram.jsx";
import Reddit from "./reddit/reddit.jsx";
import Snapchat from "./snapchat/snapchat.jsx";

export default function Daily() {

    return (<>
        <Container maxWidth="xl" style={{marginTop: "10%"}}>
            <Grid item md={12} sm={12} xs={12}>
               <Twitter/>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Instagram/>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Reddit/>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Snapchat/>
            </Grid>
        </Container>
    </>)
}