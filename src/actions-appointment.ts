export async function deleteAppointment(id: any) {
    console.log(id);
    const response: Response = await fetch(
      "http://localhost:8081/api/delete/appointment",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(id),
      }
    );
  
    return response;
  }
  export async function modifyAppointment(id: any, dateAppointments: any) {
    console.log(id);
    const response: Response = await fetch(
      `http://localhost:8081/api/update/appointment/${id}?dateAppointments=${dateAppointments}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
  export async function createAppointment(bodyAppointment: any) {
    const response: Response = await fetch(
      "http://localhost:8081/api/create/appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyAppointment),
      }
    );
  
    return response;
  }
  