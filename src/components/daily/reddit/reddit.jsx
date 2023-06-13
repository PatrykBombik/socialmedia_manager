import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddRedditOperations from "./addoperationsreddit.jsx";
import Addtimespentreddit from "./addtimespentreddit.jsx";

function Reddit() {

    const [tasksReddit, setTasksReddit] = useState([]);
    const [titleReddit, setTittleReddit] = useState('');
    const [descReddit, setDescReddit] = useState('');
    const [operationRedditId, setOperationRedditId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);

    useEffect(() => {
        const data = Promise.all([getDataAPI("Reddit"), getDataAPI("operations")])

        data
            .then((results) => {
                const [taskRedditData, operationRedditData] = results;
                const taskReddit = taskRedditData.map((task) => ({
                    ...task, operations: operationRedditData.filter((operation) => operation.taskId === task.id)
                }))

                setTasksReddit(taskReddit);
            })
            .catch(console.error)
    }, [])

    async function handleRedditSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title: titleReddit, description: descReddit, status: 'open', addedDate: new Date()
        }, "Reddit");

        setTittleReddit('');
        setDescReddit('');
        setTasksReddit([...tasksReddit, result])
    }

    async function handleRedditDelete(id) {
        const task = tasksReddit.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("Reddit", id);
        setTasksReddit(tasksReddit.filter((task) => task.id !== id));
    }

    async function handleDeleteRedditOperation(id) {
        await deleteDataAPI("operations", id);
        setTasksReddit(tasksReddit.map((task) => {
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
                'Reddit',
                id,
                'PATCH'
            );
            setTasksReddit(tasksReddit.map((task) => ({
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
                'Reddit',
                id,
                'PATCH'
            );
            setTasksReddit(tasksReddit.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }

    return (
        <>
            <h1>Reddit</h1>
            <form onSubmit={handleRedditSubmit}>
                <div>
                    <label htmlFor="title">Nazwa zadania</label>
                    <input
                        value={titleReddit}
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => setTittleReddit(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Opis zadania</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={descReddit}
                        onChange={(event) => setDescReddit(event.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handleRedditSubmit}>Add</Button>
            </form>
            <section>
                {tasksReddit.map((task) => (
                    <div key={task.id}>
                        <strong>{task.title}</strong> <span> - {task.description}</span>
                        {operationRedditId === task.id ? (
                            <AddRedditOperations
                                setTasksReddit={setTasksReddit}
                                setOperationRedditId={setOperationRedditId}
                                taskId={task.id}
                            />
                        ) : (
                            <>
                                {task.status === 'open' && (<button onClick={() => setOperationRedditId(task.id)}>
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
                            onClick={() => handleRedditDelete(task.id)}
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
                                        <Addtimespentreddit
                                            operationId={operation.id}
                                            timeSpent={operation.timeSpent}
                                            setTasks={setTasksReddit}
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
                                            onClick={() => handleDeleteRedditOperation(operation.id)}
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

export default Reddit