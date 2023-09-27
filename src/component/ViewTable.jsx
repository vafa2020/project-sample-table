/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getCustomer,
  deleteCustomer,
} from "../features/table/action";
import { Loading } from "./Loading";
import { BsTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { AddCusomer } from "./AddCusomer";
import { Backdrop } from "./Backdrop";
import { commaMoney } from "../utility/currencyFormat";
import toast from "react-hot-toast";

export const ViewTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error, customer } = useSelector(
    (state) => state.Table
  );
  const [idSelect, setIdSelect] = useState(0);
  const [addCustomer, setAddCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  useEffect(() => {
    if (editCustomer) {
      dispatch(getCustomer(idSelect));
    }
  }, [editCustomer, idSelect, dispatch]);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>error</p>;
  }
  const deleteHandler = (id) => {
    if (id > 0) {
      const isDelete = confirm("Are You Sure?");
      if (isDelete) {
        dispatch(deleteCustomer(id));
        setIdSelect(0);
      }
    } else {
      toast.error("ردیفی انتخاب نشده است.");
    }
  };
  const editHandler = (id) => {
    if (id > 0) {
      setEditCustomer(true);
    } else {
      toast.error("ردیفی انتخاب نشده است.");
    }
  };
  return (
    <div className="overflow-x-auto p-20">
      <Actions
        onRemove={() => deleteHandler(idSelect)}
        onAdd={() => setAddCustomer((prev) => !prev)}
        onEdit={() => editHandler(idSelect)}
        id={idSelect}
      />
      {addCustomer && (
        <Backdrop>
          <AddCusomer close={setAddCustomer} />
        </Backdrop>
      )}

      {customer !== null && editCustomer && (
        <Backdrop>
          <AddCusomer
            edit={editCustomer}
            customer={customer}
            close={setEditCustomer}
            setIdSelect={setIdSelect}
          />
        </Backdrop>
      )}
      <table className="table">
        <thead className="border-b text-xl dark:border-neutral-500 bg-gray-400 text-white font-bold">
          <tr>
            <th scope="col" className="px-6 py-4">
              شماره فاکتور
            </th>
            <th scope="col" className="px-6 py-4">
              تاریخ فاکتور
            </th>
            <th scope="col" className="px-6 py-4">
              نام مشتری
            </th>
            <th scope="col" className="px-6 py-4">
              مبلغ فاکتور
            </th>
            <th scope="col" className="px-6 py-4">
              نوع فاکتور
            </th>
            <th scope="col" className="px-6 py-4">
              نحوه ارسال
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data?.map((table) => (
            <TableRow
              key={table.id}
              table={table}
              onClick={() => setIdSelect(table.id)}
              id={idSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function TableRow(props) {
  // eslint-disable-next-line react/prop-types
  const { table, onClick, id } = props;
  return (
    <tr
      className={`cursor-pointer border-b transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-500 dark:hover:bg-neutral-300 ${
        table.id == id ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <td className="whitespace-nowrap px-6 py-4">{table.number}</td>
      <td className="whitespace-nowrap px-6 py-4">{table.date}</td>
      <td className="whitespace-nowrap px-6 py-4">{table.customer}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {commaMoney(table.amount)}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{table.type}</td>
      <td className="whitespace-nowrap px-6 py-4">{table.typeSend}</td>
    </tr>
  );
}

function Actions({ onRemove, onEdit, onAdd, id }) {
  return (
    <div className="flex items-center justify-between m-5 w-44">
      <span>
        <BsTrashFill
          className={`cursor-pointer hover:text-red-500 ${
            id > 0 ? "text-green-500" : ""
          }`}
          size="30"
          onClick={onRemove}
        />
      </span>
      <span>
        <BiEditAlt
          className={`cursor-pointer hover:text-red-500 ${
            id > 0 ? "text-green-500" : ""
          }`}
          size="30"
          onClick={onEdit}
        />
      </span>
      <span>
        <AiFillFileAdd
          className="cursor-pointer hover:text-red-500"
          size="30"
          onClick={onAdd}
        />
      </span>
    </div>
  );
}
