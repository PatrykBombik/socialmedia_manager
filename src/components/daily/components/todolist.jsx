import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddOperations from "./addoperations.jsx";
import Addtimespent from "./addtimespent.jsx";

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
        <>
            <h1>Daily duties</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Nazwa zadania</label>
                    <input
                        value={title}
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Opis zadania</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handleSubmit}>
                    Add
                </Button>
            </form>
            <section>
                {tasks.map((task) => (
                    <div key={task.id}>
                        {editingTaskId === task.id ? (
                            <form onSubmit={(event) => handleUpdateTask(event, task.id)}>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(event) => setEditingTitle(event.target.value)}
                                />
                                <textarea
                                    value={editingDesc}
                                    onChange={(event) => setEditingDesc(event.target.value)}
                                ></textarea>
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <>
                                <strong>{task.title}</strong> <span> - {task.description}</span>
                                {operationId === task.id ? (
                                    <AddOperations
                                        setTasks={setTasks}
                                        setOperationId={setOperationId}
                                        taskId={task.id}
                                    />
                                ) : (
                                    <>
                                        {task.status === "open" && (
                                            <button onClick={() => setOperationId(task.id)}>
                                                Add operation
                                            </button>
                                        )}
                                    </>
                                )}
                                {task.status === "open" && (
                                    <button onClick={handleFinishTask(task.id)}>Finish</button>
                                )}
                                {task.status === "closed" && (
                                    <button onClick={handleUndoFinishTask(task.id)}>Cofnij</button>
                                )}
                                <button onClick={() => handleDelete(task.id)} data-id={task.id}>
                                    Delete
                                </button>

                                <div>
                                    {task.operations &&
                                        task.operations.map((operation) => (
                                            <div key={operation.id}>
                                                {editingOperationId === operation.id ? (
                                                    <form
                                                        onSubmit={(event) =>
                                                            handleUpdateOperation(event, operation.id)
                                                        }
                                                    >
                                                        <input
                                                            type="text"
                                                            value={editingOperationDesc}
                                                            onChange={(event) =>
                                                                setEditingOperationDesc(event.target.value)
                                                            }
                                                        />
                                                        <button type="submit">Save</button>
                                                    </form>
                                                ) : (
                                                    <>
                                                        <span>{operation.description} :</span>
                                                        {operation.timeSpent !== 0 && (
                                                            <strong>
                                                                {~~(operation.timeSpent / 60)}h{" "}
                                                                {operation.timeSpent % 60}m
                                                            </strong>
                                                        )}
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
                                                                    <button
                                                                        onClick={() => setTimeSpentId(operation.id)}
                                                                    >
                                                                        Add Spent Time
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleEditOperation(operation.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        {task.status === "open" && (
                                                            <button
                                                                onClick={() => handleDeleteOperation(operation.id)}
                                                                data-operationid={operation.id}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </>
    );
}
export default Todolist