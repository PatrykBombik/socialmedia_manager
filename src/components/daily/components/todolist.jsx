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
                        id="title"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Wpisz opis zadania"
                        variant="outlined"
                        id="desc"
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
                            <ListItemButton onClick={() => {}}>
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
                                <ButtonGroup variant="text" aria-label="text button group">

                                    {task.status === "open" && (
                                        <>
                                            <Button onClick={() => handleEditTask(task.id)} data-id={task.id}>
                                                <ListItemIcon><EditRoundedIcon/>Edytuj</ListItemIcon>
                                            </Button>
                                            <Button onClick={handleFinishTask(task.id)}>
                                                <ListItemIcon><DoneRoundedIcon/>Finish</ListItemIcon>
                                            </Button>
                                        </>
                                    )}
                                    {task.status === "closed" && (
                                        <Button onClick={handleUndoFinishTask(task.id)}>
                                            <ListItemIcon><ReplayRoundedIcon/>Cofnij</ListItemIcon>
                                        </Button>
                                    )}
                                    <Button onClick={() => handleDelete(task.id)} data-id={task.id}>
                                        <ListItemIcon><DeleteForeverRoundedIcon/></ListItemIcon>
                                    </Button>
                                </ButtonGroup>
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {operationId === task.id ? (
                                    <AddOperations
                                        setTasks={setTasks}
                                        setOperationId={setOperationId}
                                        taskId={task.id}
                                    />
                                ) : (
                                    <>
                                        {task.status === "open" && (
                                            <Button onClick={() => setOperationId(task.id)}>
                                                <ListItemIcon><AddRoundedIcon/>Dodaj zadanie</ListItemIcon>
                                            </Button>
                                        )}
                                    </>
                                )}
                                {task.operations &&
                                    task.operations.map((operation) => (
                                        <List component="div" disablePadding key={operation.id}>
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
                                                <><ListItemText primary={operation.description}/>

                                                    {operation.timeSpent !== 0 && (
                                                        <Chip
                                                            variant="outlined"
                                                            color="primary"
                                                            label={`${~~(operation.timeSpent / 60)}h ${operation.timeSpent % 60}m`}
                                                        />
                                                    )}
                                                    <ButtonGroup variant="text" aria-label="text button group">

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
                                                                    <Button
                                                                        onClick={() => setTimeSpentId(operation.id)}
                                                                    >
                                                                        Add Spent Time
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}
                                                        <Button
                                                            onClick={() => handleEditOperation(operation.id)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        {task.status === "open" && (
                                                            <Button
                                                                onClick={() => handleDeleteOperation(operation.id)}
                                                                data-operationid={operation.id}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </ButtonGroup>
                                                </>
                                            )}
                                        </List>
                                    ))}
                            </Collapse>

                        </List>
                        {editingTaskId === task.id ? (
                            <form onSubmit={(event) => handleUpdateTask(event, task.id)}>
                                <TextField
                                    id="outlined-basic"
                                    label="Edytuj nazwę zadania"
                                    variant="outlined"
                                    type="text"
                                    value={editingTitle}
                                    onChange={(event) => setEditingTitle(event.target.value)}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Edytuj opis zadania"
                                    variant="outlined"
                                    value={editingDesc}
                                    onChange={(event) => setEditingDesc(event.target.value)}
                                />
                                <Button type="submit"><ListItemIcon><SaveRoundedIcon/>Save</ListItemIcon></Button>
                            </form>
                        ) : (
                            <>

                            </>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Todolist