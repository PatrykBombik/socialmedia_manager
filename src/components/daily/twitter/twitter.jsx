import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI, updateDataAPI} from "../../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddTwitterOperations from "./addoperationstwitter.jsx";
import Addtimespenttwitter from "./addtimespenttwitter.jsx";

function Twitter() {

    const [tasks, setTasks] = useState([]);
    const [title, setTittle] = useState('');
    const [desc, setDesc] = useState('');
    const [operationId, setOperationId] = useState(null);
    const [timeSpentID, setTimeSpentId] = useState(null);

    useEffect(() => {
        const data = Promise.all([getDataAPI("Twitter"), getDataAPI("operations")])

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
        }, "Twitter");

        setTittle('');
        setDesc('');
        setTasks([...tasks, result])
    }

    async function handleDelete(id) {
        const task = tasks.find((task) => task.id === id);

        for (const operation of task.operations) {
            await deleteDataAPI('operations', operation.id)
        }

        await deleteDataAPI("Twitter", id);
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
                'Twitter',
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
                'Twitter',
                id,
                'PATCH'
            );
            setTasks(tasks.map((task) => ({
                ...task,
                status: task.id === id ? 'open' : task.status
            })))
        };
    }


    return (
        <>
        <h1>Twitter</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Nazwa zadania</label>
                <input
                    value={title}
                    type="text"
                    id="title"
                    name="title"
                    onChange={(event) => setTittle(event.target.value)}
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
            <Button variant="contained" onClick={handleSubmit}>Add</Button>
        </form>
        <section>
            {tasks.map((task) => (
                <div key={task.id}>
                    <strong>{task.title}</strong> <span> - {task.description}</span>
                    {operationId === task.id ? (
                        <AddTwitterOperations
                            setTasks={setTasks}
                            setOperationId={setOperationId}
                            taskId={task.id}
                        />
                    ) : (
                        <>
                            {task.status === 'open' && (<button onClick={() => setOperationId(task.id)}>
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
                onClick={() => handleDelete(task.id)}
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
                                setTasks={setTasks}
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
                                onClick={() => handleDeleteOperation(operation.id)}
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