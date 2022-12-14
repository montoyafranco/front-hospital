var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const response = yield fetch("http://localhost:8081/api/delete/appointment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        });
        return response;
    });
}
export function modifyAppointment(id, dateAppointments) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const response = yield fetch(`http://localhost:8081/api/update/appointment/${id}?dateAppointments=${dateAppointments}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    });
}
export function createAppointment(bodyAppointment) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:8081/api/create/appointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyAppointment),
        });
        return response;
    });
}
