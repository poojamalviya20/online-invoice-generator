import {
  setTaxOption,
  setToggle,
  updateItem,
} from "@/pages/features/InvoiceBilling/taxSlice";
import { faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField/InputField";
import { FLAT, PERCENTAGE } from "@/constant";
import { onKeyPressEvent } from "@/utils/acceptPositive";

const Tax = ({ isHiddenTax, handleHidetax }: any) => {
  const dispatch = useDispatch();
  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );
  const taxItems = useSelector((state: any) => state.tax.tax);
  const apidata = useSelector((state: any) => state.getapi.data);
  useEffect(() => {
    if (apidata?.tax !== undefined) {
      dispatch(updateItem({ name: "tax", value: apidata?.tax }));
    }
    if (apidata?.tax_option === FLAT) {
      dispatch(setToggle({ toggleValue: true }));
      dispatch(setTaxOption(FLAT));
    } else if (apidata?.tax_option === PERCENTAGE) {
      dispatch(setToggle({ toggleValue: false }));
      dispatch(setTaxOption(PERCENTAGE));
    }
  }, [apidata]);
  const handletaxChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };

  // Toggle between rupee and percentage

  const toggle = useSelector((state: any) => state.tax.toggle);

  const handleToggle = () => {
    dispatch(setToggle({ toggleValue: !toggle }));
    const taxOptionValue = !toggle ? FLAT : PERCENTAGE;
    dispatch(setTaxOption(taxOptionValue));
  };

  return (
    <>
      <div className={`tax-div ${isHiddenTax ? "hidden" : "visible"}`}>
        <div className="d-flex">
          <div className="row  justify-content-end g-2 me-2 row-div">
            <div className="col-lg-6">
              <InputField
                type="text"
                name="taxLabel"
                className="form-control m-2 text-end form-titles"
                value={taxItems.taxLabel}
                onChange={handletaxChange}
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
                      name="tax"
                      className="form-control pe-5 border-start-0"
                      value={taxItems.tax}
                      onChange={handletaxChange}
                      placeholder="(Optional)"
                      onKeyPress={onKeyPressEvent}
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      type="number"
                      name="tax"
                      className="form-control pe-5 text-end"
                      value={taxItems.tax}
                      onChange={handletaxChange}
                      placeholder="(Optional)"
                      onKeyPress={onKeyPressEvent}
                    />

                    <span className="percentage-span">%</span>
                  </>
                )}

                {/* New added */}
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
                onClick={handleHidetax}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tax;
