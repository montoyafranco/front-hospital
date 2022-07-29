// import { noteI } from "./index";

export async function getAll() {
  const response:Response = await fetch('http://localhost:8081/api/')

  const data = await response.json()
  console.log(data)

  return data
} 

export async function postNote(note:any){
  const response:Response = await fetch('http://localhost:8081/api/create/speciality', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(note)
  })

  return response;
}

export async function deleteNote(id:string){
  const response:Response = await fetch(`http://localhost:8081/api/v1/delete/note/${id}`, 
  {
    method: 'DELETE'
  })

  return response;
}

export async function putNote(note:any){
  const response:Response = await fetch('http://localhost:8081/api/v1/update/note', 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(note)
  })

  return response;
}