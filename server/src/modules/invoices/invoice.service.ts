import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Invoice } from './invoice.entity';
import {
  INVOICE_REPOSITORY,
  INVOICE_ITEM_REPOSITORY,
  USER_AGENT_INVOICES_REPOSITORY,
  PDF_UPLOAD_PATH,
  INVOICE_ANALYTICS_REPOSITORY,
  INVOICE_SENTS_REPOSITORY,
} from '../../core/constants';
import { InvoiceItems } from '../invoice-items/invoice-items.entity';
import { UserAgentInvoices } from '../user-agent-invoices/user-agent-invoices.entity';
const fs = require('fs');
const path = require('path');
const utils = require('util');
const hb = require('handlebars');
const readFile = utils.promisify(fs.readFile);
const puppeteer = require('puppeteer');
import { InvoiceAnalytics } from '../invoice-analytics/invoice-analytics.entity';
const moment = require('moment');
import { EmailService } from 'src/email/email.service';
import { InvoiceSents } from '../invoice-sents/invoice-sents.entity';

export const uniqueId = (length = 13) => {
  var nanoId = require('nano-id');
  return nanoId(length);
};

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: typeof Invoice,
    @Inject(INVOICE_ITEM_REPOSITORY)
    private invoiceItemRepository: typeof InvoiceItems,
    @Inject(USER_AGENT_INVOICES_REPOSITORY)
    private userAgentInvoicesRepository: typeof UserAgentInvoices,
    @Inject(INVOICE_ANALYTICS_REPOSITORY)
    private invoicesAnalyticsRepository: typeof InvoiceAnalytics,
    private emailService: EmailService,
    @Inject(INVOICE_SENTS_REPOSITORY)
    private invoicesSentsRepository: typeof InvoiceSents,
  ) {}

  getDataServiceHandler(i18n:any) {
    return i18n.t('test.HELLO');
  }

  async getInvoice(newId: any, userAgentIp: string) {
    return await this.invoiceRepository.findOne({
      where: { invoice_number: newId },
      include: [{ model: InvoiceItems }],
    });
  }

  async GetPdfFile(body: any, res: any, i18n:any) {
    this.invoiceRepository
      .findOne({
        where: { invoice_number: body.invoice_number },
        include: [{ model: InvoiceItems }],
      })
      .then(async (invoiceData) => {
        if (invoiceData) {
          try {
            const itemsArray = Array.isArray(invoiceData?.items)
            ? invoiceData?.items
            : [invoiceData?.items];
            const browser = await puppeteer.launch({});
            const page = await browser.newPage();
				    const html =`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
                <style>
                    .size-150 {height: 150px; width: 150px;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12  col-lg-10">
                            <div class="card shadow rounded-0">
                                <div class="card-body px-5 py-4">
                                    <div class="row justify-content-between">
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="d-flex flex-column gap-3">
                                                <div>
                                                    <img class="img-fluid size-150"
                                                        src=${invoiceData.logo} />
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="d-flex flex-column">
                                                            <div class="fw-semibold text-muted">Bill To:</div>
                                                            <div class="fw-bold">${invoiceData.billing_address}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="d-flex flex-column">
                                                            <div class="fw-semibold text-muted">Ship To:</div>
                                                            <div class="fw-bold">${invoiceData.shipping_address ? invoiceData.shipping_address : '-'}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="d-flex flex-column mb-4">
                                                <div class="text-lg-end" style="font-size: 44px;">INVOICE</div>
                                                <div class="text-muted text-lg-end fw-semibold">${invoiceData.invoice_number}</div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Date:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                  <div class="text-lg-end fw-semibold">${moment(invoiceData.date).format('DD/MM/YYYY')}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Payment Terms:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.payment_terms ? invoiceData.payment_terms : '-'}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Due Date:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${moment(invoiceData.due_date).format('DD/MM/YYYY')}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">PO Number:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.po_number ? invoiceData.po_number : '-'}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 bg-light py-2">
                                                <div class="col-lg-6">
                                                    <div class="fw-bold text-lg-end">Balance Due:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.due_amount ? invoiceData.due_amount : '-'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive mb-5">
                                        <table class="table table-borderless">
                                            <thead>
                                                <tr class="text-bg-dark">
                                                    <td>Item</td>
                                                    <td width="120">Quantity</td>
                                                    <td width="120">Rate</td>
                                                    <td width="120">Amount</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tbody>
                                              <!-- Use map to iterate over itemsArray -->
                                              ${itemsArray?.map((item:any) => `
                                                <tr>
                                                  <td class="item">${item?.product_name}</td>
                                                  <td class="item">${item?.quantity}</td>
                                                  <td class="item">${item?.rate_amount}</td>
                                                  <td class="item">${item?.total_amount}</td>
                                                </tr>
                                              `).join('')}
                                            </tbody>
                                            
                                            
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row justify-content-end">
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Subtotal:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.subtotal} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>  
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Discount:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.discount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Tax:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.tax} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Shipping:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.shipping_charge} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-bold text-lg-end">Total:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-bold">${invoiceData.total_amount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-bold text-lg-end">Amount Paid:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-bold">${invoiceData.paid_amount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Bootstrap Bundle -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>`;
            await page.setContent(html);
            const time = Date.now();
            await page.pdf({
              path: `${PDF_UPLOAD_PATH}/invoice${time}.pdf`,
              format: 'A2',
              displayHeaderFooter: false,
            });
            await page.close();
            await browser.close();
            const count = 0;
            const filename = {
              pdffile: `${process.env.BASE_URL}/invoices/files/invoice${time}.pdf`,
            };
            InvoiceAnalytics.findOne({
              where: { invoice_id: body.invoice_number },
            }).then(async (invoiceAnalytics) => {
              if (invoiceAnalytics) {
                await InvoiceAnalytics.update(
                  {
                    download_count: invoiceAnalytics.download_count + 1,
                    sent_over_mail_count: count,
                  },
                  { where: { invoice_id: body.invoice_number } },
                );
              } else {
                await this.invoicesAnalyticsRepository.create<InvoiceAnalytics>(
                  {
                    uuid: uniqueId(),
                    invoice_id: body.invoice_number,
                    download_count: count + 1,
                    sent_over_mail_count: count,
                  },
                );
              }
            });
            res.send(filename);
          } catch (error) {
            res.send(error);
          }
        } else {
          return new NotFoundException(i18n.t('test.PDF_NOT_FOUND'));
        }
      });
  }

  async sendInvoiceEmail(body: any, res: any, i18n:any) {
    const userEmail: string = body.email;
    const invoiceId: number = body.invoice_number;
    this.invoiceRepository
      .findOne({
        where: { invoice_number: invoiceId },
        include: [{ model: InvoiceItems }],
      })
      .then(async (invoiceData) => {
        if (invoiceData) {
          try {
            const itemsArray = Array.isArray(invoiceData?.items)
            ? invoiceData?.items
            : [invoiceData?.items];
            const browser = await puppeteer.launch({});
            const page = await browser.newPage();
            const html =`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
                <style>
                    .size-150 {height: 150px; width: 150px;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12  col-lg-10">
                            <div class="card shadow rounded-0">
                                <div class="card-body px-5 py-4">
                                    <div class="row justify-content-between">
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="d-flex flex-column gap-3">
                                                <div>
                                                    <img class="img-fluid size-150"
                                                        src=${invoiceData.logo} />
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="d-flex flex-column">
                                                            <div class="fw-semibold text-muted">Bill To:</div>
                                                            <div class="fw-bold">${invoiceData.billing_address}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="d-flex flex-column">
                                                            <div class="fw-semibold text-muted">Ship To:</div>
                                                            <div class="fw-bold">${invoiceData.shipping_address ? invoiceData.shipping_address : '-'}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="d-flex flex-column mb-4">
                                                <div class="text-lg-end" style="font-size: 44px;">INVOICE</div>
                                                <div class="text-muted text-lg-end fw-semibold">${invoiceData.invoice_number}</div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Date:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                  <div class="text-lg-end fw-semibold">${moment(invoiceData.date).format('DD/MM/YYYY')}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Payment Terms:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.payment_terms ? invoiceData.payment_terms : '-'}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Due Date:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${moment(invoiceData.due_date).format('DD/MM/YYYY')}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">PO Number:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.po_number ? invoiceData.po_number : '-'}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 bg-light py-2">
                                                <div class="col-lg-6">
                                                    <div class="fw-bold text-lg-end">Balance Due:</div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.due_amount ? invoiceData.due_amount : '-'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive mb-5">
                                        <table class="table table-borderless">
                                            <thead>
                                                <tr class="text-bg-dark">
                                                    <td>Item</td>
                                                    <td width="120">Quantity</td>
                                                    <td width="120">Rate</td>
                                                    <td width="120">Amount</td>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                              <!-- Use map to iterate over itemsArray -->
                                                ${itemsArray?.map((item:any) => `
                                                  <tr>
                                                    <td class="item">${item?.product_name}</td>
                                                    <td class="item">${item?.quantity}</td>
                                                    <td class="item">${item?.rate_amount}</td>
                                                    <td class="item">${item?.total_amount}</td>
                                                  </tr>
                                                `).join('')}
                                              </tbody>
                                        </table>
                                    </div>
                                    <div class="row justify-content-end">
                                        <div class="col-6 col-lg-6 mb-4">
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Subtotal:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.subtotal} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>  
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Discount:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.discount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Tax:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.tax} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-semibold text-muted text-lg-end">Shipping:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-semibold">${invoiceData.shipping_charge} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-bold text-lg-end">Total:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-bold">${invoiceData.total_amount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6 col-lg-6">
                                                    <div class="fw-bold text-lg-end">Amount Paid:</div>
                                                </div>
                                                <div class="col-6 col-lg-6">
                                                    <div class="text-lg-end fw-bold">${invoiceData.paid_amount} ${invoiceData.currency_code}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Bootstrap Bundle -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>`;
            await page.setContent(html);
            const time = Date.now();
            await page.pdf({
              path: `${PDF_UPLOAD_PATH}/invoice${time}.pdf`,
              format: 'A2',
              displayHeaderFooter: false,
            });
            await page.close();
            await browser.close();
            const count = 0;
            const filename = {
              pdffile: `${process.env.BASE_URL}/invoices/files/invoice${time}.pdf`,
            };
            InvoiceAnalytics.findOne({
              where: { invoice_id: invoiceId },
            }).then(async (invoiceAnalytics) => {
              if (invoiceAnalytics) {
                await InvoiceAnalytics.update(
                  {
                    download_count: count,
                    sent_over_mail_count:
                    invoiceAnalytics.sent_over_mail_count + 1,
                  },
                  { where: { invoice_id: invoiceId } },
                );
              } else {
                await this.invoicesAnalyticsRepository.create<InvoiceAnalytics>(
                  {
                    uuid: uniqueId(),
                    invoice_id: invoiceId,
                    download_count: count,
                    sent_over_mail_count: count + 1,
                  },
                );
              }
            });
            await this.emailService
              .sendUserWelcome(userEmail, filename)
              .then((data) => {
                this.invoicesSentsRepository.create<InvoiceSents>({
                  uuid: uniqueId(),
                  invoice_id: invoiceId,
                  email: userEmail,
                  attachment: filename.pdffile,
                });
                res.json({
                  message: i18n.t('test.EMAIL_SENT'),
                });
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          return new NotFoundException(i18n.t('test.PDF_NOT_FOUND'));
        }
      });
  }

  async create(file: any, body: any, userAgentId: number, res: any, i18n:any) {
    const invItems = body.items ? JSON.parse(body.items) : [];
	  const deletedItems = body.delItems ? JSON.parse(body.delItems) : [] ;
    const updatedItems = body.updatedItems ? JSON.parse(body.updatedItems): [];
    const logo = file?.filename; 
    const ImgUrl = `${process.env.BASE_URL}/invoices/logo/${logo}`;
	 Invoice.findOne({ 
      where: { invoice_number: body.invoice_number },
      include: [{ model: InvoiceItems }]
    }).then(async (invoice) => {
      if (invoice) {
			await Invoice.update({ 
				...body,
				logo: logo ? ImgUrl : invoice.logo,
			  }, { where: { id: invoice.id } }).then((data)=>{
				if(deletedItems){
					deletedItems.forEach((element:any) => {
					  this.invoiceItemRepository.destroy<InvoiceItems>({
						 where:{ id: element.id}
					  });
					});
				 }
				 if(updatedItems){
					updatedItems.forEach((element1:any) => {
					  this.invoiceItemRepository.update<InvoiceItems>({ 
						 ...element1,
						}, { where: { id: element1.id } })
					}); 
				 } 
				 if(invItems){
					invItems.forEach((element:any) => {
					  this.invoiceItemRepository.create<InvoiceItems>({
						 uuid: uniqueId(),
						 invoice_id: invoice.id,
						 ...element,
					  });
					});
				 }
			  })
      } else {
        this.invoiceRepository
          .create<Invoice>({
            uuid: uniqueId(),
            logo: logo ? ImgUrl : '',
            ...body,
          })
          .then(async (data) => {
            invItems.forEach((element) => {
              this.invoiceItemRepository.create<InvoiceItems>({
                uuid: uniqueId(),
                invoice_id: data.id,
                ...element,
              });
            });
            await this.userAgentInvoicesRepository.create<UserAgentInvoices>({
              uuid: uniqueId(),
              user_agent_id: userAgentId,
              invoice_id: data.id,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    res.send(i18n.t('test.INVOICE_SAVE'));
  }
}
