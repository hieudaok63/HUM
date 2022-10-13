import axios from "axios";

export const instance = () => axios.create({
    baseURL: "https://us-central1-avria-production.cloudfunctions.net/showroom_api_prod/v1",
});

