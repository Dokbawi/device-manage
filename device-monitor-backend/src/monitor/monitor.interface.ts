export interface DeviceRequest {
  deviceId: string;
}

export interface UpdateDeviceRequest extends DeviceRequest {
  temperature?: string;
  version?: string;
}
