import { instance } from "./Api";

export const availabilityService = {
    async getAvailability(builderId: string, projectId: string) {
        var response = await instance().get(`/es/builders/${builderId}/projects/${projectId}/360s`);
        return response.data;
    },
}