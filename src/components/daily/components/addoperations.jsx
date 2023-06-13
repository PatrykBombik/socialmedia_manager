import {useState} from "react";
import {sendDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";
import {ListItemIcon, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded.js";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function  AddOperations({taskId, setOperationId, setTasks}) {
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
                <TextField
                    id="outlined-basic"
                    label="Dodaj zadanie"
                    variant="outlined"
                    type="text"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Opis zadania"
                />
                <Button onClick={handleAddOperation}>
                    <ListItemIcon><AddRoundedIcon/>Dodaj</ListItemIcon>
                </Button>
                <Button onClick={() => setOperationId(null)}>
                    <ListItemIcon><CancelRoundedIcon/>Anuluj</ListItemIcon>
                </Button>
            </>
        );
    }


AddOperations.propTypes = {
    taskId: PropTypes.number,
    setOperationId: PropTypes.func,
    setTasks: PropTypes.func
};
export default AddOperations