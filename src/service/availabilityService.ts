import { atHumInstance, laHausInstance } from "./Api";

export const availabilityService = {
    async getProject(projectId: string) {
        const {data:response} = await atHumInstance().get(`/projects/${projectId}/svgs`);
        return response.data;
    },
    async getProperty(id:string){
        const response = await laHausInstance().get(`/${id}`);
        return response;
    },
    async getTypologies(id:string){
        const {data} = await laHausInstance().get(`/${id}/typologies`);
        return data;
    }
}