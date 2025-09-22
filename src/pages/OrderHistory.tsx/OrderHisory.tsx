/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetPaymentByIdQuery } from "@/redux/api/features/payment/payment.api";
import { useSelector } from "react-redux";
import {  selectCurrentUser } from "@/redux/api/features/auth/authSlice";

interface PaymentType {
  key: string;
  name: string;
  email: string;
  address: string;
  stripePaymentId: string;
  createdAt: string;
}

const columns: TableColumnsType<PaymentType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Stripe Payment ID",
    dataIndex: "stripePaymentId",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const OrderHistory = () => {
  const user = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useGetPaymentByIdQuery((user as any)?._id as string);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading payment</p>;

  const payment = data?.data;

  const tableData: PaymentType[] = payment
    ? [
        {
          key: payment._id,
          name: payment.name,
          email: payment.email,
          address: payment.address,
          stripePaymentId: payment.stripePaymentId,
          createdAt: new Date(payment.createdAt).toLocaleString(),
        },
      ]
    : [];

  const onChange: TableProps<PaymentType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      pagination={false}
    />
  );
};

export default OrderHistory;
