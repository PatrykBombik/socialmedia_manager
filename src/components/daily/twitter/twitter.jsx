import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddTwitterOperations from "./addoperationstwitter.jsx";
import Addtimespenttwitter from "./addtimespenttwitter.jsx";

function Twitter() {

    const [tasksTwitter, setTasksTwitter] = useState([]);
    const [titleTwitter, setTittleTwitter] = useState('');
    const [descTwitter, setDescTwitter] = useState('');
    const [operationTwitterId, setOperationTwitterId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);

    useEffect(() => {
        const data = Promise.all([getDataAPI("Twitter"), getDataAPI("operations")])

        data
            .then((results) => {
                const [taskTwitterData, operationTwitterData] = results;
                const taskTwitter = taskTwitterData.map((task) => ({
                    ...task, operations: operationTwitterData.filter((operation) => operation.taskId === task.id)
                }))

                setTasksTwitter(taskTwitter);
            })
            .catch(console.error)
    }, [])

    async function handleTwitterSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title: titleTwitter, description: descTwitter, status: 'open', addedDate: new Date()
        }, "Twitter");

        setTittleTwitter('');
        setDescTwitter('');
        setTasksTwitter([...tasksTwitter, result])
    }

    async function handleTwitterDelete(id) {
        const task = tasksTwitter.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("Twitter", id);
        setTasksTwitter(tasksTwitter.filter((task) => task.id !== id));
    }

    async function handleDeleteTwitterOperation(id) {
        await deleteDataAPI("operations", id);
        setTasksTwitter(tasksTwitter.map((task) => {
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
                'Twitter',
                id,
                'PATCH'
            );
            setTasksTwitter(tasksTwitter.map((task) => ({
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
                'Twitter',
                id,
                'PATCH'
            );
            setTasksTwitter(tasksTwitter.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }


    return (
        <>
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
                    {operationTwitterId === task.id ? (
                        <AddTwitterOperations
                            setTasksTwitter={setTasksTwitter}
                            setOperationTwitterId={setOperationTwitterId}
                            taskId={task.id}
                        />
                    ) : (
                        <>
                            {task.status === 'open' && (<button onClick={() => setOperationTwitterId(task.id)}>
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
                onClick={() => handleTwitterDelete(task.id)}
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
                            <Addtimespenttwitter
                                operationId={operation.id}
                                timeSpent={operation.timeSpent}
                                setTasks={setTasksTwitter}
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
                                onClick={() => handleDeleteTwitterOperation(operation.id)}
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

export default Twitter