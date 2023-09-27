/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, editCustomer } from "../features/table/action";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
export const AddCusomer = ({ customer, edit, close }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    customer?.id ? { persian: customer.date } : { format: "MM/DD/YYYY" }
  );
  const [selectValue, setSelectValue] = useState(
    customer?.id ? customer.typeSend : ""
  );
  const [inputValues, setInputValues] = useState({
    number: customer?.id ? customer.number : "",
    customer: customer?.id ? customer.customer : "",
    amount: customer?.id ? customer.amount : "",
    type: customer?.id ? customer.type : "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const convert = (date, format = date.format) => {
    let object = { date, format };

    setDate({
      gregorian: new DateObject(object).format(),
      persian: new DateObject(object).convert(persian, persian_en).format(),
      jsDate: date.toDate(),
      ...object,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!edit) {
      dispatch(
        addCustomer({
          ...inputValues,
          typeSend: selectValue,
          date: date.persian,
        })
      );
      close(false);
    }

    dispatch(
      editCustomer({
        ...inputValues,
        typeSend: selectValue,
        date: date.persian,
        id: customer.id,
      })
    );
    close(false);
  };
  return (
    <>
      <form onSubmit={submitHandler} className="">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="number"
              className="block text-gray-700 font-bold mb-2 text-lg"
            >
              شماره فاکتور
            </label>
            <input
              type="text"
              value={inputValues.number}
              name="number"
              id="number"
              onChange={handleInputs}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              تاریخ فاکتور
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={date.persian}
              onChange={convert}
              calendarPosition="bottom-right"
            />
          </div>
          <div>
            <label
              htmlFor="customer"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              نام مشتری
            </label>
            <input
              type="text"
              name="customer"
              value={inputValues.customer}
              id="customer"
              onChange={handleInputs}
              className="shadow appearance-none bord rounded w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              مبلغ فاکتور
            </label>
            <input
              type="number"
              name="amount"
              value={inputValues.amount}
              id="amount"
              onChange={handleInputs}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              نوع فاکتور
            </label>
            <input
              type="text"
              name="type"
              value={inputValues.type}
              id="type"
              onChange={handleInputs}
              className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="typeSend"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              نحوه ارسال
            </label>
            <select
              name="typeSend"
              id="typeSend"
              onChange={(e) => setSelectValue(e.target.value)}
              defaultValue={selectValue}
              value={selectValue}
              className="select w-full py-5 px-3"
            >
              <option className="" value="نقدی">
                نقدی
              </option>
              <option className="" value="پیک">
                پیک
              </option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-10 rounded cursor-pointer"
          >
            {customer?.id ? "Edit" : "Add"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-10 rounded cursor-pointer"
            onClick={() => close(false)}
          >
            Cancele
          </button>
        </div>
      </form>
    </>
  );
};
