import {
  getAll,
  postCard,
  deleteCard,
  putCard,
  
} from "./actions.js";
import{createAppointment,
  deleteAppointment,
  modifyAppointment,}from "./actions-appointment.js"

const form: HTMLFormElement | null = document.querySelector(".medical-form");

// Selector of appointment creator
const formAppointment: HTMLFormElement | null =
  document.querySelector(".appointment-form");

const formAppointmentDelete: HTMLFormElement | null = document.querySelector(
  ".appointment-form-delete"
);

const formAppointmentUpdate: HTMLFormElement | null = document.querySelector(
  ".appointment-form-update"
);
let persist: any = [];

getAll().then((cards) => {  persist = cards;  recreateCards(cards);});


function recreateCards(cards: []) {  cards.forEach((cards) => createColoring(cards));
}
function createColoring(cards: any) {
  const cardsContainer = document.querySelector(
    ".cards-container"
  ) as HTMLDivElement;

  const div: HTMLDivElement = document.createElement("div");
  div.className = "single-todo-container";
  div.classList.add(`cards-${cards.id}`);

  const h3: HTMLHeadElement = document.createElement("h3");
  h3.className = `single-cards-title-${cards.id}`;
  h3.innerText = `ID Specialist: ${cards.id.toString()}
  Specialist : ${cards.name}
  Physician in charge : ${cards.physician_in_charge}

   `;

  const listAppoint: HTMLParagraphElement = document.createElement("p");

  listAppoint.className = `single-cards-date-${cards.id} appointments`;

  listAppoint.innerText = JSON.stringify(cards.appointmentList, null, "\t");

  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.className = "single-cards-delete-button";
  deleteButton.innerText = "Delete Speciality";
  deleteButton.addEventListener("click", () => deteleApply(div));

  const editButton: HTMLButtonElement = document.createElement("button");
  editButton.className = "single-cards-edit-button";
  editButton.innerText = "Change Medical Speciality";
  editButton.addEventListener("click", () => editApply(cards));

  div.append(h3, deleteButton, editButton, listAppoint);
  cardsContainer.append(div);
}
// logica para crear el appopitnment y recibir los datos
formAppointment?.addEventListener("submit", (e) => handleSubmitAppointment(e));
//
formAppointmentDelete?.addEventListener("submit", (e) =>
  handleSubmitAppointmentDelete(e)
);

form?.addEventListener("submit", (e) => handleSubmit(e));

formAppointmentUpdate?.addEventListener("submit", (e) =>
  handleSubmitAppointmentUpdate(e)
);

function handleSubmitAppointmentUpdate(e: SubmitEvent): any {
  const id = document.querySelector(
    ".id-input-modify-appointment"
  ) as HTMLInputElement;
  const dateAppointments = document.querySelector(
    ".date-input-appointment-modify"
  ) as HTMLInputElement;
  modifyAppointment(id.value, dateAppointments.value);
}

function handleSubmitAppointment(e: SubmitEvent): any {
  e.preventDefault();
  const name = document.querySelector(".name-input") as HTMLInputElement;
  const age = document.querySelector(".age-input") as HTMLInputElement;
  const identification_number = document.querySelector(
    ".identification-input"
  ) as HTMLInputElement;
  const dateAppointments = document.querySelector(
    ".date-input"
  ) as HTMLInputElement;
  const fkSpecialityId = document.querySelector(
    ".speciality-input"
  ) as HTMLInputElement;
  
  createAppointment({
    name: name.value,
    age: age.value,
    identification_number: identification_number.value,
    dateAppointments: dateAppointments.value,
    fkSpecialityId: fkSpecialityId.value,
  });
  location.reload();
}

function handleSubmitAppointmentDelete(e: SubmitEvent): any {
  const id = document.querySelector(
    ".id-input-deleted-appointment"
  ) as HTMLInputElement;
  deleteAppointment({ id: id.value });
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const titleInput = document.querySelector(".title-input") as HTMLInputElement;
  const specialInput = document.querySelector(
    ".special-input"
  ) as HTMLInputElement;
  
    const newCard = {
      name: titleInput.value,
      physician_in_charge: specialInput.value,
    };
    postCard(newCard)
  
  location.reload();
}
function deteleApply(div: HTMLDivElement) {
  const id: string = div.classList[1].split("-")[1];

  console.log("soy id", id);
  const idObjetc: any = id;
  console.log("soy el obejto", idObjetc);
  deleteCard({ id: idObjetc }).then((response) => {
    if (response.status === 200) {
      div.remove();
      const newPersist = persist.filter(
        (cards: { id: number }) => cards.id !== parseInt(id)
      );
      persist = newPersist;
    }
  });
}
function editApply(cards: any) {
  
  
  const titleInput = document.querySelector(".title-input") as HTMLInputElement;
  const specialInput = document.querySelector(
    ".special-input"
  ) as HTMLInputElement;
  const submitButton = document.querySelector(
    ".medical-form-button"
  ) as HTMLButtonElement;
  submitButton.classList.add("display_none");

  const editButton: HTMLButtonElement = document.createElement("button");
  editButton.className = "form-edit-button";
  editButton.innerText = "Submit New Data";
  editButton.addEventListener("click", () =>
    executeEdition(cards, titleInput, specialInput)
  );

  const formContainer = document.querySelector(".form-container");
  formContainer?.append(editButton);

  titleInput.value = cards.title;
  specialInput.value = cards.special;
}
function executeEdition(
  cards: any,
  title: HTMLInputElement,
  special: HTMLInputElement
) {
  
  putCard(cards.id, title.value, special.value).then((response) => {
    if (response.status === 200) {
      location.reload();
    }
  });
}
