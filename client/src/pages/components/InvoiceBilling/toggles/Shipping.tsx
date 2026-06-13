import { updateItem } from "@/pages/features/InvoiceBilling/shippingSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField/InputField";
import { onKeyPressEvent } from "@/utils/acceptPositive";

const Shipping = ({ isHiddenShipping, handleHideShipping }: any) => {
  const dispatch = useDispatch();
  const shippingItems = useSelector((state: any) => state.shipping.shipping);
  const apidata = useSelector((state: any) => state.getapi.data);
  useEffect(() => {
    if (apidata?.shipping_charge !== undefined) {
      dispatch(
        updateItem({ name: "shipping_charge", value: apidata?.shipping_charge })
      );
    }
  }, [apidata]);

  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );
  const handleShippingChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };

  return (
    <>
      <div
        className={`shipping-div ${isHiddenShipping ? "hidden" : "visible"}`}
      >
        <div className="d-flex">
          <div className="row  justify-content-end g-1 me-2 row-div">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="shippingLabel"
                className="form-control m-2 text-end form-titles"
                value={shippingItems.shippingLabel}
                onChange={handleShippingChange}
              />
            </div>
            <div className="col-lg-4">
              <div className="input-group m-2">
                <span
                  className="input-group-text bg-transparent"
                  id="basic-addon1"
                >
                  {currencyCode}
                </span>

                <InputField
                  type="number"
                  name="shipping_charge"
                  className="form-control border-start-0"
                  value={shippingItems.shipping_charge}
                  onChange={handleShippingChange}
                  placeholder="(Optional)"
                  onKeyPress={onKeyPressEvent}
                />
              </div>
            </div>
            <div className="col-lg-1">
              <FontAwesomeIcon
                icon={faXmark}
                className="p-3 toggle-span"
                onClick={handleHideShipping}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
