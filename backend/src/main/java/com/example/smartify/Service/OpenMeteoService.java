package com.example.smartify.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OpenMeteoService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final String url = "https://api.open-meteo.com/v1/forecast" +
            "?latitude=48.7107&longitude=11.4878" +
            "&hourly=temperature_2m,apparent_temperature,rain,precipitation_probability,windspeed_10m" +
            "&timezone=Europe%2FBerlin";

    private String getResponseBody() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response =
                    httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();
        } catch (Exception e) {
            return "Fehler beim auslesen des Bodys";
        }
    }

    public Double getCurrentTemperature() {
        try {
            JsonNode root = objectMapper.readTree(getResponseBody());
            JsonNode hourly = root.get("hourly");
            JsonNode times = hourly.get("time");
            JsonNode temperatures = hourly.get("temperature_2m");

            LocalDateTime now = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            String nowFormatted = now.format(formatter);

            for (int i = 0; i < times.size(); i++) {
                if (times.get(i).asText().equals(nowFormatted)) {
                    return temperatures.get(i).asDouble();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Map<String, double[]> getMinMaxTemperatureNext5Days() {
        Map<String, double[]> result = new LinkedHashMap<>();

        try {
            JsonNode root = objectMapper.readTree(getResponseBody());
            JsonNode hourly = root.get("hourly");
            JsonNode times = hourly.get("time");
            JsonNode temperatures = hourly.get("temperature_2m");

            Map<String, List<Double>> temperaturesByDay = new LinkedHashMap<>();

            //Fügt die Temperaturen jeder einzelnen Stunde eines Tages, einer Liste hinzu, wobei der Key das Datum ist.
            for (int i = 0; i < times.size(); i++) {
                String timestamp = times.get(i).asText(); // z.B. "2026-07-15T14:00"
                String date = timestamp.substring(0, 10); // "2026-07-15"
                double temp = temperatures.get(i).asDouble();

                //Erstellt einmalig für jedes Datum eine Liste, und fügt dann die Temperaturen zum jeweiligen Datum hinzu
                temperaturesByDay
                        .computeIfAbsent(date, k -> new ArrayList<>())
                        .add(temp);
            }

            //Kreiert aus der bisherigen Map, mit Temperaturen jeder Stunde von allen 6 Tage also Tag:[temperature1, temperature2, ...],
            // eine neue Map, mit den niedrigstem und höchstem Wert des jeweiligen Tages.
            int dayCount = 0;
            for (Map.Entry<String, List<Double>> entry : temperaturesByDay.entrySet()) {
                if (dayCount >= 6) break;

                List<Double> temps = entry.getValue();
                double min = Collections.min(temps);
                double max = Collections.max(temps);

                result.put("temperatures" + dayCount, new double[]{min, max});
                dayCount++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    /**
     * Holt den response body einmalig und parsed ihn.
     * Wird von allen anderen Methoden genutzt, um nicht mehrfach die API aufzurufen.
     */
    private JsonNode fetchHourlyData() {
        String responseBody = getResponseBody();
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            return root.get("hourly");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Gruppiert einen beliebigen hourly-Wert (z.B. temperature_2m, rain, windspeed_10m)
     * nach Datum. Hilfsmethode für die anderen Funktionen.
     */
    private Map<String, List<Double>> groupByDay(JsonNode hourly, String fieldName) {
        Map<String, List<Double>> byDay = new LinkedHashMap<>();

        JsonNode times = hourly.get("time");
        JsonNode values = hourly.get(fieldName);

        for (int i = 0; i < times.size(); i++) {
            String date = times.get(i).asText().substring(0, 10); // "2026-07-17"
            double value = values.get(i).asDouble();

            byDay.computeIfAbsent(date, k -> new ArrayList<>()).add(value);
        }

        return byDay;
    }

    /**
     * Begrenzt die Tage auf heute + 5 und berechnet je nach Flag
     * das Maximum oder den Durchschnitt pro Tag.
     */
    private Map<String, Double> limitToNext5Days(Map<String, List<Double>> byDay, boolean useMax) {
        Map<String, Double> result = new LinkedHashMap<>();

        int dayCount = 0;
        for (Map.Entry<String, List<Double>> entry : byDay.entrySet()) {
            if (dayCount >= 6) break; // heute + 5 Tage

            List<Double> values = entry.getValue();
            double aggregated = useMax
                    ? Collections.max(values)
                    : values.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);

            result.put("preciption" + dayCount, aggregated);
            dayCount++;
        }

        return result;
    }

    /**
     * Liefert die Daten (heute + nächste 5 Tage) als Liste im Format "yyyy-MM-dd".
     */
    public List<String> getDatesNext5Days() {
        JsonNode hourly = fetchHourlyData();
        if (hourly == null) return Collections.emptyList();

        JsonNode times = hourly.get("time");
        LinkedHashSet<String> dates = new LinkedHashSet<>(); // erhält Reihenfolge, keine Duplikate

        for (int i = 0; i < times.size(); i++) {
            dates.add(times.get(i).asText().substring(0, 10));
        }

        return dates.stream().limit(6).toList(); // heute + 5 Tage = 6
    }

    /**
     * Liefert pro Tag (heute + 5 Tage) die maximale Niederschlagswahrscheinlichkeit in %.
     */
    public Map<String, Double> getPrecipitationProbabilityNext5Days() {
        JsonNode hourly = fetchHourlyData();
        if (hourly == null) return Collections.emptyMap();

        Map<String, List<Double>> byDay = groupByDay(hourly, "precipitation_probability");
        return limitToNext5Days(byDay, true); // true = Maximum
    }

    /**
     * Liefert pro Tag (heute + 5 Tage) die maximale Windgeschwindigkeit in km/h.
     */
    public Map<String, Double> getWindSpeedNext5Days() {
        JsonNode hourly = fetchHourlyData();
        if (hourly == null) return Collections.emptyMap();

        Map<String, List<Double>> byDay = groupByDay(hourly, "windspeed_10m");
        return limitToNext5Days(byDay, true); // true = Maximum
    }
}
