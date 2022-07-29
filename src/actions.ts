// import { noteI } from "./index";

export async function getAll() {
  const response:Response = await fetch('http://localhost:8081/api/')

  const data = await response.json()
  console.log(data)

  return data
} 

export async function postNote(note:any){
  console.log(note)
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

export async function deleteNote(id:any){
  console.log(id)
  const response:Response = await fetch("http://localhost:8081/api/delete/speciality", 
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json' 
    },
    
    body: JSON.stringify(id)
  })

  return response;
}

export async function putNote(id:any, name:any,physician_in_charge :any){
  console.log(id)
  const response:Response = await fetch(`http://localhost:8081/api/update/${id}?name=${name}&physician_in_charge=${physician_in_charge}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
    },
    
  })

  return response;
}
export async function createAppointment(bodyAppointment : any){
  const response:Response = await fetch('http://localhost:8081/api/create/appointment', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(bodyAppointment)
  })

  return response;
}
export async function deleteAppointment(id:any){
  console.log(id)
  const response:Response = await fetch("http://localhost:8081/api/delete/appointment", 
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json' 
    },
    
    body: JSON.stringify(id)
  })

  return response;
}


