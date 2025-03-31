import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { DeviceAuthGuard } from 'src/guard/device-auth.guard';
import { SkipAuth } from 'src/decorator/skip-auth.decorator';

@Controller()
@UseGuards(DeviceAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @GrpcMethod('DeviceService', 'GetDeviceStatus')
  async getDeviceStatus(data: { deviceId: string }) {
    return this.deviceService.getDeviceStatus(data.deviceId);
  }

  @SkipAuth()
  @GrpcMethod('DeviceService', 'RegisterDevice')
  async registerDevice(data: { deviceId: string; authKey: string }) {
    return this.deviceService.registerDevice(data.deviceId, data.authKey);
  }

  @GrpcMethod('DeviceService', 'AuthenticateDevice')
  async authenticateDevice(data: { deviceId: string; authKey: string }) {
    return this.deviceService.authenticateDevice(data.deviceId, data.authKey);
  }
}
