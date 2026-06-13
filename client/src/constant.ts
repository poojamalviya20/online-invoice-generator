export const PERCENTAGE = "PERCENTAGE";
export const FLAT = "FLAT";
// Tail for APi
export const API_TAIL = {
  SAVE_API: "invoice",
  GET_PDF: "/getpdf",
  EMAIL_INVOICE: "/email",
};

export const REDUCERS = {
  API_SLICE_REDUCER: "api/saveInvoice",
  GET_PDF_API_REDUCER: "getpdf/getInvoicePDF",
  SEND_EMAIL_INVOICE_RECUCER: "sendEmail/sendEmailInvoice",
  GET_INVOICE_API_REDUCER: "getapi/getInvoice",
};
