    TODO USTAWIC MEDIA QUERY
) : (
    <ListItemButton onClick={() => {}} sx={{display: "flex", justifyContent: "space-between"}}>
        <Grid sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {task.status === 'open' ? (
                <ListItemIcon>
                    <RadioButtonUncheckedRoundedIcon/>
                </ListItemIcon>
            ) : (
                <ListItemIcon>
                    <TaskAltRoundedIcon/>
                </ListItemIcon>
            )}
            <ListItemText primary={task.title} secondary={task.description}/>
        </Grid>
        <ButtonGroup variant="text" aria-label="text button group">

            {task.status === "open" && (
                <>
                    <Button onClick={() => handleEditTask(task.id)} data-id={task.id}>
                        <ListItemIcon><EditRoundedIcon/>Edit</ListItemIcon>
                    </Button>
                    <Button onClick={handleFinishTask(task.id)}>
                        <ListItemIcon><DoneRoundedIcon/>Done</ListItemIcon>
                    </Button>
                </>
            )}
            {task.status === "closed" && (
                <Button onClick={handleUndoFinishTask(task.id)}>
                    <ListItemIcon><ReplayRoundedIcon/>Back</ListItemIcon>
                </Button>
            )}
            <Button onClick={() => handleDelete(task.id)} data-id={task.id}>
                <ListItemIcon><DeleteForeverRoundedIcon/></ListItemIcon>
            </Button>
        </ButtonGroup>
    </ListItemButton>
)}