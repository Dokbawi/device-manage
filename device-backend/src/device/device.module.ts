import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Device, DeviceSchema } from './device.schema';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeviceRabbitController } from './deviceRabbit.controller';
const protoPath = join(process.cwd(), '/proto/device.proto');

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'device',
          protoPath: protoPath,
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  controllers: [DeviceController, DeviceRabbitController],
  providers: [DeviceService],
})
export class DeviceModule {}
