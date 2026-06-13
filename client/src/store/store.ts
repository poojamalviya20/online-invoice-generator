import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import titleReducer from "../pages/features/InvoiceItems/titleSlice";
import invoiceDetailsReducer from "../pages/features/InvoiceDetails/invoiceDetailsSlice";
import invoiceBillingReducer from "../pages/features/InvoiceBilling/invoiceBillingSlice";
import logoImageReducer from "../pages/features/InvoiceDetails/logoImageSlice";
import discountReducer from "../pages/features/InvoiceBilling/discountSlice";
import taxReducer from "../pages/features/InvoiceBilling/taxSlice";
import shippingReducer from "../pages/features/InvoiceBilling/shippingSlice";
import totalAmountReducer from "../pages/features/InvoiceBilling/totalAmountSlice";
import subTotalReducer from "../pages/features/InvoiceBilling/subTotalSlice";
import inputReducer from "../pages/features/InvoiceItems/inputSlice";
import hiddenReducer from "../pages/features/InvoiceBilling/hiddenSlice";
import currencyCodeReducer from "../pages/features/CurrencyCode/currencyCodeSlice";
import apiReducer from "../pages/features/apiData/apiSlice";
import getInvoicePDFReducer from "../pages/features/apiData/getInvoicePDFSlice";
import sendEmailReducer from "../pages/features/apiData/sendEmailSlice";
import getInvoiceReducer from "../pages/features/apiData/getInvoiceSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["hidden"], // persist only the counterReducer
};
const rootReducer = combineReducers({
  itemTitles: titleReducer,
  invoiceDetails: invoiceDetailsReducer,
  invoiceBilling: invoiceBillingReducer,
  logoImage: logoImageReducer,
  discount: discountReducer,
  tax: taxReducer,
  shipping: shippingReducer,
  totalAmount: totalAmountReducer,
  subTotal: subTotalReducer,
  input: inputReducer,
  hidden: hiddenReducer,
  // currency code
  currencyCode: currencyCodeReducer,
  // api slice
  api: apiReducer,
  // Get invoice as PDF Slice
  getpdf: getInvoicePDFReducer,
  // Email invoice
  sendEmail: sendEmailReducer,
  // Get invoice api
  getapi: getInvoiceReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
