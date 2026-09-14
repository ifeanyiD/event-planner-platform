import API from "./axios";


export const authRefresher = API.get("/api/auth/refresh")

//EVENTS
export const getEvents = () => API.get("/api/public/events");
//CONTACT
export const sendMessage =  (data) => API.post("/api/messages", data);

// export const getMessages = () => API.get("/messages");
// export const deleteMessage = (msg) => API.delete(`/messages/${msg._id}`);
// export const markAsRead = (msg) => API.put(`/messages/${msg._id}/read`);


//Events
