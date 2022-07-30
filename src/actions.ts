// import { cardsI } from "./index";

export async function getAll() {
  const response: Response = await fetch("http://localhost:8081/api/");
  const data = await response.json();
  console.log(data);

  return data;
}

export async function postCard(cards: any) {
  console.log(cards);
    const response: Response = await fetch(    "http://localhost:8081/api/create/speciality",  {      method: "POST",
          headers: { "Content-Type": "application/json" },      body: JSON.stringify(cards),    }
  );
  return response;
}

export async function deleteCard(id: any) {
  console.log(id);
  const response: Response = await fetch(    "http://localhost:8081/api/delete/speciality",   {      method: "DELETE",
      headers: {
        "Content-Type": "application/json",      },
      body: JSON.stringify(id),
    }
  );
  return response;
}

export async function putCard(id: any, name: any, physician_in_charge: any) {
  console.log(id);
  const response: Response = await fetch(
    `http://localhost:8081/api/update/${id}?name=${name}&physician_in_charge=${physician_in_charge}`,   {     method: "PUT",      headers: {
              "Content-Type": "application/json",
      },
    }
  );
  return response;
}

