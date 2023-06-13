import {useEffect, useState} from "react";
import {deleteDataAPI, getDataAPI, sendDataAPI} from "../../helpers/api.jsx";
import Button from "@mui/material/Button";
import AddTwitterOperations from "./addoperations.jsx";
import Addtimespent from "./addtimespent.jsx";

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
        await deleteDataAPI("Twitter", id);
        setTasksTwitter(tasksTwitter.filter((task) => task.id !== id))
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
                            <button onClick={() => setOperationTwitterId(task.id)}>
                                Add operation
                            </button>
                        )}
                        <button>Finish</button>
                        <button
                            onClick={() => handleTwitterDelete(task.id)}
                            data-id={task.id}
                        >Delete</button>

                        <div>
                            {task.operations && task.operations.map((operation) => (
                                <div key={operation.id}>
                                    <span>{operation.description} :</span><strong>{operation.timeSpent}</strong>
                                    {operation.id === timeSpentID ? (
                                        <Addtimespent
                                            operationId={operation.id}
                                            timeSpent={operation.timeSpent}
                                            setTasks={setTasksTwitter}
                                            setTimeSpentId={setTimeSpentId}

                                        />
                                    ) : (
                                        <button onClick={() => setTimeSpentId(operation.id)}>Add Spent Time</button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteTwitterOperation(operation.id)}
                                        data-operationid={operation.id}
                                    >Delete</button>
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