import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { DeviceRequest, UpdateDeviceRequest } from './monitor.interface';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get('devices')
  async getDevices() {
    return this.monitorService.getDevices();
  }

  @Patch('devices/status')
  async updateDeviceStatus(@Body() body: UpdateDeviceRequest) {
    return this.monitorService.updateDeviceStatus(body);
  }

  @Post('devices/stop')
  async stopDevice(@Body() body: DeviceRequest) {
    return this.monitorService.stopDevice(body.deviceId);
  }

  @Post('devices/force-authenticate')
  async forceAuthenticate(@Body() body: DeviceRequest) {
    return this.monitorService.forceAuthenticate(body.deviceId);
  }
}
