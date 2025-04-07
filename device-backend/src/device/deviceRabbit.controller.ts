import { Controller, UseGuards } from '@nestjs/common';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { DeviceRequest, UpdateDeviceRequest } from './device.interface';

@Controller()
export class DeviceRabbitController {
  constructor(private readonly deviceService: DeviceService) {}

  @MessagePattern('update_device_status')
  async updateDeviceStatus(data: UpdateDeviceRequest) {
    return this.deviceService.updateDevice(data);
  }

  @MessagePattern('stop_device')
  async stopDevice(data: DeviceRequest) {
    console.log('data : ', data);
    return this.deviceService.stopDevice(data.deviceId);
  }

  @MessagePattern('force_authenticate')
  async forceAuthenticate(data: DeviceRequest) {
    return this.deviceService.forceAuthenticate(data.deviceId);
  }
}
