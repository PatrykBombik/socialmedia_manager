import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddInstagramOperations from "./addoperationsinstagram.jsx";
import Addtimespentinstagram from "./addtimespentinstagram.jsx";

function Instagram() {

    const [tasksInstagram, setTasksInstagram] = useState([]);
    const [titleInstagram, setTittleInstagram] = useState('');
    const [descInstagram, setDescInstagram] = useState('');
    const [operationInstagramId, setOperationInstagramId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);

    useEffect(() => {
        const data = Promise.all([getDataAPI("Instagram"), getDataAPI("operations")])

        data
            .then((results) => {
                const [taskInstagramData, operationInstagramData] = results;
                const taskInstagram = taskInstagramData.map((task) => ({
                    ...task, operations: operationInstagramData.filter((operation) => operation.taskId === task.id)
                }))

                setTasksInstagram(taskInstagram);
            })
            .catch(console.error)
    }, [])

    async function handleInstagramSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title: titleInstagram, description: descInstagram, status: 'open', addedDate: new Date()
        }, "Instagram");

        setTittleInstagram('');
        setDescInstagram('');
        setTasksInstagram([...tasksInstagram, result])
    }

    async function handleInstagramDelete(id) {
        const task = tasksInstagram.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("Instagram", id);
        setTasksInstagram(tasksInstagram.filter((task) => task.id !== id));
    }

    async function handleDeleteInstagramOperation(id) {
        await deleteDataAPI("operations", id);
        setTasksInstagram(tasksInstagram.map((task) => {
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
                'Instagram',
                id,
                'PATCH'
            );
            setTasksInstagram(tasksInstagram.map((task) => ({
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
                'Instagram',
                id,
                'PATCH'
            );
            setTasksInstagram(tasksInstagram.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }

    return (
        <>
            <h1>Instagram</h1>
            <form onSubmit={handleInstagramSubmit}>
                <div>
                    <label htmlFor="title">Nazwa zadania</label>
                    <input
                        value={titleInstagram}
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => setTittleInstagram(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Opis zadania</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={descInstagram}
                        onChange={(event) => setDescInstagram(event.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handleInstagramSubmit}>Add</Button>
            </form>
            <section>
                {tasksInstagram.map((task) => (
                    <div key={task.id}>
                        <strong>{task.title}</strong> <span> - {task.description}</span>
                        {operationInstagramId === task.id ? (
                            <AddInstagramOperations
                                setTasksInstagram={setTasksInstagram}
                                setOperationInstagramId={setOperationInstagramId}
                                taskId={task.id}
                            />
                        ) : (
                            <>
                                {task.status === 'open' && (<button onClick={() => setOperationInstagramId(task.id)}>
                                    Add operation
                                </button>)}
                            </>
                        )}
                        {task.status === 'open' && (
                            <button onClick={handleFinishTask(task.id)}>Finish</button>
                        )}
                        {task.status === 'closed' && (
                            <button onClick={handleUndoFinishTask(task.id)}>Cofnij</button>
                        )}
                        <button
                            onClick={() => handleInstagramDelete(task.id)}
                            data-id={task.id}
                        >Delete
                        </button>

                        <div>
                            {task.operations && task.operations.map((operation) => (
                                <div key={operation.id}>
                                    <span>{operation.description} :</span>
                                    {operation.timeSpent !== 0 && (
                                        <strong>{~~(operation.timeSpent / 60)}h {operation.timeSpent % 60}m</strong>
                                    )}
                                    {operation.id === timeSpentID ? (
                                        <Addtimespentinstagram
                                            operationId={operation.id}
                                            timeSpent={operation.timeSpent}
                                            setTasks={setTasksInstagram}
                                            setTimeSpentId={setTimeSpentId}

                                        />
                                    ) : (
                                        <>
                                            {task.status === 'open' && (
                                                <button onClick={() => setTimeSpentId(operation.id)}>Add Spent Time</button>
                                            )}
                                        </>
                                    )}
                                    {task.status === 'open' && (
                                        <button
                                            onClick={() => handleDeleteInstagramOperation(operation.id)}
                                            data-operationid={operation.id}
                                        >Delete</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Instagram