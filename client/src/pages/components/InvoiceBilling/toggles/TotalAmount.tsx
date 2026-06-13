import {
  addItem,
  updateItem,
} from "@/pages/features/InvoiceBilling/totalAmountSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField/InputField";
import { onKeyPressEvent } from "@/utils/acceptPositive";

const TotalAmount = () => {
  const dispatch = useDispatch();
  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );
  const totalitems = useSelector((state: any) => state.totalAmount.totalAmount);

  const subtotalState = useSelector((state: any) => state.subTotal.subTotal);
  const discountState = useSelector((state: any) => state.discount.discount);
  const shippingState = useSelector((state: any) => state.shipping.shipping);
  const taxState = useSelector((state: any) => state.tax.tax);

  // Calculations
  const subtotal = Number(subtotalState.subtotal);
  const discount = Number(discountState.discount);
  const tax = Number(taxState.tax);
  const shipping = Number(shippingState.shipping_charge);
  const discountToggle = useSelector((state: any) => state.discount.toggle);
  const taxToggle = useSelector((state: any) => state.tax.toggle);
  const apidata = useSelector((state: any) => state.getapi.data);
  useEffect(() => {
    if (apidata?.total_amount !== undefined) {
      dispatch(
        updateItem({ name: "total_amount", value: apidata?.total_amount })
      );
    }
    if (apidata?.paid_amount !== undefined) {
      dispatch(
        updateItem({ name: "paid_amount", value: apidata?.paid_amount })
      );
    }
    if (apidata?.total_amount !== undefined) {
      dispatch(updateItem({ name: "due_amount", value: apidata?.due_amount }));
    }
  }, [apidata]);

  let discountPrice = (discount * subtotal) / 100;
  let taxPrice = (tax * subtotal) / 100;
  let discountedPrice =
    subtotal !== 0
      ? Number(subtotal) -
      Number(discountPrice) +
      Number(tax) +
      Number(shipping)
      : 0;

  let total =
    subtotal !== 0
      ? Number(subtotal) -
      Number(discountToggle ? discount : discountPrice) +
      Number(taxToggle ? tax : taxPrice) +
      Number(shipping)
      : 0;

  const [isMinus, setIsMinus] = useState(false);
  let balanceDue = Number(total) - Number(totalitems.paid_amount);

  useEffect(() => {
    if (balanceDue < 0) {
      setIsMinus(true);
    } else {
      setIsMinus(false);
    }
  }, [balanceDue]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(updateItem({ name, value }));
  };

  useEffect(() => {
    dispatch(
      addItem<any>({
        totalLabel: totalitems.totalLabel,
        total_amount: total,
        amoutPaidLabel: totalitems.amoutPaidLabel,
        paid_amount: totalitems.paid_amount,
        balanceDueLabel: totalitems.balanceDueLabel,
        due_amount: balanceDue,
      })
    );
  }, [
    dispatch,
    total,
    balanceDue,
    totalitems.totalLabel,
    totalitems.amoutPaidLabel,
    totalitems.paid_amount,
    totalitems.balanceDueLabel,
  ]);

  return (
    <>
      <div className="row justify-content-lg-end g-2 mb-1">
        <div className="col-lg-6">
          <InputField
            type="text"
            name="totalLabel"
            value={totalitems.totalLabel}
            onChange={handleChange}
            className="form-control text-lg-end form-titles"
          />
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent" id="basic-addon1">
              {currencyCode}
            </span>
            <InputField
              type="text"
              name="total_amount"
              value={total.toFixed(2)}
              onChange={handleChange}
              className="form-control border-start-0 text-end"
              isReadOnly={true}
            />
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
      <div className="row justify-content-lg-end g-2 mb-1">
        <div className="col-lg-6">
          <InputField
            type="text"
            name="amoutPaidLabel"
            value={totalitems.amoutPaidLabel}
            onChange={handleChange}
            className="form-control text-lg-end form-titles"
          />
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent" id="basic-addon1">
              {currencyCode}
            </span>
            <InputField
              type="number"
              name="paid_amount"
              value={totalitems.paid_amount}
              onChange={handleChange}
              className="form-control border-start-0 text-end"
              placeholder="(Optional)"
              onKeyPress={onKeyPressEvent}
            />
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
      <div className="row justify-content-lg-end g-2 mb-1">
        <div className="col-lg-6">
          <InputField
            type="text"
            name="balanceDueLabel"
            value={totalitems.balanceDueLabel}
            onChange={handleChange}
            className="form-control text-lg-end form-titles"
          />
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent" id="basic-addon1">
              {currencyCode}
            </span>
            <InputField
              type="text"
              name="due_amount"
              value={!isMinus ? balanceDue.toFixed(2) : "0"}
              onChange={handleChange}
              className="form-control border-start-0 text-end"
              isReadOnly={true}
            />
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
      <div className="row justify-content-lg-end g-2 mb-1">
        <div className="col-lg-12">
          <span className="balance-div">
            {isMinus ? (
              <>
                <p className="text-success fw-bolder text-end info-p">
                  Payable Amount is {Math.abs(balanceDue).toFixed(2)}
                  {currencyCode} From Us
                </p>
                <div className="row">
                  <div className="col-5">
                    <p className="text-success  fw-bolder text-end">Sign</p>
                  </div>
                  <div className="col-7">
                    <hr />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalAmount;
