const prefixHOST = "http://localhost:8080";
const prefixMQTT = "/api/mqtt";
const prefixMETEO = "/api/openMeteo";

export const mqttService = {
    getTemperature: async() => {
        const response = await fetch(prefixHOST + prefixMQTT + "/temperature");
        return response.json();
    },
    getHumidity: async() => {
        const response = await fetch(prefixHOST + prefixMQTT + "/humidity");
        return response.json();
    },
    getMotion: async() => {
        const response = await fetch(prefixHOST + prefixMQTT + "/motion");
        return response.json();
    }
}

export const meteoService = {
    getCurrentTemperature: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/currentTemperature");
        return response.json();
    },
    getTemperatureForNext5Days: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/temperatureForNext5Days");
        return response.json();
    },
    getRainProbabilityForNext5Days: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/rainProbabilityForNext5Days");
        return response.json();
    },
    getAllDates: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/getAllDates");
        return response.json();
    },
    getPrecipitationOfAllDates: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/getPrecipitationOfAllDates");
        return response.json();
    },
    getWindSpeedNext5Days: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/getWindSpeedNext5Days");
        return response.json();
    },
    getHumidityNext5Days: async() => {
        const response = await fetch(prefixHOST + prefixMETEO + "/getHumidityNext5Days");
        return response.json();
    }


}

export async function getCurrentTemperature() {
    const response = await fetch(prefixHOST + prefixMETEO + "/currentTemperature");
    return response.json();
}

export async function getTemperatureForNext5Days() {
    const response = await fetch(prefixHOST + prefixMETEO + "/temperatureForNext5Days");
    return response.json();
}

export async function getRainProbabilityForNext5Days() {
    const response = await fetch(prefixHOST + prefixMETEO + "/rainProbabilityForNext5Days");
    return response.json();
}

export async function getAllDates() {
    const response = await fetch(prefixHOST + prefixMETEO + "/getAllDates");
    return response.json();
}

export async function getPrecipitationOfAllDates() {
    const response = await fetch(prefixHOST + prefixMETEO + "/getPrecipitationOfAllDates");
    return response.json();
}

export async function getWindSpeedNext5Days() {
    const response = await fetch(prefixHOST + prefixMETEO + "/getWindSpeedNext5Days");
    return response.json();
}

export async function getHumidityNext5Days() {
    const response = await fetch(prefixHOST + prefixMETEO + "/getHumidityNext5Days");
    return response.json();
}

