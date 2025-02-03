import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const PaymentCard = ({ tenantName, amountDue }) => {
  return (
    <Card className="bg-dark text-white mb-4">
      <CardBody>
        <CardTitle tag="h5">{tenantName}</CardTitle>
        <CardText>
          Amount Due: <strong>{amountDue}</strong>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
