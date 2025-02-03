import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../component/PaymentModel.css";
import { mainAxios } from "service/api";
import { API_URL } from "service/constant";
const initial = {
  rentPaid: "",
  lightBillPaid: "",
  description: "",
};

const PaymentModal = ({ id, toggle, isOpen, handlePayment }) => {
  const [formData, setFormData] = useState(initial);
  // console.log({paymentDetails})
  const getPaymentDetails = async (id) => {
    const res = await mainAxios.get(`${API_URL}/payment/payment-details/${id}`);
    console.log({ res });
    const payment = res?.data?.payments[0];
    console.log({ payment });
    setFormData({
      rentPaid: payment?.rentPaid || 0,
      lightBillPaid: payment?.lightBillPaid || 0,
      description: payment?.description || "",
    });
  };

  console.log({ formData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handlePayment(formData); // Pass data to parent function
    toggle();
  };
  useEffect(() => {
    if (id) {
      getPaymentDetails(id);
    }
  }, [id]);
  console.log({ formData });
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered className="payment-modal">
      <ModalHeader toggle={toggle}>Payment Details</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="rentPaid">Rent Paid</Label>
            <Input
              type="number"
              name="rentPaid"
              id="rentPaid"
              placeholder="Enter rent amount"
              value={formData.rentPaid}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lightBillPaid">Light Bill Paid</Label>
            <Input
              type="number"
              name="lightBillPaid"
              id="lightBillPaid"
              placeholder="Enter light bill amount"
              value={formData.lightBillPaid}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Additional details"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Confirm Payment
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentModal;
