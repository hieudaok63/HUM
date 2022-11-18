import axios from "axios";

export const atHumInstance = () => axios.create({
    baseURL: "https://us-central1-avria-production.cloudfunctions.net/showroom_api_prod/v1",
});

export const laHausInstance = () => axios.create({
    baseURL: "https://microservices.staging.lahaus.com/api/pcp/v2/residential-complex",
    headers: {
        "X-API-KEY": "d49bbbeb-cd5e-4529-b492-2e7218d443c1"
    }
});

