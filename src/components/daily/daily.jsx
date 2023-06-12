import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteTaskAPI, getAllTasks, sendDataAPI} from "../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddOperations from "./addoperations.jsx";

export default function Daily() {
    const [tasksTwitter, setTasksTwitter] = useState([]);
    const [titleTwitter, setTittleTwitter] = useState('');
    const [descTwitter, setDescTwitter] = useState('');
    const [operationTwitterId, setOperationTwitterId] = useState(null);

    useEffect(() => {
        getAllTasks("Twitter")
            .then((data) => {
                setTasksTwitter(data)
            })
            .catch(console.error)
    }, [])

    async function handleTwitterSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI( {
            title: titleTwitter,
            description: descTwitter,
            status: 'open',
            addedDate: new Date()
        },"Twitter");

        setTittleTwitter('');
        setDescTwitter('');
        setTasksTwitter([...tasksTwitter, result])
    }

    async function handleTwitterDelete(event) {
        const id = +event.target.dataset.id
        await deleteTaskAPI("Twitter", id);
        setTasksTwitter(tasksTwitter.filter((task) => task.id !== id))
    }


    const [tasksReddit, setTasksReddit] = useState([]);
    const [titleReddit, setTittleReddit] = useState('');
    const [descReddit, setDescReddit] = useState('');

    useEffect(() => {
        getAllTasks("Reddit")
            .then((data) => {
                setTasksReddit(data)
            })
            .catch(console.error)
    }, [])

    const [tasksInstagram, setTasksInstagram] = useState([]);
    const [titleInstagram, setTittleInstagram] = useState('');
    const [descInstagram, setDescInstagram] = useState('');

    useEffect(() => {
        getAllTasks("Instagram")
            .then((data) => {
                setTasksInstagram(data)
            })
            .catch(console.error)
    }, [])

    const [tasksSnapchat, setTasksSnapchat] = useState([]);
    const [titleSnapchat, setTittleSnapchat] = useState('');
    const [descSnapchat, setDescSnapchat] = useState('');

    useEffect(() => {
        getAllTasks("Snapchat")
            .then((data) => {
                setTasksSnapchat(data)
            })
            .catch(console.error)
    }, [])




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
                    <section>
                        {tasksTwitter.map((task) => (
                            <div key={task.id}>
                                <strong>{task.title}</strong> <span> - {task.description}</span>
                                {operationTwitterId === task.id ? (<AddOperations taskId={task.id}/>) : (
                                    <button onClick={() => setOperationTwitterId(task.id)}>
                                        Add operation
                                    </button>
                                )}
                                <button>Finish</button>
                                <button onClick={handleTwitterDelete} data-id={task.id}>Delete</button>
                            </div>
                        ))}
                    </section>
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