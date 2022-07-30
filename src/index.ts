import { getAll, postNote, deleteNote, putNote,createAppointment,deleteAppointment, modifyAppointment } from "./actions.js";

const form: HTMLFormElement |null = document.querySelector('.reminders-form');

// Selector of appointment creator
const formAppointment : HTMLFormElement | null = document.querySelector('.appointment-form')

const formAppointmentDelete : HTMLFormElement | null = document.querySelector('.appointment-form-delete')

const formAppointmentUpdate : HTMLFormElement | null = document.querySelector('.appointment-form-update')

getAll().then(notes => {
  state = notes
  recreateNotes(notes);
})
let state: any = []

function recreateNotes(notes:[]){
  notes.forEach(note => createReminder(note))
}
function createReminder(note:any){
  const notesContainer = document.querySelector('.notes-container') as HTMLDivElement

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'single-todo-container'
  div.classList.add(`note-${note.id}`)

  const h3:HTMLHeadElement = document.createElement('h3');
  h3.className = `single-note-title-${note.id}`
  h3.innerText =`ID Specialist: ${note.id.toString()}
  Specialist : ${note.name}
  Physician in charge : ${note.physician_in_charge}

   ` 

  
  const dateP:HTMLParagraphElement = document.createElement('p')

  


  dateP.className = `single-note-date-${note.id} appointments`

  dateP.innerText = JSON.stringify(note.appointmentList,null, '\t')
  
  

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = 'single-note-delete-button'
  deleteButton.innerText = 'Delete Speciality'
  deleteButton.addEventListener('click', ()=> handleDelete(div))

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-note-edit-button'
  editButton.innerText = 'Change Medical Speciality'
   editButton.addEventListener('click', ()=> hanldeEdit(note))

  div.append(h3 ,deleteButton,editButton, dateP )
  notesContainer.append(div)
}
// logica para crear el appopitnment y recibir los datos 
formAppointment?.addEventListener('submit',(e) => handleSubmitAppointment(e))
//
formAppointmentDelete?.addEventListener('submit',(e) => handleSubmitAppointmentDelete(e))

form?.addEventListener('submit', (e) => handleSubmit(e))

formAppointmentUpdate?.addEventListener('submit',(e) => handleSubmitAppointmentUpdate(e))

function handleSubmitAppointmentUpdate(e: SubmitEvent): any {
 
  const id = document.querySelector('.id-input-modify-appointment') as HTMLInputElement;
  const dateAppointments = document.querySelector('.date-input-appointment-modify') as HTMLInputElement;
  modifyAppointment(id.value , dateAppointments.value)


}


function handleSubmitAppointment(e: SubmitEvent): any {
  e.preventDefault()
  const name = document.querySelector('.name-input') as HTMLInputElement;
  const age = document.querySelector('.age-input') as HTMLInputElement;
  const identification_number= document.querySelector('.identification-input') as HTMLInputElement;
  const dateAppointments = document.querySelector('.date-input') as HTMLInputElement;
  const fkSpecialityId = document.querySelector('.speciality-input') as HTMLInputElement;
  console.log(name.value,age.value,identification_number.value,dateAppointments.value,fkSpecialityId.value)
  createAppointment({    
    "name": name.value,
    "age": age.value,
    "identification_number":identification_number.value,
    "dateAppointments": dateAppointments.value,    
    "fkSpecialityId": fkSpecialityId.value
  }
  ) 
}




function handleSubmitAppointmentDelete(e: SubmitEvent): any {
  const id= document.querySelector('.id-input-deleted-appointment') as HTMLInputElement;
  deleteAppointment({"id": id.value})
}

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  if(titleInput.value&&reminderInput.value){    
    const newNote = {     
      
      name: titleInput.value,
      physician_in_charge: reminderInput.value,       
    }

    postNote(newNote).then(
      response => {
        if(response.status === 200){
          state.push(newNote)

          createReminder(newNote);  
          titleInput.value = '';
          reminderInput.value = '';
        }
      }
    )
    
  }
}
function handleDelete(div:HTMLDivElement){
  const id:string = div.classList[1].split('-')[1]

  console.log("soy id" ,id)
  const idObjetc: any = id  

  console.log("soy el obejto", idObjetc)
  deleteNote({"id" :idObjetc}).then(response => {
    if(response.status === 200){
      div.remove()
      const newSate = state.filter((note: { id: number; }) => note.id !== parseInt(id))
      state = newSate
    }
  })
}
function hanldeEdit(note:any){
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  const submitButton = document.querySelector('.reminders-form-button') as HTMLButtonElement
  submitButton.classList.add('display_none')

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'form-edit-button'
  editButton.innerText = 'Submit New Data';
  editButton.addEventListener('click', () => executeEdition(note, titleInput, reminderInput))

  const formContainer = document.querySelector('.form-container');
  formContainer?.append(editButton)
  
  titleInput.value = note.title
  reminderInput.value = note.reminder;
}
function executeEdition(note:any, title:HTMLInputElement, reminder:HTMLInputElement){
  

  

  putNote(note.id ,title.value ,reminder.value).then(response => {
    if(response.status === 200){  
      location. reload()       
    }
  })

  

}




