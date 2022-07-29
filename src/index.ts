import { getAll, postNote, deleteNote, putNote,createAppointment } from "./actions.js";

const form: HTMLFormElement |null = 
document.querySelector('.reminders-form');


// export interface noteI {

 
//   id: number|null  ;
//   name: string;
//   physician_in_charge: string;
//   appointmentList: []|null ;
// }

// Selector of appointment creator
const formAppointment : HTMLFormElement | null = document.querySelector('.appointment-form')

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
  div.className = 'single-note-container'
  div.classList.add(`note-${note.id}`)

  const h3:HTMLHeadElement = document.createElement('h3');
  h3.className = `single-note-title-${note.id}`
  h3.innerText = note.id.toString()
  
  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = `single-note-title-${note.id}`
  h2.innerText = note.name
  
  const reminderP:HTMLParagraphElement = document.createElement('p')
  reminderP.className = `single-note-reminder-${note.id}`
  reminderP.innerText = note.physician_in_charge
  
  const dateP:HTMLParagraphElement = document.createElement('p')
  dateP.className = `single-note-date-${note.id}`
  dateP.innerText = JSON.stringify(note.appointmentList,null, '\t')
  

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = 'single-note-delete-button'
  deleteButton.innerText = 'X'
  deleteButton.addEventListener('click', ()=> handleDelete(div))

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-note-edit-button'
  editButton.innerText = 'edit'
   editButton.addEventListener('click', ()=> hanldeEdit(note))

  div.append(h3 ,h2, reminderP, dateP, deleteButton, editButton)
  notesContainer.append(div)
}
// logica para crear el appopitnment y recibir los datos 
formAppointment?.addEventListener('submit',(e) => handleSubmitAppointment(e))

function handleSubmitAppointment(e: SubmitEvent): any {
  throw new Error("Function not implemented.");
}

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  if(titleInput.value&&reminderInput.value){
    const date = new Date()
    date.setHours(date.getHours() - 5)

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
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', () => executeEdition(note, titleInput, reminderInput))

  const formContainer = document.querySelector('.form-container');
  formContainer?.append(editButton)
  
  titleInput.value = note.title
  reminderInput.value = note.reminder;
}
function executeEdition(note:any, title:HTMLInputElement, reminder:HTMLInputElement){

  const date = new Date();
  date.setHours(date.getHours() - 5)

  const noteEdited:any= {
    id:note.id,
    title:title.value,
    reminder:reminder.value,
    
  }

  putNote(note.id ,title.value ,reminder.value).then(response => {
    if(response.status === 200){
      const newState:any= state.map((note: { id: any; }) => note.id === noteEdited.id?noteEdited:note)
      state = newState;
    
      const h2Title = document.querySelector(`.single-note-title-${note.id}`) as HTMLHeadingElement
      h2Title.innerText = noteEdited.title
      const pReminder = document.querySelector(`.single-note-reminder-${note.id}`) as HTMLParagraphElement
      pReminder.innerText = noteEdited.reminder
    
      const pDate = document.querySelector(`.single-note-date-${note.id}`) as HTMLParagraphElement
      pDate.innerText = noteEdited.date
      
      title.value = ''
      reminder.value = ''
      const submitButton = document.querySelector('.reminders-form-button') as HTMLButtonElement
      submitButton.classList.remove('display_none')
    
      const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement
    
      editButton.remove()
    }
  })

  

}


