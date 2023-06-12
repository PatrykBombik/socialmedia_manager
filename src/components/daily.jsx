import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {getAllTasks, sendTaskData} from "../helpers/api.jsx";
import Button from "@mui/material/Button";

export default function Daily() {
    const [taskTwitter, setTaskTwitter] = useState([]);
    const [titleTwitter, setTittleTwitter] = useState('');
    const [descTwitter, setDescTwitter] = useState('');

    useEffect(() => {
        getAllTasks("Twitter")
            .then((data) => {
                setTaskTwitter(data)
            })
            .catch(console.error)
    }, [])

    const [taskReddit, setTaskReddit] = useState([]);
    const [titleReddit, setTittleReddit] = useState('');
    const [descReddit, setDescReddit] = useState('');

    useEffect(() => {
        getAllTasks("Reddit")
            .then((data) => {
                setTaskReddit(data)
            })
            .catch(console.error)
    }, [])

    const [taskInstagram, setTaskInstagram] = useState([]);
    const [titleInstagram, setTittleInstagram] = useState('');
    const [descInstagram, setDescInstagram] = useState('');

    useEffect(() => {
        getAllTasks("Instagram")
            .then((data) => {
                setTaskInstagram(data)
            })
            .catch(console.error)
    }, [])

    const [taskSnapchat, setTaskSnapchat] = useState([]);
    const [titleSnapchat, setTittleSnapchat] = useState('');
    const [descSnapchat, setDescSnapchat] = useState('');

    useEffect(() => {
        getAllTasks("Snapchat")
            .then((data) => {
                setTaskSnapchat(data)
            })
            .catch(console.error)
    }, [])


    async function handleTwitterSubmit(event) {
        event.preventDefault();
        const result = await sendTaskData("Twitter", {
            title: titleTwitter, description: descTwitter, status: 'open', addedDate: new Date()
        });
        console.log(result)
    }

    return (
        <>
            <Container maxWidth="xl" style={{marginTop: "10%"}}>
                <Grid item md={12} sm={12} xs={12}>
                    <h1>Twitter</h1>
                    <form onSubmit={handleTwitterSubmit}>
                        <div>
                            <label htmlFor="title">Nazwa zadania</label>
                            <input
                                value={titleTwitter}
                                type="text"
                                id="title"
                                name="title"
                                onChange={(event) => setTittleTwitter(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="desc">Opis zadania</label>
                            <textarea
                                id="desc"
                                name="desc"
                                value={descTwitter}
                                onChange={(event) => setDescTwitter(event.target.value)}
                            />
                        </div>
                        <Button variant="contained" onClick={handleTwitterSubmit}>Add</Button>
                    </form>
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
        </>
    )
}