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

export const ViewTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error, customer } = useSelector(
    (state) => state.Table
  );
  console.log(data);
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
    const isDelete = confirm("Are You Sure?");
    if (isDelete) {
      dispatch(deleteCustomer(id));
      setIdSelect(0)
    }
  };
  return (
    <div className="overflow-x-auto p-20">
      <div className="flex items-center justify-between m-5 w-44">
        <span>
          <BsTrashFill size="25" onClick={() => deleteHandler(idSelect)} />
        </span>
        <span>
          <BiEditAlt
            size="25"
            onClick={() => setEditCustomer((prev) => !prev)}
          />
        </span>
        <span>
          <AiFillFileAdd
            size="25"
            onClick={() => setAddCustomer((prev) => !prev)}
          />
        </span>
      </div>
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
          />
        </Backdrop>
      )}
      <table className="table table-zebra ">
        <thead>
          <tr>
            <th>شماره فاکتور</th>
            <th>تاریخ فاکتور</th>
            <th> نام مشتری</th>
            <th>مبلغ فاکتور</th>
            <th>نوع فاکتور</th>
            <th>نحوه ارسال</th>
          </tr>
        </thead>
        <tbody>
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
      className={`cursor-pointer ${table.id == id ? "bg-gray-300" : ""}`}
      onClick={onClick}
    >
      <td>{table.number}</td>
      <td>{table.date}</td>
      <td>{table.customer}</td>
      <td>{table.amount}</td>
      <td>{table.type}</td>
      <td>{table.typeSend}</td>
    </tr>
  );
}
