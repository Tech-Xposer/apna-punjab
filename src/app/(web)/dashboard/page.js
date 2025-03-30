import AddDish from "@components/dish-model";
import React from "react";
import Image from "next/image";
import DishesTable from "@components/DishTable";

const page = () => {
  return (
    <div className="w-full bg-orange-50 min-h-screen">
      <DishesTable />
    </div>
  );
};

export default page;
