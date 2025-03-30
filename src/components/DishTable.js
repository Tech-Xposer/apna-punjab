// "use client";

// import React, { useEffect, useState } from "react";

// import { Switch } from "./ui/switch";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Londrina_Solid } from "next/font/google";

// const londrina = Londrina_Solid({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-londrina",
// });

// export default function DishesTable() {
//   const [dishes, setDishes] = useState([]);
//   const fetchDishes = async () => {
//     console.log("fetching dishes");
//     try {
//       const response = await fetch("/api/categories/dishes");
//       const data = await response.json();
//       setDishes(data);
//     } catch (error) {
//       console.error("Error fetching dishes:", error);
//     }
//   };
//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   const handleChecked = async (categoryId, dishId, current) => {
//     setDishes((prev) => {
//       return prev.map((category) => {
//         if (category._id === categoryId) {
//           return {
//             ...category,
//             dishes: category.dishes.map((dish) => {
//               if (dish._id === dishId) {
//                 return {
//                   ...dish,
//                   isActive: current,
//                 };
//               }
//               return dish;
//             }),
//           };
//         }
//         return category;
//       });
//     });
//     try {
//       const response = await fetch(`/api/categories/dishes`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ categoryId, dishId, isActive: current }),
//       });
//       const data = await response.json();

//       fetchDishes();
//       console.log("Dish updated:", data);
//     } catch (error) {
//       console.error("Error updating dish:", error);
//     }
//   };

//   return (
//     <div className="w-full ">
//       <div className="relative flex justify-center items-center p-5 bg-orange-400 px-5 ">
//         <img src="/images/apna.png" alt="Logo" className="absolute left-5 " />
//         <h1 className={`${londrina.className} text-5xl text-white`}>
//           Dashboard
//         </h1>
//       </div>

//       <div className="rounded-md ">
//         {dishes.length > 0 &&
//           dishes?.map((category) => {
//             return (
//               <div className="w-full p-10" key={category._id}>
//                 <h1 className={`text-3xl font-bold ${londrina.className}`}>
//                   {category.name}
//                 </h1>
//                 <div className="space-y-2 mt-5">
//                   <div className="flex justify-between my-5">
//                     <h3 className="text-2xl font-bold">Name</h3>
//                     <h3 className="text-2xl font-bold">Price</h3>
//                     <h3 className="text-2xl font-bold">Actions</h3>
//                   </div>
//                   {category.dishes.map((dish) => {
//                     return (
//                       <DialogComponent
//                         key={dish._id}
//                         incomingDish={dish}
//                         category={category}
//                         handleChecked={handleChecked}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// const DialogComponent = ({ incomingDish, category, handleChecked }) => {
//   const [dish, setDish] = useState(incomingDish);
//   const handleEdit = (e) => {
//     const { name, value } = e.target;
//     setDish((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };
//   return (
//     <div className="flex justify-between items-center" key={dish._id}>
//       <h1 className="text-xl font-semibold">{dish.name}</h1>
//       <div className="text-lg">
//         {dish.priceOptions.map((option) => (
//           <div key={option._id}>
//             {option.quantity} pcs - ${option.price} - $
//             {option.pricev2 && `${option.pricev2}`}
//           </div>
//         ))}
//       </div>

//       <div className="space-x-5">
//         <Dialog>
//           <DialogTrigger>
//             <div className="bg-white text-orange-500  hover:bg-orange-100 px-4 py-2  rounded-lg">
//               Edit
//             </div>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Dish</DialogTitle>
//             </DialogHeader>
//             <div>
//               <Input
//                 type="text"
//                 defaultValue={dish.name}
//                 name="name"
//                 onChange={handleEdit}
//               />
//               {dish.name}
//               <DialogDescription>{dish.description}</DialogDescription>
//               {dish.priceOptions.map((option) => (
//                 <p key={option._id}>
//                   {option.quantity} pcs - ${option.price}{" "}
//                   {option.pricev2 && `$ ${option.pricev2}`}
//                 </p>
//               ))}
//             </div>
//             <DialogFooter className="sm:justify-start">
//               <DialogClose asChild>
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="text-orange-500"
//                 >
//                   Close
//                 </Button>
//               </DialogClose>
//               <Button type="submit" className="text-white bg-orange-400">
//                 Save changes
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         <Switch
//           checked={dish.isActive}
//           onCheckedChange={(current) =>
//             handleChecked(category._id, dish._id, current)
//           }
//         />
//       </div>
//     </div>
//   );
// };
"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-londrina",
});

export default function DishesTable() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch("/api/categories/dishes");
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleChecked = async (categoryId, dishId, isActive) => {
    setDishes((prev) =>
      prev.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              dishes: category.dishes.map((dish) =>
                dish._id === dishId ? { ...dish, isActive } : dish
              ),
            }
          : category
      )
    );

    try {
      await fetch(`/api/categories/dishes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, dishId, isActive }),
      });
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center p-5 bg-orange-400">
        <img src="/images/apna.png" alt="Logo" className="absolute left-5" />
        <h1 className={`${londrina.className} text-5xl text-white`}>
          Dashboard
        </h1>
      </div>
      <div className="rounded-md">
        {dishes.map((category) => (
          <div className="w-full p-10" key={category._id}>
            <h1 className={`text-3xl font-bold ${londrina.className}`}>
              {category.name}
            </h1>
            <table className="space-y-2 mt-5" width={"100%"}>
              <tr className="my-5 text-2xl font-bold border-b">
                <td className="p-4">Name</td>
                <td className="p-4">Price</td>
                <td className="p-4">Actions</td>
              </tr>

              {category.dishes.map((dish) => (
                <DialogComponent
                  key={dish._id}
                  dish={dish}
                  categoryId={category._id}
                  handleChecked={handleChecked}
                />
              ))}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

const DialogComponent = ({ dish, categoryId, handleChecked }) => {
  const [editedDish, setEditedDish] = useState(dish);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditedDish((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <tr className="border-b">
      <td className="p-4 text-xl font-semibold">{dish.name}</td>
      <td className="p-4 text-start">
        <div className="text-lg">
          {dish.priceOptions.map((option) => (
            <div key={option._id}>
              {option.quantity} pcs - ${option.price}{" "}
              {option.pricev2 && `- $${option.pricev2}`}
            </div>
          ))}
        </div>
      </td>
      <td className="p-4 space-x-5 flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="bg-white text-orange-500 hover:bg-orange-100 px-4 py-2 rounded-lg"
              disabled
            >
              Edit
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Dish</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                type="text"
                value={editedDish.name}
                name="name"
                onChange={handleEdit}
              />
              <DialogDescription>{dish.description}</DialogDescription>
              {dish.priceOptions.map((option) => (
                <p key={option._id}>
                  {option.quantity} pcs - ${option.price}{" "}
                  {option.pricev2 && `- $${option.pricev2}`}
                </p>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" className="text-orange-500">
                  Close
                </Button>
              </DialogClose>
              <Button className="text-white bg-orange-400">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Switch
          checked={dish.isActive}
          onCheckedChange={(current) =>
            handleChecked(categoryId, dish._id, current)
          }
        />
      </td>
    </tr>
  );
};
