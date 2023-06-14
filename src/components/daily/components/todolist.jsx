import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddOperations from "./addoperations.jsx";
import Addtimespent from "./addtimespent.jsx";
import {
    ButtonGroup,
    Chip,
    Collapse,
    Container,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import TimerIcon from '@mui/icons-material/Timer';


function Todolist() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [operationId, setOperationId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');
    const [editingOperationId, setEditingOperationId] = useState(null);
    const [editingOperationDesc, setEditingOperationDesc] = useState("");

    useEffect(() => {
        const data = Promise.all([getDataAPI("tasks"), getDataAPI("operations")])

        data
            .then((results) => {
                const [taskData, operationData] = results;
                const task = taskData.map((task) => ({
                    ...task, operations: operationData.filter((operation) => operation.taskId === task.id)
                }))

                setTasks(task);
            })
            .catch(console.error)
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title: title, description: desc, status: 'open', addedDate: new Date()
        }, "tasks");

        setTitle('');
        setDesc('');
        setTasks([...tasks, result])
    }

    async function handleDelete(id) {
        const task = tasks.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("tasks", id);
        setTasks(tasks.filter((task) => task.id !== id));
    }

    async function handleDeleteOperation(id) {
        await deleteDataAPI("operations", id);
        setTasks(tasks.map((task) => {
            return {
                ...task,
                operations: task.operations.filter((operation) => operation.id !== id)
            }
        }))
    }

    function handleFinishTask(id) {
        return async function () {
            await updateDataAPI({
                    status: 'closed'
                },
                'tasks',
                id,
                'PATCH'
            );
            setTasks(tasks.map((task) => ({
                ...task,
                status: task.id === id ? 'closed' : task.status
            })))
        };
    }

    function handleUndoFinishTask(id) {
        return async function () {
            await updateDataAPI({
                    status: 'open'
                },
                'tasks',
                id,
                'PATCH'
            );
            setTasks(tasks.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }

    async function handleEditTask(id) {
        const taskToEdit = tasks.find((task) => task.id === id);
        setEditingTaskId(id);
        setEditingTitle(taskToEdit.title);
        setEditingDesc(taskToEdit.description);
    }

    async function handleUpdateTask(event, id) {
        event.preventDefault();

        const updatedTask = {
            title: editingTitle,
            description: editingDesc,
        };

        await updateDataAPI(updatedTask, "tasks", id, "PATCH");

        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        title: editingTitle,
                        description: editingDesc,
                    };
                }
                return task;
            })
        );

        setEditingTaskId(null);
        setEditingTitle("");
        setEditingDesc("");
    }

    async function handleEditOperation(operationId) {
        const operationToEdit = tasks
            .flatMap((task) => task.operations)
            .find((operation) => operation.id === operationId);

        setEditingOperationId(operationId);
        setEditingOperationDesc(operationToEdit.description);
    }

    async function handleUpdateOperation(event, operationId) {
        event.preventDefault();

        const updatedOperation = {
            description: editingOperationDesc,
        };

        await updateDataAPI(
            updatedOperation,
            "operations",
            operationId,
            "PATCH"
        );

        setTasks(
            tasks.map((task) => {
                const updatedOperations = task.operations.map((operation) => {
                    if (operation.id === operationId) {
                        return {
                            ...operation,
                            description: editingOperationDesc,
                        };
                    }
                    return operation;
                });

                return {
                    ...task,
                    operations: updatedOperations,
                };
            })
        );

        setEditingOperationId(null);
        setEditingOperationDesc("");
    }


    return (
        <Container maxWidth="xl">
            <h1 style={{textAlign: "center"}}>Twoje codzienne zadania!</h1>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        id="outlined-basic"
                        label="Wpisz nazwę zadania"
                        variant="outlined"
                        value={title}
                        type="text"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Wpisz opis zadania"
                        variant="outlined"
                        name="desc"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Dodaj zadanie
                    </Button>
                </Stack>
            </form>
            <Grid container spacing={2} gap={2} style={{marginTop: "20px"}}>
                {tasks.map((task) => (
                    <Grid item md={12} sm={12} xs={12} key={task.id}>
                        <List
                            sx={{width: '100%', bgcolor: 'background.paper'}}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={() => {}} sx={{display: "flex", justifyContent: "space-between"}}>
                                <Grid sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                {task.status === 'open' ? (
                                <ListItemIcon>
                                    <RadioButtonUncheckedRoundedIcon/>
                                </ListItemIcon>
                                    ) : (
                                    <ListItemIcon>
                                    <TaskAltRoundedIcon/>
                                    </ListItemIcon>
                                    )}
                                <ListItemText primary={task.title} secondary={task.description}/>
                                </Grid>
                                <ButtonGroup size="small" variant="text" aria-label="text button group">

                                    {task.status === "open" && (
                                        <>
                                            <Button size="small" onClick={() => handleEditTask(task.id)} data-id={task.id}>
                                                <ListItemIcon sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end"
                                                }}><EditRoundedIcon/></ListItemIcon>
                                            </Button>
                                            <Button size="small" onClick={handleFinishTask(task.id)}>
                                                <ListItemIcon sx={{
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}><DoneRoundedIcon/></ListItemIcon>
                                            </Button>
                                        </>
                                    )}
                                    {task.status === "closed" && (
                                        <Button size="small" onClick={handleUndoFinishTask(task.id)}>
                                            <ListItemIcon><ReplayRoundedIcon/></ListItemIcon>
                                        </Button>
                                    )}

                                    <Button onClick={() => handleDelete(task.id)} data-id={task.id}>
                                        <ListItemIcon><DeleteForeverRoundedIcon/></ListItemIcon>
                                    </Button>
                                </ButtonGroup>
                            </ListItemButton>
                            {editingTaskId === task.id ? (
                                <form onSubmit={(event) => handleUpdateTask(event, task.id)}>
                                    <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <TextField
                                        sx={{marginTop: "10px"}}
                                        fullWidth="true"
                                        id="outlined-basic"
                                        label="Edytuj nazwę zadania"
                                        variant="outlined"
                                        type="text"
                                        value={editingTitle}
                                        onChange={(event) => setEditingTitle(event.target.value)}
                                    />
                                    <TextField
                                        sx={{marginTop: "10px"}}
                                        fullWidth="true"
                                        id="outlined-basic"
                                        label="Edytuj opis zadania"
                                        variant="outlined"
                                        value={editingDesc}
                                        onChange={(event) => setEditingDesc(event.target.value)}
                                    />
                                    <Button sx={{marginTop: "10px"}} type="submit"><ListItemIcon sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}><SaveRoundedIcon/>Zapisz</ListItemIcon></Button>
                                    </Grid>
                                </form>
                            ) : (
                                <>
                                </>
                            )}
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                {operationId === task.id ? (
                                    <Grid item md={12} sm={12} xs={12} sx={{display: "flex", flexDirection: "column"}}>
                                    <AddOperations
                                        setTasks={setTasks}
                                        setOperationId={setOperationId}
                                        taskId={task.id}
                                    />
                                    </Grid>
                                ) : (
                                    <>
                                        {task.status === "open" && (
                                            <Grid sx={{display: "flex", flexDirection: "column"}}>
                                            <Button onClick={() => setOperationId(task.id)}>
                                                <ListItemIcon><AddRoundedIcon/>Dodaj zadanie</ListItemIcon>
                                            </Button>
                                            </Grid>
                                        )}
                                    </>
                                )}

                                {task.operations &&
                                    task.operations.map((operation) => (
                                        <List component="div" disablePadding key={operation.id}
                                              sx={{display: "flex"}}
                                        >
                                            {editingOperationId === operation.id ? (
                                                <form
                                                    onSubmit={(event) =>
                                                        handleUpdateOperation(event, operation.id)
                                                    }
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Edytuj opis zadania"
                                                        variant="outlined"
                                                        type="text"
                                                        value={editingOperationDesc}
                                                        onChange={(event) =>
                                                            setEditingOperationDesc(event.target.value)
                                                        }
                                                    />
                                                    <Button variant="outlined" type="submit">Save</Button>
                                                </form>
                                            ) : (
                                                <Grid item md={12} sm={12} xs={12}
                                                      sx={{
                                                          display: "flex",
                                                          alignItems: "center"}}>
                                                    <ListItemText primary={operation.description}/>
                                                    <Chip
                                                        sx={{fontSize: "10px"}}
                                                        size="small"
                                                        icon={<TimerIcon />}
                                                        variant="outlined"
                                                        color="primary"
                                                        label={`${~~(operation.timeSpent / 60)}h ${operation.timeSpent % 60}m`}
                                                    />
                                                    <ButtonGroup size="small" variant="text" aria-label="text button group" >

                                                        {operation.id === timeSpentID ? (
                                                            <Addtimespent
                                                                operationId={operation.id}
                                                                timeSpent={operation.timeSpent}
                                                                setTasks={setTasks}
                                                                setTimeSpentId={setTimeSpentId}
                                                            />
                                                        ) : (
                                                            <>
                                                                {task.status === "open" && (
                                                                    <>
                                                                        <Button
                                                                            onClick={() => setTimeSpentId(operation.id)}
                                                                        >
                                                                            <ListItemIcon sx={{
                                                                                display: "flex",
                                                                                justifyContent: "center"
                                                                            }}><MoreTimeIcon/></ListItemIcon>
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleEditOperation(operation.id)}
                                                                        >
                                                                            <ListItemIcon sx={{
                                                                                display: "flex",
                                                                                justifyContent: "center"
                                                                            }}><EditRoundedIcon/></ListItemIcon>
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        {task.status === "open" && (
                                                            <Button
                                                                onClick={() => handleDeleteOperation(operation.id)}
                                                                data-operationid={operation.id}
                                                            >
                                                                <ListItemIcon><DeleteForeverRoundedIcon/></ListItemIcon>
                                                            </Button>
                                                        )}
                                                    </ButtonGroup>
                                                </Grid>
                                            )}
                                        </List>
                                    ))}
                            </Collapse>

                        </List>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Todolist