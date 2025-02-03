import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const AccodianForDocumnets = ({ content }) => {
  const [open, setOpen] = useState("1");
  const [imageError, setImageError] = useState({});

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Accordion open={open} toggle={toggle}>
      {content?.map((x, index) => (
        <AccordionItem key={index}>
          <AccordionHeader targetId={(index + 1).toString()}>
            Document {index + 1}
          </AccordionHeader>
          <AccordionBody accordionId={(index + 1).toString()}>
            {imageError[index] ? (
              // Show the link if image is broken
              <a
                href={x}
                target="_blank"
                rel="noopener noreferrer"
                className="document-link"
                style={{color:"black",cursor:"pointer"}}
              >
              PDF Document Click here to see.
              </a>
            ) : (
              // Try to load the image
              <img
                src={x}
                alt={`Tenant Document ${index + 1}`}
                className="preview-image-tenant"
                onError={() => handleImageError(index)} // Handle error if image fails to load
              />
            )}
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccodianForDocumnets;
