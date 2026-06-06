import { useGetAllPaymentsQuery, useUpdatePaymentStatusMutation } from '@/redux/api/features/payment/payment.api';
import { Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast } from "sonner";

type PaymentType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  stripePaymentId: string;
};
export const ORDER_STATUS ={
    PENDING:"pending",
    SUCCESS:"success",
    PROSSESSING:"processing",
    FAILED:"failed",
    CANCELLED:"cancelled",
    IN_TRANSIT:"in_transit"
}

function OrderManagement() {
  const { data, isLoading } = useGetAllPaymentsQuery(undefined);
  const [updateStatus] = useUpdatePaymentStatusMutation();
  const payments: PaymentType[] = data?.data || [];

  const handleChangeStatus = async (id: string, status: string) => {
    console.log("Changing status", id, status);
    
      const res =await updateStatus({ id, status }).unwrap();
      console.log(res,"Update response");
      toast.success("Status updated");
  };

  const columns: ColumnsType<PaymentType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: 130 }}
          onChange={(value) => handleChangeStatus(record._id, value)}
          options={[
            { label: "Pending", value: ORDER_STATUS.PENDING },
            { label: "Processing", value: ORDER_STATUS.PROSSESSING },
            { label: "Success", value: ORDER_STATUS.SUCCESS },
            { label: "Failed", value: ORDER_STATUS.FAILED },
            { label: "Cancelled", value: ORDER_STATUS.CANCELLED },
            { label: "In Transit", value: ORDER_STATUS.IN_TRANSIT }
          ]}
        />
      )
    },
    { title: "Transaction ID", dataIndex: "stripePaymentId", key: "stripePaymentId" }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={payments}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default OrderManagement;
