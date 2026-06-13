import {
  Controller,
  Get,
  Post,
  Req,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice as InvoiceEntity } from './invoice.entity';
import { InvoiceDto } from './dto/invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../../utils/file-uploading.utils';
import { UPLOAD_PATH } from '../../core/constants';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getData(@I18n() i18n: I18nContext) {
    return this.invoiceService.getDataServiceHandler(i18n);
  }

  @Get(':invoiceId')
  async getInvoice(@Param() param: any, @Req() req: any, @I18n() i18n: I18nContext) {
    const userAgentIp: string = req.userAgentIp ?? 0;
    const id = param.invoiceId.split(':');
    const newId = id[1];
    const invoice = await this.invoiceService.getInvoice(newId, userAgentIp);
    if (!invoice) {
      throw new NotFoundException(i18n.t('test.INVOICE_NOT_FOUND'));
    }
    return invoice;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: editFileName,
      }),
    }),
  )
  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: InvoiceDto,
    @Res() res: any,
    @I18n() i18n: I18nContext
  ) {
    const userAgentId: number = req.userAgentId ?? 0;
    return this.invoiceService.create(file, body, userAgentId, res, i18n);
  }

  @Post('/getpdf')
  getPdf(@Body() body: any, @Res() res: any, @I18n() i18n: I18nContext) {
    const invoice = this.invoiceService.GetPdfFile(body, res, i18n);
    if (!invoice) {
      throw new NotFoundException(i18n.t('test.PDF_NOT_FOUND'));
    }
    return invoice;
  }

  @Post('/email')
  sendInvoice(@Body() body: any, @Res() res: any, @I18n() i18n: I18nContext) {
    const invoice = this.invoiceService.sendInvoiceEmail(body, res, i18n);
    return invoice;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: UPLOAD_PATH });
  }
}
