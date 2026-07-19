package com.example.smartify.Mqtt.logging;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MqttLoggingAspect {

    @Before("execution(* com.example.smartify.Mqtt.TempSensorSub.*(..))")
    public void logBefore(JoinPoint joinPoint) throws MqttException {
        System.out.println("Method execustion started: " + joinPoint.getSignature());
    }

    @After("execution(* com.example.smartify.Mqtt.TempSensorSub.connectionLost())")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("Connection lost: " + joinPoint.getSignature());
    }

}
