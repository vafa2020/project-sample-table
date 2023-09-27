/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, editCustomer } from "../features/table/action";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import Select from "react-select";

const options = [
  { value: "انتخاب", label: "انتخاب" },
  { value: "نقدی", label: "نقدی" },
  { value: "پیک", label: "پیک" },
];
export const AddCusomer = ({ customer, edit, close }) => {
  console.log(customer);
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    customer?.id ? { persian: customer.date } : { format: "MM/DD/YYYY" }
  );
  const [selectValue, setSelectValue] = useState(
    customer?.id && edit ? customer.typeSend : ""
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
          typeSend: selectValue.value,
          date: date.persian,
        })
      );
      close(false);
    }

    dispatch(
      editCustomer({
        ...inputValues,
        typeSend: selectValue.value,
        date: date.persian,
        id: customer.id,
      })
    );
    close(false);
  };

  return (
    <form onSubmit={submitHandler} className="">
      <div className="grid grid-cols-2 gap-4">
        <InputComponent
          name="number"
          value={inputValues.number}
          label="شماره فاکتور"
          handleInputs={handleInputs}
        />
        <InputComponent name="date" label="تاریخ فاکتور">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={date.persian}
            onChange={convert}
            calendarPosition="bottom-right"
          />
        </InputComponent>
        <InputComponent
          name="customer"
          value={inputValues.customer}
          label="نام مشتری"
          handleInputs={handleInputs}
        />
        <InputComponent
          name="amount"
          value={inputValues.amount}
          label="مبلغ فاکتور"
          handleInputs={handleInputs}
          type="number"
        />
        <InputComponent
          name="type"
          value={inputValues.type}
          label="نوع فاکتور"
          handleInputs={handleInputs}
          type="text"
        />
        <InputComponent name="typeSend" label="نحوه ارسال">
          <Select
            defaultValue={selectValue}
            onChange={setSelectValue}
            options={options}
            id="typeSend"
            name="typeSend"
          />
        </InputComponent>
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
  );
};

function InputComponent({
  type = "text",
  label,
  name,
  handleInputs,
  value,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-gray-700 font-bold mb-2 text-lg"
      >
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={handleInputs}
          className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  );
}
