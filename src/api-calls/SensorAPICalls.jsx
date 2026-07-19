export async function getTemperature() {
    const response = await fetch("http://localhost:8080/api/mqtt/temperature");
    return response.json();
}

export async function getHumidity() {
    const response = await fetch("http://localhost:8080/api/mqtt/humidity");
    return response.json();
}

export async function getMotion() {
    const response = await fetch("http://localhost:8080/api/mqtt/motion");
    return response.json();
}

export async function getCurrentTemperature() {
    const response = await fetch("http://localhost:8080/api/openMeteo/currentTemperature");
    return response.json();
}

export async function getTemperatureForNext5Days() {
    const response = await fetch("http://localhost:8080/api/openMeteo/temperatureForNext5Days");
    return response.json();
}

export async function getRainProbabilityForNext5Days() {
    const response = await fetch("http://localhost:8080/api/openMeteo/rainProbabilityForNext5Days");
    return response.json();
}

export async function getAllDates() {
    const response = await fetch("http://localhost:8080/api/openMeteo/getAllDates");
    return response.json();
}

export async function getPrecipitationOfAllDates() {
    const response = await fetch("http://localhost:8080/api/openMeteo/getPrecipitationOfAllDates");
    return response.json();
}

export async function getWindSpeedNext5Days() {
    const response = await fetch("http://localhost:8080/api/openMeteo/getWindSpeedNext5Days");
    return response.json();
}

