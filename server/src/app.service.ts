import { Injectable } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  getHello(@I18n() i18n: I18nContext): string {
    return i18n.t('test.WELCOME')
  }
}
