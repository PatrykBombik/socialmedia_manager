import {useState} from "react";
import {sendDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";

function  AddSnapchatOperations({taskId, setOperationSnapchatId, setTasksSnapchat}) {
    const [value, setValue] = useState('');

    async function handleAddSnapchatOperation() {
        if (value.trim() !== '') {
            const data = await sendDataAPI({
                description: value,
                timeSpent: 0,
                addedDate: new Date(),
                taskId
            }, 'operations');

            setTasksSnapchat((prev) =>
                prev.map((task) => {
                    if (task.id !== taskId) return task;
                    const operations = task.operations ?? [];
                    task.operations = [...operations, data]
                    return task
                }))
            setOperationSnapchatId(null);
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
            <button onClick={handleAddSnapchatOperation}>Confirm</button>
            <button onClick={() => setOperationSnapchatId(null)}>Cancel</button>
        </>
    );
}


AddSnapchatOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationSnapchatId: PropTypes.func,
    setTasksSnapchat: PropTypes.func
};
export default AddSnapchatOperations