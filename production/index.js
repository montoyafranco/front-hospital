import { getAll, postNote, deleteNote, putNote, createAppointment, deleteAppointment, modifyAppointment } from "./actions.js";
const form = document.querySelector('.reminders-form');
// Selector of appointment creator
const formAppointment = document.querySelector('.appointment-form');
const formAppointmentDelete = document.querySelector('.appointment-form-delete');
const formAppointmentUpdate = document.querySelector('.appointment-form-update');
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
    deleteButton.addEventListener('click', () => handleDelete(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'edit';
    editButton.addEventListener('click', () => hanldeEdit(note));
    div.append(h3, h2, reminderP, dateP, deleteButton, editButton);
    notesContainer.append(div);
}
// logica para crear el appopitnment y recibir los datos 
formAppointment === null || formAppointment === void 0 ? void 0 : formAppointment.addEventListener('submit', (e) => handleSubmitAppointment(e));
//
formAppointmentDelete === null || formAppointmentDelete === void 0 ? void 0 : formAppointmentDelete.addEventListener('submit', (e) => handleSubmitAppointmentDelete(e));
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
formAppointmentUpdate === null || formAppointmentUpdate === void 0 ? void 0 : formAppointmentUpdate.addEventListener('submit', (e) => handleSubmitAppointmentUpdate(e));
function handleSubmitAppointmentUpdate(e) {
    e.preventDefault();
    const id = document.querySelector('.id-input-modify-appointment');
    const dateAppointments = document.querySelector('.date-input-appointment-modify');
    modifyAppointment(id.value, dateAppointments.value);
}
function handleSubmitAppointment(e) {
    e.preventDefault();
    const name = document.querySelector('.name-input');
    const age = document.querySelector('.age-input');
    const identification_number = document.querySelector('.identification-input');
    const dateAppointments = document.querySelector('.date-input');
    const fkSpecialityId = document.querySelector('.speciality-input');
    console.log(name.value, age.value, identification_number.value, dateAppointments.value, fkSpecialityId.value);
    createAppointment({
        "name": name.value,
        "age": age.value,
        "identification_number": identification_number.value,
        "dateAppointments": dateAppointments.value,
        "fkSpecialityId": fkSpecialityId.value
    });
}
function handleSubmitAppointmentDelete(e) {
    const id = document.querySelector('.id-input-deleted-appointment');
    deleteAppointment({ "id": id.value });
}
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
function handleDelete(div) {
    const id = div.classList[1].split('-')[1];
    console.log("soy id", id);
    const idObjetc = id;
    console.log("soy el obejto", idObjetc);
    deleteNote({ "id": idObjetc }).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter((note) => note.id !== parseInt(id));
            state = newSate;
        }
    });
}
function hanldeEdit(note) {
    const titleInput = document.querySelector('.title-input');
    const reminderInput = document.querySelector('.reminder-input');
    const submitButton = document.querySelector('.reminders-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(note, titleInput, reminderInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    titleInput.value = note.title;
    reminderInput.value = note.reminder;
}
function executeEdition(note, title, reminder) {
    const date = new Date();
    date.setHours(date.getHours() - 5);
    const noteEdited = {
        id: note.id,
        title: title.value,
        reminder: reminder.value,
    };
    putNote(note.id, title.value, reminder.value).then(response => {
        if (response.status === 200) {
            const newState = state.map((note) => note.id === noteEdited.id ? noteEdited : note);
            state = newState;
            const h2Title = document.querySelector(`.single-note-title-${note.id}`);
            h2Title.innerText = noteEdited.title;
            const pReminder = document.querySelector(`.single-note-reminder-${note.id}`);
            pReminder.innerText = noteEdited.reminder;
            const pDate = document.querySelector(`.single-note-date-${note.id}`);
            pDate.innerText = noteEdited.date;
            title.value = '';
            reminder.value = '';
            const submitButton = document.querySelector('.reminders-form-button');
            submitButton.classList.remove('display_none');
            const editButton = document.querySelector('.form-edit-button');
            editButton.remove();
        }
    });
}
