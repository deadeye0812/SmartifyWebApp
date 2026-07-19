package com.example.smartify.Controller;

import com.example.smartify.Mqtt.TempSensorSub;
import org.eclipse.paho.client.mqttv3.MqttException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/mqtt")
public class MqttController {

    private TempSensorSub tempSensorSub;

    @Autowired
    public MqttController(TempSensorSub tempSensorSub) throws MqttException {
        this.tempSensorSub = tempSensorSub;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/temperature")
    public Map<String, String> temperature() throws MqttException {
        return  Map.of("temperature", tempSensorSub.getLastTemperature());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/humidity")
    public Map<String, String> humidity() throws MqttException {
        return Map.of("humidity", tempSensorSub.getLastHumidity());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/motion")
    public Map<String, String> motion() throws MqttException {
        return Map.of("motion", tempSensorSub.getLastMotion());
    }

}
