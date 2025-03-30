"use client";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useCart } from "../CartLayout";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import Image from "next/image";
import { Toaster } from "@components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-londrina",
});

const Page = () => {
  const [dishes, setDishes] = useState([]);

  const { location, setLocation } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/categories/dishes");
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div
      className={`w-full bg-gradient-to-r from-white via-orange-300 to-orange-400 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black ${londrina.className} `}
    >
      {location === null ? (
        <div className="flex flex-col items-center justify-center h-screen gap-5 ">
          <Image
            src="/images/apna.png"
            alt="logo"
            width={100}
            height={100}
            priority
            className="w-86"
          />
          <h1 className="text-2xl font-bold text-white mb-4">
            Please select a location
          </h1>
          <Button
            onClick={() => setLocation("Carte - La Courneuve")}
            className="bg-white text-lg text-black w-100 h-12 flex items-center justify-between hover:bg-white hover:text-orange-400"
          >
            <img
              src="https://ugc.production.linktr.ee/cb707375-f0e9-4721-9621-9be332e8b25b_1000-F-361351260-0jHQlRZZpIzupd2kogx6Xn7kd8H2zgVq.jpeg?io=true&size=thumbnail-stack-v1_0"
              alt=""
              className="w-10 h-10"
            />
            Carte - La Courneuve
            <div></div>
          </Button>
          <Button
            onClick={() => setLocation("Carte - PARIS 13")}
            className="bg-white text-lg text-black w-100 h-12 flex items-center justify-between hover:bg-white hover:text-orange-400"
          >
            <img
              src="https://ugc.production.linktr.ee/15bc8733-bdb0-4faf-9339-0e6a8074eb33_AP---TAMPON.png?io=true&size=thumbnail-stack-v1_0"
              alt=""
              className="w-10 h-10 "
            />
            Carte - PARIS 13
            <div></div>
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="text-6xl font-semibold text-white text-center pt-10">
            Menu
          </h2>
          <div className="px-20">
            {dishes.map((category) => (
              <Category key={category._id} category={category} />
            ))}
            <Button
              onClick={() => router.push("/cart")}
              className="fixed bottom-5 right-5 bg-white text-orange-500 text-2xl px-10 py-7 hover:bg-white hover:text-orange-400 "
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

const Category = ({ category }) => {
  return (
    <div className="mb-6">
      <h2 className="text-4xl font-semibold text-orange-500 font-londrina">
        {category.name}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center mt-4">
        {category.dishes.map((dish) => (
          <Dish key={dish._id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

const Dish = ({ dish }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, location, cart } = useCart(); // Use only one useCart()
  const [selectedOption, setSelectedOption] = useState(null);
  const [price, setPrice] = useState(null);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Fix decrement logic

  const handleAddToCart = () => {
    console.log(dish, "dish");
    if (!selectedOption === "" || !selectedOption || selectedOption === null) {
      toast.error("Please select an option");
      return;
    }
    addToCart(
      {
        _id: dish._id,
        name: dish.name,
        option: selectedOption,
        // price: selectedOption.split(" - ").pop().replace("$", ""),
        price,
      },
      quantity
    );
    toast.success("Item added to cart");
  };
  useEffect(() => {
    const option = dish.priceOptions[0];
    const optionValue = `${
      option.quantity ? option.quantity + "pcs - " : ""
    } $${location === "Carte - La Courneuve" ? option.price : option.pricev2}`;

    setSelectedOption(optionValue);
    setPrice(
      location === "Carte - La Courneuve" ? option.price : option.pricev2
    );
  }, [dish, location]);

  return (
    <div className="p-4 border rounded-lg bg-white text-black w-64 relative flex flex-col  h-full">
      <div className="flex-1 pb-10">
        <h2 className="text-2xl font-semibold uppercase --font-londrina-solid">
          {dish.name}
        </h2>{" "}
        {/* in caps*/}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className={"text-xl"}>Items</AccordionTrigger>
            <AccordionContent>
              <p className="text-lg text-gray-700">{dish.description}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {dish?.priceOptions.map((option) => (
            <div
              key={option._id}
              className="flex items-center space-x-2"
              onClick={() =>
                setPrice(
                  location === "Carte - La Courneuve"
                    ? option.price
                    : option.pricev2
                )
              }
            >
              <RadioGroupItem
                value={`${option.quantity ? option.quantity + "pcs - " : ""} $${
                  location === "Carte - La Courneuve"
                    ? option.price
                    : option.pricev2
                }`}
                id={`${option.quantity}-${
                  location === "Carte - La Courneuve"
                    ? option.price
                    : option.pricev2
                }`}
              />
              <Label htmlFor={`radio-${option._id}`} className="text-lg">
                {option.quantity ? `${option.quantity} pcs - ` : ""}$
                {location === "Carte - La Courneuve"
                  ? option.price
                  : option.pricev2}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="w-full bg-white p-2 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Button
            onClick={decrement}
            disabled={quantity === 0}
            className="bg-orange-400 text-white hover:bg-orange-300"
          >
            -
          </Button>
          <span className="px-3">{quantity}</span>
          <Button
            onClick={increment}
            className="bg-orange-400 text-white hover:bg-orange-300"
          >
            +
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-orange-400 text-white hover:bg-orange-300 text-xl"
          disabled={!dish.isActive}
        >
          {dish.isActive ? "Add to Cart" : "Unavailable"}
        </Button>
      </div>
    </div>
  );
};

// const Dish = ({ dish }) => {
//   const [quantity, setQuantity] = useState(0);
//   const { addToCart, location } = useCart();

//   const { cart } = useCart();

//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     console.log(dish, "dish");
//     addToCart(dish, quantity);
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-white text-black w-48">
//       <h3 className="text-lg font-semibold">{dish.name}</h3>
//       <p className="text-sm text-gray-700">{dish.description}</p>
//       {dish?.priceOptions.map((option) => {
//         return (
//           <p key={option._id} className="text-md font-bold mt-2">
//             {option.quantity} pcs - $
//             {location === "Carte - La Courneuve"
//               ? option.price
//               : option.pricev2}
//           </p>
//         );
//       })}
//       <RadioGroup defaultValue="comfortable">
//         {dish?.priceOptions.map((option) => {
//           return (
//             <div className="flex items-center space-x-2">
//               <RadioGroupItem value="default" id="r1" />
//               <Label htmlFor="r1">
//                 {option.quantity} pcs - ${" "}
//                 {location === "Carte - La Courneuve"
//                   ? option.price
//                   : option.pricev2}
//               </Label>
//             </div>
//           );
//         })}
//       </RadioGroup>
//       <div className="flex items-center gap-2 mt-3">
//         <Button onClick={decrement} disabled={quantity === 0}>
//           -
//         </Button>
//         <span className="px-3">{quantity}</span>
//         <Button onClick={increment}>+</Button>
//       </div>
//       <Button
//         onClick={handleAddToCart}
//         className="mt-3 w-full"
//         disabled={!dish.isActive}
//       >
//         Add to Cart
//       </Button>
//     </div>
//   );
// };
