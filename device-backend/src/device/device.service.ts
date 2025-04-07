import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './device.schema';
import { UpdateDeviceRequest } from './device.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface DeviceGrpcService {
  StopDevice(data: {
    deviceId: string;
  }): Observable<{ success: boolean; message: string }>;
}

@Injectable()
export class DeviceService {
  private deviceGrpcService: DeviceGrpcService;

  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @Inject('GRPC_SERVICE') private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.deviceGrpcService =
      this.grpcClient.getService<DeviceGrpcService>('DeviceService');
  }

  async getDeviceStatus(deviceId: string): Promise<{ status: string }> {
    const device = await this.deviceModel.findOne({ deviceId }).exec();
    return { status: device ? 'ONLINE' : 'OFFLINE' };
  }

  async registerDevice(
    deviceId: string,
    authKey: string,
  ): Promise<{ success: boolean; message: string }> {
    const existingDevice = await this.deviceModel.findOne({ deviceId }).exec();
    if (existingDevice) {
      return { success: false, message: 'Device already registered' };
    }

    const newDevice = new this.deviceModel({
      deviceId,
      authKey,
      authDate: new Date(),
    });
    await newDevice.save();
    return { success: true, message: 'Device registered successfully' };
  }

  async updateDevice(data: UpdateDeviceRequest) {
    const result = await this.deviceModel
      .updateOne(
        { deviceId: data.deviceId },
        {
          version: data.version,
          temperature: data.temperature,
        },
      )
      .exec();

    return await this.deviceModel.findOne({ deviceId: data.deviceId });
  }

  async authenticateDevice(
    deviceId: string,
    authKey: string,
  ): Promise<{ authenticated: boolean; message: string }> {
    const device = await this.deviceModel.findOne({ deviceId, authKey }).exec();
    if (device) {
      return { authenticated: true, message: 'Authentication successful' };
    }
    return { authenticated: false, message: 'Invalid credentials' };
  }

  async stopDevice(deviceId: string) {
    try {
      const response = this.deviceGrpcService.StopDevice({ deviceId });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async forceAuthenticate(deviceId: string) {
    const device = this.deviceModel.updateOne(
      {
        deviceId,
      },
      {
        authDate: null,
        authKey: null,
      },
    );
    return;
  }
}
