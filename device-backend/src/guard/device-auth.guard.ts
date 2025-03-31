import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class DeviceAuthGuard implements CanActivate {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();

    const isPublic = this.reflector.get<boolean>('SkipAuth', handler);
    if (isPublic) return true;

    const request = context.switchToRpc().getContext();

    const deviceId = request.get('deviceId')?.[0];
    const authKey = request.get('authKey')?.[0];

    if (!deviceId || !authKey) {
      throw new UnauthorizedException(
        'Missing deviceId or authKey in metadata',
      );
    }

    const authResult = await this.deviceService.authenticateDevice(
      deviceId,
      authKey,
    );

    if (!authResult.authenticated) {
      throw new UnauthorizedException('Invalid authentication credentials');
    }

    return true;
  }
}
