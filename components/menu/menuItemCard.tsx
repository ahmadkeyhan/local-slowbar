"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface item {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  order: number;
}

export default function MenuItemCard({
  item,
  onClick,
}: {
  item: item;
  onClick: (item: item) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-2 p-2 pb-0 rounded-2xl hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ y: -3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >

      <div className="space-y-1 flex-1 border-b-2 pb-2">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-base">{item.name}</h2>
          {item.categoryId !== "698ca3769f7b632ac3277a57" && <h3 className="font-semibold">{item.price}</h3>}
        </div>
        <p className="text-sm line-clamp-2 indent-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
