import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { DeviceAuthGuard } from 'src/guard/device-auth.guard';
import { SkipAuth } from 'src/decorator/skip-auth.decorator';
import { UpdateDeviceRequest } from './device.interface';

@Controller()
@UseGuards(DeviceAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @SkipAuth()
  @GrpcMethod('DeviceService', 'RegisterDevice')
  async registerDevice(data: { deviceId: string; authKey: string }) {
    return this.deviceService.registerDevice(data.deviceId, data.authKey);
  }

  @GrpcMethod('DeviceService', 'UpdateDevice')
  async updateDevice(data: UpdateDeviceRequest) {
    return this.deviceService.updateDevice(data);
  }
}
