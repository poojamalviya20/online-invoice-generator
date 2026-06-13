import {
  setDiscountOption,
  setToggle,
  updateItem,
} from "@/pages/features/InvoiceBilling/discountSlice";
import { faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField/InputField";
import { FLAT, PERCENTAGE } from "@/constant";
import { onKeyPressEvent } from "@/utils/acceptPositive";

const Discount = ({ handleHideDiscount, isHiddenDiscount }: any) => {
  const dispatch = useDispatch();
  const discountItems = useSelector((state: any) => state.discount.discount);

  // Toggle between rupee and percentage
  const toggle = useSelector((state: any) => state.discount.toggle);
  const apidata = useSelector((state: any) => state.getapi.data);

  useEffect(() => {
    if (apidata?.discount !== undefined) {
      dispatch(updateItem({ name: "discount", value: apidata?.discount }));
    }
    if (apidata?.discount_option === FLAT) {
      dispatch(setToggle({ toggleValue: true }));
      dispatch(setDiscountOption(FLAT));
    } else if (apidata?.discount_option === PERCENTAGE) {
      dispatch(setToggle({ toggleValue: false }));
      dispatch(setDiscountOption(PERCENTAGE));
    }
  }, [apidata]);

  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );

  const handlediscountChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };

  const handleToggle = () => {
    dispatch(setToggle({ toggleValue: !toggle }));
    const discountOptionValue = !toggle ? FLAT : PERCENTAGE;
    dispatch(setDiscountOption(discountOptionValue));
  };

  return (
    <>
      <div
        className={`discount-div ${isHiddenDiscount ? "hidden" : "visible"}`}
      >
        <div className="d-flex">
          <div className="row justify-content-end g-2 me-2 row-div">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="discountLabel"
                className="form-control m-2 text-end form-titles"
                value={discountItems.discountLabel}
                onChange={handlediscountChange}
              />
            </div>
            <div className="col-lg-4">
              <div className="input-group discount m-2">
                {toggle ? (
                  <>
                    <span
                      className="input-group-text bg-transparent"
                      id="basic-addon1"
                    >
                      {currencyCode}
                    </span>
                    <InputField
                      type="number"
                      name="discount"
                      className="form-control pe-5 border-start-0"
                      value={discountItems.discount}
                      onChange={handlediscountChange}
                      placeholder="(Optional)"
                      onKeyPress={onKeyPressEvent}
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      type="number"
                      name="discount"
                      className="form-control pe-5 text-end"
                      value={discountItems.discount}
                      onChange={handlediscountChange}
                      placeholder="(Optional)"
                      onKeyPress={onKeyPressEvent}
                    />

                    <span className="percentage-span">%</span>
                  </>
                )}
                {/* Toggle button to toggle between FLAT and PERCENTAGE */}
                <div className="change">
                  <FontAwesomeIcon
                    icon={faRotate}
                    className="exchange-button"
                    onClick={handleToggle}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
            <div className="col-lg-1">
              <FontAwesomeIcon
                icon={faXmark}
                className="p-3 toggle-span"
                onClick={handleHideDiscount}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discount;
