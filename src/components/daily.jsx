import {Container, Grid} from "@mui/material";
import React from "react";

export default function Daily() {


    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            value={title}
                            type="text"
                            id="title"
                            name="title"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea
                            value={description}
                            id="desc"
                            name="desc"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <button type="submit">Add</button>
                </form>
                <br />

                <section>
                    {tasks.map((task) => (
                        <div key={task.id}>
                            <b>{task.title}</b> - <span>{task.description}</span>
                            {operationId === task.id ? (
                                <AddOperation
                                    setOperationId={setOperationId}
                                    taskId={task.id}
                                    setTasks={setTasks}
                                />
                            ) : (
                                <>
                                    {task.status === "open" && (
                                        <button
                                            onClick={() => setOperationId(task.id)}
                                        >
                                            Add operation
                                        </button>
                                    )}
                                </>
                            )}
                            {task.status === "open" && (
                                <button onClick={handleFinishTask(task.id)}>
                                    Finish
                                </button>
                            )}
                            <button onClick={handleDeleteTask} data-id={task.id}>
                                Delete
                            </button>
                            <div>
                                {task.operations &&
                                    task.operations.map((operation) => (
                                        <div key={operation.id}>
                                            <span>{operation.description}: </span>
                                            {operation.timeSpent !== 0 && (
                                                <b>
                                                    {~~(operation.timeSpent / 60)}h{" "}
                                                    {operation.timeSpent % 60}m
                                                </b>
                                            )}

                                            {operation.id === timeSpentId ? (
                                                <AddTimeSpent
                                                    setTasks={setTasks}
                                                    operationId={operation.id}
                                                    timeSpent={operation.timeSpent}
                                                    setTimeSpentId={setTimeSpentId}
                                                />
                                            ) : (
                                                <>
                                                    {task.status === "open" && (
                                                        <button
                                                            onClick={() =>
                                                                setTimeSpentId(
                                                                    operation.id
                                                                )
                                                            }
                                                        >
                                                            Add Spent Time
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                            {task.status === "open" && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOperation(
                                                            operation.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </section>
                </Grid>
                </Grid>
            </Container>
        </>
    )
}