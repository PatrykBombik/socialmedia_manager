import {useState} from "react";
import {sendDataAPI} from "../../helpers/api.jsx";

function  AddOperations({taskId}) {
    const [value, setValue] = useState('');

    async function handleAddTwitterOperation() {
        const data = await sendDataAPI({
                description: value,
                timeSpent: '0h 0m',
                addedDate: new Date(),
                taskId
            }, 'operations');
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
        </>
    );
}

export default AddOperations