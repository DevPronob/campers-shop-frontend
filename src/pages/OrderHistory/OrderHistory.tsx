import { Button, Table, Modal, message } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/api/features/auth/authSlice";
import {
  useCancleOrderMutation,
  useGetPaymentByIdQuery,
} from "@/redux/api/features/payment/payment.api";
import { useDeleteOrderMutation } from "@/redux/api/features/order/order.api";

interface PaymentType {
  key: string;
  name: string;
  email: string;
  address: string;
  status: string;
  stripePaymentId: string;
  createdAt: string;
}

const OrderHistory = () => {
  const user = useSelector(selectCurrentUser);

  const { data, error, isLoading } = useGetPaymentByIdQuery(
    (user as any)?._id as string
  );

  const [, { isLoading: cancelLoading }] =
    useCancleOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) {
    console.error(error);
    return <p className="text-center py-10 text-red-500 font-semibold">Failed to load orders</p>;
  }

  const payments = data?.data || [];

  const activePayments = payments.filter(
    (p: any) => p.status !== "canceled"
  );

  const handleCancel = (orderId: any) => {
    Modal.confirm({
      title: "Delete Order",
      content: "Are you sure you want to delete this order?",
      okText: "Yes, Delete",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await deleteOrder({ id: orderId }).unwrap();
          console.log(res);
          message.success("Order deleted successfully");
        } catch (err) {
          console.error(err);
          message.error("Failed to delete order");
        }
      },
    });
  };

  const columns: TableColumnsType<PaymentType> = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Address", dataIndex: "address" },
    { title: "Order Status", dataIndex: "status", render: (status) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    )},
    { title: "Created At", dataIndex: "createdAt" },
    { title: "Stripe Payment ID", dataIndex: "stripePaymentId" },
    {
      title: "Action",
      render: (_, record) => (
        <Button
          danger
          loading={cancelLoading}
          disabled={record.status !== "pending"}
          onClick={() => handleCancel(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const tableData: PaymentType[] = activePayments.map((p: any) => ({
    key: p._id,
    name: p.name,
    email: p.email,
    address: p.address,
    status: p.status,
    createdAt: new Date(p.createdAt).toLocaleString(),
    stripePaymentId: p.stripePaymentId,
  }));

  const onChange: TableProps<PaymentType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">My Orders</h3>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderHistory;
