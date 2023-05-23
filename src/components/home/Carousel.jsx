"use client";
import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
// https://kareemaly.github.io/react-items-carousel/

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const items = [
  {
    id: 1,
    image: "DBAFD1BA971A4121B74F356BD51127D4-removebg-preview.png",
    title: "Chocolate Mint Crème Frappuccino®",
    price: "P199",
  },
  {
    id: 2,
    image: "22f8e0db2106468d953bce434f5328a3-removebg-preview.png",
    title: "Caramel Crunch Crème Frappuccino®",
    price: "P299",
  },
  {
    id: 3,
    image: "abd48a12ed76482790f2079db420f2c4-removebg-preview.png",
    title: "Strawberry Crème Frappuccino®",
    price: "P259",
  },
  {
    id: 4,
    image: "7FD73D3C93AF43FFA84400A42EFC9F87-removebg-preview.png",
    title: "Chocolate Java Mint Frappuccino®",
    price: "P299",
  },
  {
    id: 5,
    image: "1fd99578d31f4072a52892398d8f1fa8-removebg-preview.png",
    title: "Cookie Crumble Frappuccino®",
    price: "P259",
  },
  {
    id: 5,
    image: "c297d3528849499f81322d561575d94b-removebg-preview.png",
    title: "Espresso Frappuccino®",
    price: "P259",
  },
];

const Carousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="" style={{ maxWidth: "100%", margin: "0 auto" }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={"center"}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={isMobile ? 2 : 5}
          slidesToScroll={2}
          outsideChevron={false}
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={setActiveItemIndex}
          rightChevron={<MdKeyboardArrowRight color="#fff" size={32} />}
          leftChevron={<MdKeyboardArrowLeft color="#fff" size={32} />}
        >
          {items.map((item) => {
            return (
              <Card key={item.id} className="shadow-sm rounded-2xl">
                <CardMedia
                  sx={{ height: 250 }}
                  image={item.image}
                  title={item.title}
                />
                <div className="px-3 py-3">
                  <Typography className="font-bold text-md md:text-lg">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                </div>
                <div className="px-3 mb-3">
                  <Button
                    className="w-full bg-[#333333] hover:bg-[#5C5C5C] text-white"
                    variant="contained"
                    size="small"
                  >
                    Buy
                  </Button>
                </div>
              </Card>
            );
          })}
        </ItemsCarousel>
      </div>
    </>
  );
};

export default Carousel;
