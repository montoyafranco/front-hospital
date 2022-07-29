import { getAll, postNote } from "./actions.js";
const form = document.querySelector('.reminders-form');
// export interface noteI {
//   id: number|null  ;
//   name: string;
//   physician_in_charge: string;
//   appointmentList: []|null ;
// }
getAll().then(notes => {
    state = notes;
    recreateNotes(notes);
});
let state = [];
function recreateNotes(notes) {
    notes.forEach(note => createReminder(note));
}
function createReminder(note) {
    const notesContainer = document.querySelector('.notes-container');
    const div = document.createElement('div');
    div.className = 'single-note-container';
    div.classList.add(`note-${note.id}`);
    const h3 = document.createElement('h3');
    h3.className = `single-note-title-${note.id}`;
    h3.innerText = note.id.toString();
    const h2 = document.createElement('h2');
    h2.className = `single-note-title-${note.id}`;
    h2.innerText = note.name;
    const reminderP = document.createElement('p');
    reminderP.className = `single-note-reminder-${note.id}`;
    reminderP.innerText = note.physician_in_charge;
    const dateP = document.createElement('p');
    dateP.className = `single-note-date-${note.id}`;
    dateP.innerText = JSON.stringify(note.appointmentList, null, '\t');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-note-delete-button';
    deleteButton.innerText = 'X';
    // deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'edit';
    // editButton.addEventListener('click', ()=> hanldeEdit(note))
    div.append(h3, h2, reminderP, dateP, deleteButton, editButton);
    notesContainer.append(div);
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const titleInput = document.querySelector('.title-input');
    const reminderInput = document.querySelector('.reminder-input');
    if (titleInput.value && reminderInput.value) {
        const date = new Date();
        date.setHours(date.getHours() - 5);
        const newNote = {
            name: titleInput.value,
            physician_in_charge: reminderInput.value,
        };
        postNote(newNote).then(response => {
            if (response.status === 200) {
                state.push(newNote);
                createReminder(newNote);
                titleInput.value = '';
                reminderInput.value = '';
            }
        });
    }
}
