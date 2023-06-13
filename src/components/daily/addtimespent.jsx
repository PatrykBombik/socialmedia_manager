import {useState} from "react";
import {updateDataAPI} from "../../helpers/api.jsx";
import PropTypes from "prop-types";

function Addtimespent({operationId, timeSpent, setTasks, setTimeSpentId}) {
    const [value, setValue] = useState(0);


    async function handleUpdateOperation() {
        const data = await updateDataAPI(
            {'timeSpent': value + timeSpent},
            'operations',
            operationId,
            'PATCH'
        )
        setTasks((prev) => prev.map((task) => ({
          ...task,
            operations: task.operations.map((operation) => {
                if (operation.id === operationId) {
                    operation.timeSpent += value
                }
                return operation
            })
        })));
        setTimeSpentId(null);
    }

    return (
        <>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.valueAsNumber)}

            />
            <button onClick={handleUpdateOperation}>add</button>
            <button onClick={() => setTimeSpentId(null)}>Cancel</button>
        </>
    );
}

Addtimespent.propTypes = {
    operationId: PropTypes.number,
    timeSpent: PropTypes.number,
    setTasks: PropTypes.func,
    setTimeSpentId: PropTypes.func

}

export default Addtimespent;