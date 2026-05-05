"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "@/lib/data/categoryData";
import { getCategoryItems } from "@/lib/data/itemData";
import MenuItemCard from "./menuItemCard";
import { LuLoader, LuArrowRight } from "react-icons/lu";
import { Button } from "../ui/button";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
}

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  order: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function MenuCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const badgeRowRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // scroll the active badge into view
  useEffect(() => {
    if (activeCategory && badgeRefs.current[activeCategory]) {
      badgeRefs.current[activeCategory]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = async (categoryId: string) => {
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoadingItems(true);
    try {
      const data = await getCategoryItems(categoryId);
      setItems(data);
    } catch (error) {
      console.error("Error loading items:", error);
      setItems([]);
    }
    setLoadingItems(false);
  };

  const handleBackToGrid = () => {
    setActiveCategory(null);
    setItems([]);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const activeCategoryData = categories.find((c) => c._id === activeCategory);

  // Category grid view
  if (!activeCategory) {
    return (
      <div className="space-y-6">
        {categories.length === 0 ? (
          <div className="py-24 flex justify-center items-center">
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 text-lavender flex justify-center items-center"
            >
              <LuLoader />
            </motion.div> */}
            <video autoPlay loop muted className=" mix-blend-multiply">
                <source src="/logoMotion.mp4"></source>
              </video>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-2">
            {categories.map((category, index) => (
              <motion.button
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCategoryClick(category._id)}
                className="relative rounded-[18px] p-2 pb-6 text-start font-bold text-xl transition-shadow hover:shadow-lg"
              >
                <div className="absolute w-9 -mr-2 -mt-2 mix-blend-overlay">
                  <Image src="/comma.png" width={161} height={273} alt="comma"/>
                </div>
                <h2>{category.name}</h2>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Items view with sticky badge row
  return (
    <div className="space-y-2 min-h-screen">
      {/* Back button */}
      <Button
        variant="secondary"
        onClick={handleBackToGrid}
      >
        <span>بازگشت</span>
        <LuArrowRight className="w-4 h-4" />
      </Button>

      {/* Sticky category badge row */}
      <div className="sticky top-15 z-10 bg-white/90 backdrop-blur-sm">
        <div
          ref={badgeRowRef}
          className="flex gap-2 overflow-x-auto py-2"
        >
          {categories.map((category) => {
            const isActive = category._id === activeCategory;
            return (
              <button
                key={category._id}
                ref={(el) => { badgeRefs.current[category._id] = el; }}
                onClick={() => handleCategoryClick(category._id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo text-white"
                    : "bg-indigo/5 text-indigo/60 hover:bg-indigo/10"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>


      {/* Items grid */}
      {loadingItems ? (
        <div className="py-12 flex justify-center items-center">
          {/* <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-5 h-5 text-lavender flex justify-center items-center"
          >
            <LuLoader />
          </motion.div> */}
          <video autoPlay loop muted className=" mix-blend-multiply">
                <source src="/logoMotion.mp4"></source>
              </video>
        </div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center text-indigo/50">
          <p>آیتمی در این دسته‌بندی وجود ندارد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 p-3 rounded-2xl text-indigo">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.05 }}
              >
                <MenuItemCard item={item} onClick={handleItemClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
