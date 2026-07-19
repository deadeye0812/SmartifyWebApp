package com.example.smartify.Mqtt;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttClientConfig {

    private static final String MQTT_BROKER = "tcp://192.168.178.42:1883";
    private static final String MQTT_USERNAME = "admin";

    @Bean
    public MqttClient mqttClient() throws MqttException {
        MqttClient client = new MqttClient(MQTT_BROKER, MQTT_USERNAME, new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName("user1");
        options.setPassword("Mumpel123".toCharArray());
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);
        options.setConnectionTimeout(10);

        client.connect(options);
        return client;
    }
}
