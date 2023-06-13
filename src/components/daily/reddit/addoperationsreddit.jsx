import {useState} from "react";
import {sendDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";

function  AddRedditOperations({taskId, setOperationId, setTasks}) {
    const [value, setValue] = useState('');

    async function handleAddOperation() {
        if (value.trim() !== '') {
            const data = await sendDataAPI({
                description: value,
                timeSpent: 0,
                addedDate: new Date(),
                taskId
            }, 'operations');

            setTasks((prev) =>
                prev.map((task) => {
                    if (task.id !== taskId) return task;
                    const operations = task.operations ?? [];
                    task.operations = [...operations, data]
                    return task
                }))
            setOperationId(null);
        }
    }


    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Opis zadania"
            />
            <button onClick={handleAddOperation}>Confirm</button>
            <button onClick={() => setOperationId(null)}>Cancel</button>
        </>
    );
}


AddRedditOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationId: PropTypes.func,
    setTasks: PropTypes.func
};
export default AddRedditOperations