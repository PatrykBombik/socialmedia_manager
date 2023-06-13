import {useState} from "react";
import {sendDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";

function  AddRedditOperations({taskId, setOperationRedditId, setTasksReddit}) {
    const [value, setValue] = useState('');

    async function handleAddRedditOperation() {
        if (value.trim() !== '') {
            const data = await sendDataAPI({
                description: value,
                timeSpent: 0,
                addedDate: new Date(),
                taskId
            }, 'operations');

            setTasksReddit((prev) =>
                prev.map((task) => {
                    if (task.id !== taskId) return task;
                    const operations = task.operations ?? [];
                    task.operations = [...operations, data]
                    return task
                }))
            setOperationRedditId(null);
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
            <button onClick={handleAddRedditOperation}>Confirm</button>
            <button onClick={() => setOperationRedditId(null)}>Cancel</button>
        </>
    );
}


AddRedditOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationRedditId: PropTypes.func,
    setTasksReddit: PropTypes.func
};
export default AddRedditOperations