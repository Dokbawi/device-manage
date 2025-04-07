import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:password@localhost:5672'],
          queue: 'device',
          exchange: 'device_exchange',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
