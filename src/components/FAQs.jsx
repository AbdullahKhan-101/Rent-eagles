"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQs = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="">
      <div className="flex xl:flex-row gap-x-6 flex-col">
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="What do I need to book a car on Rent Eagles?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Do I need my own insurance?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="Can other people drive a car that I booked?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 3"
            title="What is the cancellation policy on Rent Eagles?"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem
            key="5"
            className="!border-t border-t-gray-300 xl:!border-0"
            aria-label="Accordion 1"
            title="What happens if I have an accident?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="Accordion 2"
            title="Can I get my car delivered to me?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="7"
            aria-label="Accordion 3"
            title="How do I get discounts when booking a car?"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
