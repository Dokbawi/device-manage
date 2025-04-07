import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

const protoPath = join(process.cwd(), 'proto/device.proto');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'device',
      protoPath: protoPath,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:password@localhost:5672'],
      queue: 'device',
      queueOptions: { durable: false },
      exchange: 'device_exchange',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
