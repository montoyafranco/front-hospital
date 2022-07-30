import { getAll, postCard, deleteCard, putCard, createAppointment, deleteAppointment, modifyAppointment } from "./actions.js";
const form = document.querySelector('.medical-form');
// Selector of appointment creator
const formAppointment = document.querySelector('.appointment-form');
const formAppointmentDelete = document.querySelector('.appointment-form-delete');
const formAppointmentUpdate = document.querySelector('.appointment-form-update');
getAll().then(cards => {
    state = cards;
    recreateCards(cards);
});
let state = [];
function recreateCards(cards) {
    cards.forEach(cards => createColoring(cards));
}
function createColoring(cards) {
    const cardsContainer = document.querySelector('.cards-container');
    const div = document.createElement('div');
    div.className = 'single-todo-container';
    div.classList.add(`cards-${cards.id}`);
    const h3 = document.createElement('h3');
    h3.className = `single-cards-title-${cards.id}`;
    h3.innerText = `ID Specialist: ${cards.id.toString()}
  Specialist : ${cards.name}
  Physician in charge : ${cards.physician_in_charge}

   `;
    const dateP = document.createElement('p');
    dateP.className = `single-cards-date-${cards.id} appointments`;
    dateP.innerText = JSON.stringify(cards.appointmentList, null, '\t');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-cards-delete-button';
    deleteButton.innerText = 'Delete Speciality';
    deleteButton.addEventListener('click', () => handleDelete(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-cards-edit-button';
    editButton.innerText = 'Change Medical Speciality';
    editButton.addEventListener('click', () => hanldeEdit(cards));
    div.append(h3, deleteButton, editButton, dateP);
    cardsContainer.append(div);
}
// logica para crear el appopitnment y recibir los datos 
formAppointment === null || formAppointment === void 0 ? void 0 : formAppointment.addEventListener('submit', (e) => handleSubmitAppointment(e));
//
formAppointmentDelete === null || formAppointmentDelete === void 0 ? void 0 : formAppointmentDelete.addEventListener('submit', (e) => handleSubmitAppointmentDelete(e));
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
formAppointmentUpdate === null || formAppointmentUpdate === void 0 ? void 0 : formAppointmentUpdate.addEventListener('submit', (e) => handleSubmitAppointmentUpdate(e));
function handleSubmitAppointmentUpdate(e) {
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
    location.reload();
}
function handleSubmitAppointmentDelete(e) {
    const id = document.querySelector('.id-input-deleted-appointment');
    deleteAppointment({ "id": id.value });
}
function handleSubmit(e) {
    e.preventDefault();
    const titleInput = document.querySelector('.title-input');
    const specialInput = document.querySelector('.special-input');
    if (titleInput.value && specialInput.value) {
        const newCard = {
            name: titleInput.value,
            physician_in_charge: specialInput.value,
        };
        postCard(newCard).then(response => {
            if (response.status === 200) {
                state.push(newCard);
                createColoring(newCard);
                titleInput.value = '';
                specialInput.value = '';
            }
        });
    }
    location.reload();
}
function handleDelete(div) {
    const id = div.classList[1].split('-')[1];
    console.log("soy id", id);
    const idObjetc = id;
    console.log("soy el obejto", idObjetc);
    deleteCard({ "id": idObjetc }).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter((cards) => cards.id !== parseInt(id));
            state = newSate;
        }
    });
}
function hanldeEdit(cards) {
    const titleInput = document.querySelector('.title-input');
    const specialInput = document.querySelector('.special-input');
    const submitButton = document.querySelector('.medical-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Submit New Data';
    editButton.addEventListener('click', () => executeEdition(cards, titleInput, specialInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    titleInput.value = cards.title;
    specialInput.value = cards.special;
}
function executeEdition(cards, title, special) {
    putCard(cards.id, title.value, special.value).then(response => {
        if (response.status === 200) {
            location.reload();
        }
    });
}
