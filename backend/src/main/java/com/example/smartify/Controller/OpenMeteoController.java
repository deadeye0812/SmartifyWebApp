package com.example.smartify.Controller;

import com.example.smartify.Service.OpenMeteoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/openMeteo")
public class OpenMeteoController {

    public OpenMeteoService openMeteoService;

    public OpenMeteoController(OpenMeteoService openMeteoService) {
        this.openMeteoService = openMeteoService;
    }

    @CrossOrigin("*")
    @GetMapping("/currentTemperature")
    public Map<String, Double> getCurrentTemperature() {
        return Map.of("currentTemperature", openMeteoService.getCurrentTemperature());
    }

    @CrossOrigin("*")
    @GetMapping("/temperatureForNext5Days")
    public Map<String, Map<String, double[]>> getTemperatureForNext5Days() {
        return Map.of("temperatureForNext5Days", openMeteoService.getMinMaxTemperatureNext5Days());
    }

    @CrossOrigin("*")
    @GetMapping("/getAllDates")
    public Map<String, List<String>> getAllDates() {
        return Map.of("allDates", openMeteoService.getDatesNext5Days());
    }

    @CrossOrigin("*")
    @GetMapping("/getPrecipitationOfAllDates")
    public Map<String, Map<String, Double>> getPrecipitationOfAllDates() {
        return Map.of("allDates", openMeteoService.getPrecipitationProbabilityNext5Days());
    }

    @CrossOrigin("*")
    @GetMapping("/getWindSpeedNext5Days")
    public Map<String, Map<String, Double>> getWindSpeedNext5Days() {
        return Map.of("allDates", openMeteoService.getWindSpeedNext5Days());
    }
}
