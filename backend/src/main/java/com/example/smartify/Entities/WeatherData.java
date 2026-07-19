package com.example.smartify.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;


public class WeatherData {

    @JsonProperty("latitude")
    float latitude;


}
