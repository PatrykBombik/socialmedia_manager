import {useState} from "react";
import {sendDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";

function  AddInstagramOperations({taskId, setOperationInstagramId, setTasksInstagram}) {
    const [value, setValue] = useState('');

    async function handleAddInstagramOperation() {
        if (value.trim() !== '') {
            const data = await sendDataAPI({
                description: value,
                timeSpent: 0,
                addedDate: new Date(),
                taskId
            }, 'operations');

            setTasksInstagram((prev) =>
                prev.map((task) => {
                    if (task.id !== taskId) return task;
                    const operations = task.operations ?? [];
                    task.operations = [...operations, data]
                    return task
                }))
            setOperationInstagramId(null);
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
            <button onClick={handleAddInstagramOperation}>Confirm</button>
            <button onClick={() => setOperationInstagramId(null)}>Cancel</button>
        </>
    );
}


AddInstagramOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationInstagramId: PropTypes.func,
    setTasksInstagram: PropTypes.func
};
export default AddInstagramOperations