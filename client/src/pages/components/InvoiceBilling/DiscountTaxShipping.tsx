import React, { useEffect, useState } from "react";
import Discount from "./toggles/Discount";
import Buttons from "./toggles/Buttons";
import Tax from "./toggles/Tax";
import Shipping from "./toggles/Shipping";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDiscount,
  handleShipping,
  handleTax,
  hideDiscount,
  hideShipping,
  hideTax,
} from "@/pages/features/InvoiceBilling/hiddenSlice";

const DiscountTaxShipping = () => {
  const dispatch = useDispatch();
  // This is dicount logic
  const isHiddenDiscount = useSelector(
    (state: any) => state.hidden.isHiddenDiscount
  );

  const handleApplyDiscount = () => {
    dispatch(handleDiscount());
  };
  const handleHideDiscount = () => {
    dispatch(hideDiscount());
  };

  //   This is tax logic
  const isHiddenTax = useSelector((state: any) => state.hidden.isHiddenTax);
  const handleApplytax = () => {
    dispatch(handleTax());
  };
  const handleHidetax = () => {
    dispatch(hideTax());
  };
  //   This is shipping logic
  const isHiddenShipping = useSelector(
    (state: any) => state.hidden.isHiddenShipping
  );
  const handleApplyShipping = () => {
    dispatch(handleShipping());
  };
  const handleHideShipping = () => {
    dispatch(hideShipping());
  };
  return (
    <div>
      <Discount
        isHiddenDiscount={isHiddenDiscount}
        handleHideDiscount={handleHideDiscount}
      />
      <Tax isHiddenTax={isHiddenTax} handleHidetax={handleHidetax} />
      <Shipping
        isHiddenShipping={isHiddenShipping}
        handleHideShipping={handleHideShipping}
      />
      <Buttons
        handleApplyDiscount={handleApplyDiscount}
        isHiddenDiscount={isHiddenDiscount}
        isHiddenTax={isHiddenTax}
        handleApplytax={handleApplytax}
        isHiddenShipping={isHiddenShipping}
        handleApplyShipping={handleApplyShipping}
      />
    </div>
  );
};

export default DiscountTaxShipping;
