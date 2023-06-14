import {useState} from "react";
import {updateDataAPI} from "../../../helpers/api.jsx";
import PropTypes from "prop-types";
import {ListItemIcon, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime.js";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";

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
                <Tooltip
                    title="Ile minut zajęło to zadanie?"
                    placement="top"
                    arrow
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={() => {}}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                >
                <TextField
                    id="outlined-basic"
                    label="Minuty"
                    variant="outlined"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.valueAsNumber)}
                    inputProps={{
                        min: 0
                    }}
                    min="1"
                    sx={{
                        margin: "10px 15px"
                    }}
                />
            </Tooltip>
                <ButtonGroup
                    color="primary"
                    size="small"
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{
                        marginRight:"10px"
                    }}>
                    <Button
                        size="small"
                            onClick={handleUpdateOperation}
                    ><ListItemIcon sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    ><MoreTimeOutlinedIcon/></ListItemIcon></Button>
                    <Button
                        size="small"
                        onClick={() => setTimeSpentId(null)}>
                        <ListItemIcon
                            sx={{
                                display: "flex",
                                justifyContent: "center"
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