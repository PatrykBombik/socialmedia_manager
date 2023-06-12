export async function getAllTasks(social) {
    const response = await fetch(`http://localhost:3000/${social}`)
    return response.json()
}

export async function sendDataAPI(data, endpoint) {
    const response = await fetch(`http://localhost:3000/${endpoint}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
    )
    return response.json()
}

// TODO MAKE DATABASE BETTER
// export async function sendOperationsData(social, taskId, data) {
//     const response = await fetch(`http://localhost:3000/${social}/${taskId}/operations`,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             body: JSON.stringify(data)
//         }
//     )
//     return response.json()
// }

export async function deleteTaskAPI(social, id) {
    const response = await fetch(`http://localhost:3000/${social}/${id}`,
        { method: 'DELETE'})
    return response.json();
}