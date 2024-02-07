import Entrepreneurs from "@/components/Host/home/Entrepreneurs";
import Hosthomebanner from "@/components/Host/home/Hosthomebanner";
import Infrastructure from "@/components/Host/home/Infrastructure";
import Overlaptext from "@/components/Host/home/Overlaptext";
import Planarea from "@/components/Host/home/Planarea";
import MultiplePara from "@/components/rent-a-jeep/MultiplePara";
import React from "react";

const Index = () => {
  const multiparalist2 = [
    {
      heading: "Scalable",
      para: "You choose how many cars to share, scaling your business up or down however you want, and whether to reinvest your earnings or cash out.",
    },
    {
      heading: "Accessible",
      para: "Start with a car you already own or buy one to share — any car owner can start exercising their entrepreneurial muscles.",
    },
    {
      heading: "Flexible",
      para: "Whether you want to commit a lot of time or a little, you can earn at home or on the go, on your schedule, and divest any time.",
    },
  ];
  return (
    <>
      <Hosthomebanner />
      <MultiplePara
        heading={"Build a business that’s..."}
        MultiplePara={multiparalist2}
        btn_link={"/host/sign-up"}
      />
      <Entrepreneurs />
      <Infrastructure />
      <Overlaptext />
      <Planarea />
    </>
  );
};

export default Index;
