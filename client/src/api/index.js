import axios from "axios";
export const BASE_URL = "http://localhost:5078/";
export const ENDPOINTS = {
  participant: "Participant",
  question: "Question",
  getAnswers: "Question/getAnswers",
};
export const CreateAPIEndPoint = (endPoint) => {
  let url = BASE_URL + "api/" + endPoint + "/";
  return {
    fetch: async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const result = await response.json();
      return result;
    },
    fetchById: (id) => axios.fetch(url + id),
    post: async (newRecord) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          endPoint == ENDPOINTS.participant ? { ...newRecord } : [...newRecord]
        ),
      });
      const result = await response.json();
      //console.log(result);
      return result;
    },
    put: async (id, updateRecord) => {
      const response = await fetch(url + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...updateRecord }),
      });
    },
    delete: (id) => axios.delete(url + id),
  };
};
