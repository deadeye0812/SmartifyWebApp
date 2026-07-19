package com.example.smartify.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "temperatureSensor")
public class TempSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tempSensorId;

    @Column(nullable = false)
    private String tempSensorName;

    @Column(nullable = false)
    private boolean tempSensorStatus;

    @Column(nullable = false)
    private double temperature;

    @Column(nullable = false)
    private double humidity;

    public TempSensor() {}

    public TempSensor(String tempSensorName, boolean tempSensorStatus, double temperature, double humidity) {
        this.tempSensorName = tempSensorName;
        this.tempSensorStatus = tempSensorStatus;
        this.temperature = temperature;
        this.humidity = humidity;
    }

    public long getTempSensorId() {
        return tempSensorId;
    }

    public void setTempSensorId(long tempSensorId) {
        this.tempSensorId = tempSensorId;
    }

    public String getTempSensorName() {
        return tempSensorName;
    }

    public void setTempSensorName(String tempSensorName) {
        this.tempSensorName = tempSensorName;
    }

    public boolean isTempSensorStatus() {
        return tempSensorStatus;
    }

    public void setTempSensorStatus(boolean tempSensorStatus) {
        this.tempSensorStatus = tempSensorStatus;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }
}
