import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateDeviceRequest } from './monitor.interface';

@Injectable()
export class MonitorService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly deviceClient: ClientProxy,
  ) {}

  async getDevices() {
    return this.deviceClient.send('get_devices', {});
  }

  async updateDeviceStatus(body: UpdateDeviceRequest) {
    return this.deviceClient.send('update_device_status', body);
  }

  async stopDevice(deviceId: string) {
    this.deviceClient.emit('stop_device', { deviceId });
    return;
  }

  async forceAuthenticate(deviceId: string) {
    return this.deviceClient.send('force_authenticate', { deviceId });
  }
}
