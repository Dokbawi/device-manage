const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './proto/device.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const deviceProto = grpc.loadPackageDefinition(packageDefinition).device;

const client = new deviceProto.DeviceService(
  'localhost:5000',
  grpc.credentials.createInsecure(),
);

const metadata = new grpc.Metadata();
metadata.set('deviceId', 'iot-001');
metadata.set('authKey', 'secret123');

// 1. 기기 등록 (인증 없이 요청 가능)
client.RegisterDevice(
  { deviceId: 'iot-001', authKey: 'secret123' },
  (error, response) => {
    if (error) console.error(error);
    else console.log('Register Device:', response);
  },
);

// 2. 기기 인증 (인증 필요)
client.UpdateDevice(
  { deviceId: 'iot-001', version: 'v3', temperature: '10' },
  metadata,
  (error, response) => {
    if (error) console.error(error);
    else console.log('UpdateDevice Device:', response);
  },
);
