"console"
export async function getAllNotes() {
    const response:Response = await fetch('http://localhost:8081/api/')
  
    const data:[] = await response.json()
    console.log(data)
  
    return data
  } 

  getAllNotes()
  