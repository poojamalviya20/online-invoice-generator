import {
  addItem,
  updateItem,
} from "@/pages/features/InvoiceBilling/subTotalSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField/InputField";

const SubTotal = () => {
  const dispatch = useDispatch();
  const subtotalItems = useSelector((state: any) => state.subTotal.subTotal);

  const apidata = useSelector((state: any) => state.getapi.data);
  useEffect(() => {
    if (apidata?.subtotal !== undefined) {
      dispatch(
        updateItem({
          name: "subtotal",
          value: apidata?.subtotal,
        })
      );
    }
  }, [apidata]);
  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );

  // Get amount value for amount count
  const inputstate = useSelector((state: any) => state.input);
  const subtotal = inputstate.reduce((total: any, inputField: any) => {
    return total + Number(inputField.total_amount);
  }, 0);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };

  useEffect(() => {
    dispatch(
      addItem<any>({
        subtotal: subtotal,
        subTotalLabel: subtotalItems.subTotalLabel,
      })
    );
  }, [dispatch, subtotal, subtotalItems.subTotalLabel]);

  return (
    <>
      <div className="row justify-content-end g-2">
        <div className="col-lg-6">
          <InputField
            type="text"
            name="subTotalLabel"
            value={subtotalItems.subTotalLabel}
            onChange={handleChange}
            className="form-control text-end form-titles"
          />
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent" id="basic-addon1">
              {currencyCode}
            </span>
            <InputField
              type="number"
              name="subtotal"
              value={subtotal}
              onChange={handleChange}
              className="form-control border-start-0 text-end"
              isReadOnly={true}
            />
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </>
  );
};

export default SubTotal;
