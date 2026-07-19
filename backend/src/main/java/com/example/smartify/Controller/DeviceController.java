package com.example.smartify.Controller;

import com.example.smartify.Entities.Device;
import com.example.smartify.Repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @PostMapping
    public Device addDevice(@RequestBody Device device) {
        return deviceRepository.save(device);
    }

    @PutMapping("/{id}")
    public Device updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
        return deviceRepository.findById(id).map(device -> {
            device.setName(updatedDevice.getName());
            device.setStatus(updatedDevice.isStatus());
            device.setCreatedAt(updatedDevice.getCreatedAt());
            return deviceRepository.save(device);
        }).orElseThrow(() -> new RuntimeException("Device not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteDevice(@PathVariable Long id) {
        deviceRepository.deleteById(id);
    }
}
