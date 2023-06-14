import {useState} from "react";
import {updateDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";
import {ListItemIcon, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime.js";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ButtonGroup from '@mui/material/ButtonGroup';

function Addtimespent({operationId, timeSpent, setTasks, setTimeSpentId}) {
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
                <TextField
                    id="outlined-basic"
                    label="Ile minut zajęło to zadanie?"
                    variant="outlined"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.valueAsNumber)}
                    min="1"

                />
                <ButtonGroup size="small" variant="text" aria-label="text button group">
                    <Button size="small"
                            onClick={handleUpdateOperation}
                    ><ListItemIcon sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                    ><MoreTimeIcon/></ListItemIcon></Button>
                    <Button size="small" onClick={() => setTimeSpentId(null)}>
                        <ListItemIcon
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start"
                            }}
                        ><CancelRoundedIcon/></ListItemIcon>
                    </Button>
                </ButtonGroup>
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