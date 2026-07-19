package com.example.smartify.Repository;

import com.example.smartify.Entities.TempSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempSensorRepository extends JpaRepository<TempSensor, Long> {

}
