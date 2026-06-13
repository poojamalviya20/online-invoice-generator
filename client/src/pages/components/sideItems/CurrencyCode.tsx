import { selectOption } from "@/pages/features/CurrencyCode/currencyCodeSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CurrencyCode = () => {
  // This is the code to handle options for currency code
  const dispatch = useDispatch();
  const apidata = useSelector((state: any) => state.getapi.data);
  const [selectedOption, setSelectedOption]: any = useState("");

  useEffect(() => {
    if (apidata?.currency_code !== undefined) {
      setSelectedOption(apidata?.currency_code);
      dispatch(selectOption<any>(apidata?.currency_code));
    }
  }, [apidata]);
  //   Code to get countryname
  // Set initial state for the currency code
  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
  });
  const getGeoInfo = () => {
    axios.get("https://ipapi.co/json/").then((response) => {
      let data = response.data;
      setState({
        ...state,
        ip: data.ip,
        countryName: data.country_name,
        countryCode: data.country_calling_code,
        city: data.city,
        timezone: data.timezone,
      });
    });
  };
  useEffect(() => {
    getGeoInfo();
  }, []);

  const options = useSelector((state: any) => state.currencyCode.options);

  useEffect(() => {
    if (apidata?.currency_code) {
      setSelectedOption(apidata?.currency_code);
    } else if (state.countryName !== "") {
      const option = options.find(
        (option: any) => option.countryName === state.countryName
      );

      if (option) {
        dispatch(selectOption(option.currencyCode));
        setSelectedOption(option.currencyCode);
      }
    } else {
      dispatch(selectOption<any>("USD"));
      setSelectedOption("USD");
    }
  }, [state.countryName, options, apidata?.currency_code]);

  const handleOptionChange = (e: any) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    dispatch(selectOption(selectedValue));
  };

  return (
    <>
      <div className="label-div">
        <label>CURRENCY</label>
      </div>
      <select
        name="currency"
        id="currency"
        value={selectedOption}
        onChange={handleOptionChange}
        className="select-div"
        required
      >
        {options.map((option: any) => (
          <option key={option.countryName} value={option.currencyCode}>
            {option.currencyCode}
          </option>
        ))}
        <option value="USD">USD</option>
      </select>
    </>
  );
};

export default CurrencyCode;
