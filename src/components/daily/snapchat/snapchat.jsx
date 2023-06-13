import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddSnapchatOperations from "./addoperationssnapchat.jsx";
import Addtimespentsnapchat from "./addtimespentsnapchat.jsx";

function Snapchat() {

    const [tasksSnapchat, setTasksSnapchat] = useState([]);
    const [titleSnapchat, setTittleSnapchat] = useState('');
    const [descSnapchat, setDescSnapchat] = useState('');
    const [operationSnapchatId, setOperationSnapchatId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);

    useEffect(() => {
        const data = Promise.all([getDataAPI("Snapchat"), getDataAPI("operations")])

        data
            .then((results) => {
                const [taskSnapchatData, operationSnapchatData] = results;
                const taskSnapchat = taskSnapchatData.map((task) => ({
                    ...task, operations: operationSnapchatData.filter((operation) => operation.taskId === task.id)
                }))

                setTasksSnapchat(taskSnapchat);
            })
            .catch(console.error)
    }, [])

    async function handleSnapchatSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title: titleSnapchat, description: descSnapchat, status: 'open', addedDate: new Date()
        }, "Snapchat");

        setTittleSnapchat('');
        setDescSnapchat('');
        setTasksSnapchat([...tasksSnapchat, result])
    }

    async function handleSnapchatDelete(id) {
        const task = tasksSnapchat.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("Snapchat", id);
        setTasksSnapchat(tasksSnapchat.filter((task) => task.id !== id));
    }

    async function handleDeleteSnapchatOperation(id) {
        await deleteDataAPI("operations", id);
        setTasksSnapchat(tasksSnapchat.map((task) => {
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
                'Snapchat',
                id,
                'PATCH'
            );
            setTasksSnapchat(tasksSnapchat.map((task) => ({
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
                'Snapchat',
                id,
                'PATCH'
            );
            setTasksSnapchat(tasksSnapchat.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }

    return (
        <>
            <h1>Snapchat</h1>
            <form onSubmit={handleSnapchatSubmit}>
                <div>
                    <label htmlFor="title">Nazwa zadania</label>
                    <input
                        value={titleSnapchat}
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => setTittleSnapchat(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Opis zadania</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={descSnapchat}
                        onChange={(event) => setDescSnapchat(event.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handleSnapchatSubmit}>Add</Button>
            </form>
            <section>
                {tasksSnapchat.map((task) => (
                    <div key={task.id}>
                        <strong>{task.title}</strong> <span> - {task.description}</span>
                        {operationSnapchatId === task.id ? (
                            <AddSnapchatOperations
                                setTasksSnapchat={setTasksSnapchat}
                                setOperationSnapchatId={setOperationSnapchatId}
                                taskId={task.id}
                            />
                        ) : (
                            <>
                                {task.status === 'open' && (<button onClick={() => setOperationSnapchatId(task.id)}>
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
                            onClick={() => handleSnapchatDelete(task.id)}
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
                                        <Addtimespentsnapchat
                                            operationId={operation.id}
                                            timeSpent={operation.timeSpent}
                                            setTasks={setTasksSnapchat}
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
                                            onClick={() => handleDeleteSnapchatOperation(operation.id)}
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

export default Snapchat