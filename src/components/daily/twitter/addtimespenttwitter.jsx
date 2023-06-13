import {useState} from "react";
import {updateDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";

function Addtimespenttwitter({operationId, timeSpent, setTasks, setTimeSpentId}) {
    const [value, setValue] = useState(0);


    async function handleUpdateOperation() {
        if (value > 0) {
            await updateDataAPI(
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
                    }),
                }))
            );
            setTimeSpentId(null);
        }
    }

        return (
            <>
                {value < 0 && <b>Wartość musi być dodatnia</b>}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.valueAsNumber)}
                    min="1"

                />
                <button onClick={handleUpdateOperation}>add</button>
                <button onClick={() => setTimeSpentId(null)}>Cancel</button>
            </>
        );
    }

    Addtimespenttwitter.propTypes = {
        operationId: PropTypes.number,
        timeSpent: PropTypes.number,
        setTasks: PropTypes.func,
        setTimeSpentId: PropTypes.func

    }

    export default Addtimespenttwitter;