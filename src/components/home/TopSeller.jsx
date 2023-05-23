"use client";
// import React from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Carousel from "./Carousel";

const TopSeller = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const items = [
    {
      id: 1,
      image:
        "https://globalassets.starbucks.com/assets/39bab62a29214270b6b30eb838e2c5a6.jpg?impolicy=1by1_wide_topcrop_630",
      title: "Caramel Apple Spice",
      price: "P199",
    },
    {
      id: 2,
      image:
        "https://globalassets.starbucks.com/assets/6b385ad21e7245788eb2d2754ab6f823.jpg?impolicy=1by1_wide_topcrop_630",
      title: "White Hot Chocolate",
      price: "P299",
    },
    {
      id: 3,
      image:
        "https://globalassets.starbucks.com/assets/677d276173ec4bc192c2b9a21776339f.jpg?impolicy=1by1_wide_topcrop_630",
      title: "Hot Chocolate",
      price: "P259",
    },
  ];

  return (
    <>
      <section
        id="top-seller"
        className="h-screen flex justify-center bg-[#FAFAFA]"
      >
        <div className="w-11/12 min:h-72 px-5">
          <div className="mt-14 mb-14">
            <h1 className="text-2xl font-semibold">Best Seller</h1>
          </div>
          <div className="flex gap-3">
            <Carousel />
          </div>
        </div>
      </section>
    </>
  );
};

export default TopSeller;
