package com.example.smartify.Mqtt;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class TempSensorSub implements MqttCallback {

    private MqttClient client;
    private String lastTemperature;
    private String lastHumidity;
    private String lastMotion;

    public TempSensorSub(MqttClient client) throws MqttException {
        this.client = client;
        this.client.setCallback(this);
        this.client.subscribe("smarthome/temperature");
        this.client.subscribe("smarthome/humidity");
        this.client.subscribe("smarthome/motion");
    }

    public String getLastTemperature() throws MqttException {
        if (lastTemperature != null) {
            return lastTemperature;
        }
        return "";
    }

    public String getLastHumidity() throws MqttException {
        if (lastHumidity != null) {
            return lastHumidity;
        }
        return "";
    }

    public String getLastMotion() throws MqttException {
        return lastMotion;
    }

    @Override
    public void connectionLost(Throwable throwable) {
        System.out.println("Connection lost");
    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) {
        if(topic.equals("smarthome/temperature")) {
            lastTemperature = new String(mqttMessage.getPayload());
            System.out.println(lastTemperature);
        } else if(topic.equals("smarthome/humidity")) {
            lastHumidity = new String(mqttMessage.getPayload());
            System.out.println(lastHumidity);
        } else if (topic.equals("smarthome/motion")) {
            lastMotion = new String(mqttMessage.getPayload());
            System.out.println(lastMotion);
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

    }
}
