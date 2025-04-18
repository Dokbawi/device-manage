import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [MonitorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
