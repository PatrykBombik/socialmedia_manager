import {useState} from "react";
import {sendDataAPI} from "../../helpers/api.jsx";
import PropTypes from "prop-types";

function  AddTwitterOperations({taskId, setOperationTwitterId, setTasksTwitter}) {
    const [value, setValue] = useState('');

    async function handleAddTwitterOperation() {
        if (value.trim() !== '') {
            const data = await sendDataAPI({
                description: value,
                timeSpent: '0h 0m',
                addedDate: new Date(),
                taskId
            }, 'operations');

            setTasksTwitter((prev) =>
                prev.map((task) => {
                    if (task.id !== taskId) return task;
                    const operations = task.operations ?? [];
                    task.operations = [...operations, data]
                    return task
                }))
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
                <button onClick={handleAddTwitterOperation}>Confirm</button>
                <button onClick={() => setOperationTwitterId(null)}>Cancel</button>
            </>
        );
    }


AddTwitterOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationTwitterId: PropTypes.func,
    setTasksTwitter: PropTypes.func
};
export default AddTwitterOperations