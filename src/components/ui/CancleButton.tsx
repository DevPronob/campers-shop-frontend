import { useCancleOrderMutation } from "@/redux/api/features/payment/payment.api";
import { Button, Modal, message } from "antd";


const CancelButton = ({ paymentId }: { paymentId: string }) => {
  const [cancelPayment, { isLoading }] = useCancleOrderMutation();

  const handleCancel = () => {
    Modal.confirm({
      title: "Cancel Order",
      content: "Are you sure you want to cancel this order?",
      okText: "Yes, Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await cancelPayment(paymentId).unwrap();
          message.success("Order canceled successfully");
        } catch (error) {
          message.error("Failed to cancel order");
        }
      },
    });
  };

  return (
    <Button danger loading={isLoading} onClick={handleCancel}>
      Cancel
    </Button>
  );
};

export default CancelButton;
