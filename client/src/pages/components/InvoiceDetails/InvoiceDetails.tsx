import { updateItem } from "@/pages/features/InvoiceDetails/invoiceDetailsSlice";
import {
  addImage,
  removeImage,
} from "@/pages/features/InvoiceDetails/logoImageSlice";
import { faPlus, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../InputField/InputField";
import TextArea from "../InputField/TextArea";
import moment from "moment";
import { useRouter } from "next/router";

const InvoiceDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const invoice_number: any = router.query.invoiceId;
  const items = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails
  );
  const apidata = useSelector((state: any) => state.getapi.data);

  useEffect(() => {
    if (apidata?.logo !== undefined) {
      dispatch(addImage(apidata?.logo));
    }
    if (apidata?.invoice_from !== undefined) {
      dispatch(
        updateItem({ name: "invoice_from", value: apidata?.invoice_from })
      );
    }
    if (apidata?.billing_address !== undefined) {
      dispatch(
        updateItem({ name: "billing_address", value: apidata?.billing_address })
      );
    }
    if (apidata?.shipping_address !== undefined) {
      dispatch(
        updateItem({
          name: "shipping_address",
          value: apidata?.shipping_address,
        })
      );
    }
    if (apidata?.shipping_to_name !== undefined) {
      dispatch(
        updateItem({
          name: "shipping_to_name",
          value: apidata?.shipping_to_name,
        })
      );
    }
    if (apidata?.billing_to_name !== undefined) {
      dispatch(
        updateItem({
          name: "billing_to_name",
          value: apidata?.billing_to_name,
        })
      );
    }
    if (apidata?.payment_terms !== undefined) {
      dispatch(
        updateItem({ name: "payment_terms", value: apidata?.payment_terms })
      );
    }
    if (apidata?.po_number !== undefined) {
      dispatch(updateItem({ name: "po_number", value: apidata?.po_number }));
    }
    if (apidata?.date !== undefined) {
      dispatch(
        updateItem({
          name: "date",
          value: moment(apidata?.date).format("YYYY-MM-DD"),
        })
      );
    }
    if (apidata?.due_date !== undefined) {
      dispatch(
        updateItem({
          name: "due_date",
          value: moment(apidata?.due_date).format("YYYY-MM-DD"),
        })
      );
    }
  }, [apidata]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch(addImage<any>(base64String));
    };
    reader.readAsDataURL(file);
  };

  const logo = useSelector((state: any) => state.logoImage.logo);
  const fileInputRef: any = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    dispatch(removeImage());
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="image-container mb-3">
          {logo ? (
            <>
              <img
                src={logo}
                key={logo}
                alt="image"
                className="image-tag-container"
                onClick={handleImageClick}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                onClick={handleRemoveImage}
                className="fa-sharp fa-solid fa-rectangle-xmark cancel-img-icon"
              ></FontAwesomeIcon>

              <input
                type="file"
                name="logoImage"
                className="form-control"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </>
          ) : (
            <div className="empty-image-div" onClick={handleImageClick}>
              <span className="logo-text">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="fa-solid fa-plus logo-text me-2"
                ></FontAwesomeIcon>
                Add Your Logo
              </span>
              <p className="text-center">(Optional)</p>

              <input
                type="file"
                name="logoImage"
                className="form-control"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-lg-7">
            <div className="form-group mb-2">
              <TextArea
                className="form-control rounded-1"
                name="invoice_from"
                placeholder="Who is this invoice from?"
                value={items.invoice_from}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-1">
              <InputField
                type="text"
                name="billing_to_name"
                value={items.billing_to_name}
                onChange={handleChange}
                className="form-control form-titles"
                placeholder="(Required)"
                isRequired={true}
              />
            </div>
            <TextArea
              className="form-control rounded-1"
              name="billing_address"
              placeholder="Who is this invoice to?(required)"
              isRequired={true}
              value={items.billing_address}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-1">
              <InputField
                type="text"
                name="shipping_to_name"
                value={items.shipping_to_name}
                onChange={handleChange}
                className="form-control form-titles"
              />
            </div>
            <TextArea
              className="form-control rounded-1"
              name="shipping_address"
              placeholder="(Optional)"
              value={items.shipping_address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="form-group">
          <InputField
            type="text"
            className="form-control text-lg-end invoice-title mb-2"
            name="invoiceTitle"
            value={items.invoiceTitle}
            onChange={handleChange}
          />
        </div>
        <div className="row justify-content-lg-end">
          <div className="col-lg-5">
            <div className="form-group">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  #
                </span>
                <InputField
                  type="text"
                  className="form-control text-end"
                  name="invoice_number"
                  value={invoice_number || ""}
                  onChange={handleChange}
                  placeholder="Sr.No.(Required)"
                  isRequired={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="dates-container">
          <div className="row justify-content-end g-2 mb-1">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="dateLabel"
                className="form-control text-end form-titles"
                value={items.dateLabel}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-4">
              <InputField
                type="date"
                name="date"
                className="form-control text-end rounded-1"
                value={
                  items.date
                    ? items.date
                    : moment(new Date()).format("YYYY-MM-DD")
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-end g-2 mb-1">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="termsLabel"
                className="form-control text-end form-titles"
                value={items.termsLabel}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-4">
              <InputField
                type="text"
                name="payment_terms"
                className="form-control text-end rounded-1"
                value={items.payment_terms}
                onChange={handleChange}
                placeholder="(Optional)"
              />
            </div>
          </div>
          <div className="row justify-content-end g-2 mb-1">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="dueDateLabel"
                className="form-control text-end form-titles"
                value={items.dueDateLabel}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-4">
              <InputField
                type="date"
                name="due_date"
                className="form-control text-end rounded-1"
                value={
                  items.due_date
                    ? items.due_date
                    : moment(new Date()).format("YYYY-MM-DD")
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-end g-2 mb-1">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="ponumberLabel"
                className="form-control text-end form-titles"
                value={items.ponumberLabel}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-4">
              <InputField
                type="text"
                name="po_number"
                className="form-control text-end rounded-1"
                value={items.po_number}
                onChange={handleChange}
                placeholder="(Optional)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
