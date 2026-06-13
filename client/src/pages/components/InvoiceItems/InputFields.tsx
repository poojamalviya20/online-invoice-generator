import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInputField,
  removeInputField,
  updateInputField,
  updateInputFields,
} from "../../features/InvoiceItems/inputSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import InputField from "../InputField/InputField";
import { onKeyPressEvent } from "@/utils/acceptPositive";
import { setItemArray } from "@/pages/features/InvoiceItems/titleSlice";
function InputFields() {
  const dispatch = useDispatch();
  const apidata = useSelector((state: any) => state.getapi.data);
  const inputFields = useSelector((state: any) => state.input);

  const [itemArr, setItemArr]: any = useState();

  useEffect(() => {
    setItemArr(apidata?.items);
    dispatch(updateInputFields(apidata?.items));
  }, [apidata, dispatch]);

  // Currency code
  const currencyCode = useSelector(
    (state: any) => state.currencyCode.currency_code
  );

  const addInputFieldHandler = () => {
    dispatch(addInputField());
  };

  const removeInputFieldHandler = (index: number, data: any) => {
    const tempArr: any = itemArr ? Array.from(itemArr) : [];
    const deletedItem = tempArr.findIndex((obj: any) => obj.id == data.id);
    tempArr.splice(deletedItem, 1);
    const items: any = itemArr
      ? itemArr.filter((item: any) => !tempArr.includes(item))
      : [];
    dispatch(items && setItemArray(items));
    dispatch(removeInputField(index));
  };

  const handleChange = (index: any, evnt: any, data: any) => {
    const { name, value }: any = evnt.target;
    dispatch(updateInputField({ index, name, value }));
  };

  return (
    <>
      <tbody>
        {inputFields.map((data: any, index: any) => {
          const { product_name, rate_amount, quantity } = data;
          let total_amount: number = Number(rate_amount) * Number(quantity);
          return (
            <tr key={index}>
              <td>
                <InputField
                  type="text"
                  onChange={(evnt: any) => handleChange(index, evnt, data)}
                  value={product_name}
                  name="product_name"
                  className="form-control rounded-1"
                  placeholder="Description of service or product..."
                />
              </td>
              <td>
                <InputField
                  type="number"
                  onChange={(evnt: any) => handleChange(index, evnt, data)}
                  value={quantity}
                  name="quantity"
                  className="form-control rounded-1 text-end"
                  placeholder="Quantity"
                  onKeyPress={onKeyPressEvent}
                />
              </td>
              <td>
                <div className="input-group">
                  <span
                    className="input-group-text bg-transparent"
                    id="basic-addon1"
                  >
                    {currencyCode}
                  </span>
                  <InputField
                    type="number"
                    onChange={(evnt: any) => handleChange(index, evnt, data)}
                    value={rate_amount}
                    name="rate_amount"
                    onKeyPress={onKeyPressEvent}
                    className="form-control border-start-0 text-end"
                  />
                </div>
              </td>
              <td>
                <div className="input-group">
                  <span
                    className="input-group-text bg-transparent"
                    id="basic-addon1"
                  >
                    {currencyCode}
                  </span>
                  <InputField
                    type="number"
                    onChange={(evnt: any) => handleChange(index, evnt, data)}
                    value={total_amount}
                    name="total_amount"
                    className="form-control border-start-0 text-end"
                    isReadOnly={true}
                  />
                </div>
              </td>
              <td className="align-middle">
                <div>
                  {inputFields.length !== 1 ? (
                    <FontAwesomeIcon
                      icon={faSquareMinus}
                      className="fa-solid fa-square-minus"
                      onClick={() => removeInputFieldHandler(index, data)}
                    ></FontAwesomeIcon>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={5}>
            <button
              onClick={addInputFieldHandler}
              className="btn rounded-1 line-item-button"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="fa-solid fa-plus me-2"
              />
              Line Item
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}
export default InputFields;
