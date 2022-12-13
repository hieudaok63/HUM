import { atHumInstance } from "./Api";

export const availabilityService = {
    async getProject(projectId: string) {
        const { data: response } = await atHumInstance().get(`/dev/projects/${projectId}/svgs`);
        return response.data;
    }
}