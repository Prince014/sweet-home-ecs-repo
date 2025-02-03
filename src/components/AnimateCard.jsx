import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const AnimatedCard = ({ title, description }) => {
  return (
    <Card className="bg-dark text-white mb-4">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
};

export default AnimatedCard;
