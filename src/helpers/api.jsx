export async function getAllTasks(social) {
    const response = await fetch(`http://localhost:3000/${social}`)
    return response.json()
}

export async function sendTaskData(social, data) {
    const response = await fetch(`http://localhost:3000/${social}`,
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