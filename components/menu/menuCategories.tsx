"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/data/categoryData";
import { getCategoryItems } from "@/lib/data/itemData";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import AnimatedSection from "../animatedSection";

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
  available: boolean;
}

interface CategoryItems {
  [key : string] : {
    categoryName: string
    items:Item[]
  }
}

export default function MenuCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItems>({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      const loadPromises = data.map(async (category: Category) => {
        const categoryId = category._id
        const categoryName = category.name
        try {
          const items = await getCategoryItems(categoryId)
          return {categoryId, categoryName, items}
        } catch (error) {
          console.error(`Error loading items for category ${categoryId}:`, error)
          return { categoryId, categoryName, items: [] }
        }
      })

      const results = await Promise.all(loadPromises)

      const newCategoryItems = { ...categoryItems }
      results.forEach(({ categoryId, categoryName, items }) => {
        newCategoryItems[categoryId] = {categoryName, items}
      })
      setIsLoading(false)

      console.log(newCategoryItems)

      setCategoryItems(newCategoryItems)
    };
    loadCategories();
  }, []);

  const HotEspresso = function() {
    const {categoryName, items} = categoryItems["69f9e2d9024e37a427546367"] || []
    return (
      <div className="absolute top-[8vw] right-[7vw] w-[36vw] space-y-[0.6vw]">
        <h2 className="text-center text-[4.5vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const ColdEspresso = function() {
    const {categoryName, items} = categoryItems["69f9e30a024e37a427546368"] || []
    return (
      <div className="absolute top-[72vw] right-[7vw] w-[36vw] space-y-[0.6vw]">
        <h2 className="text-center text-[4.5vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div className="flex">
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Brew = function() {
    const {categoryName, items} = categoryItems["69f9e370024e37a427546369"] || []
    return (
      <div className="absolute top-[118vw] left-[5.5vw] w-[38.5vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mb-[3vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-purple">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Tea = function() {
    const {categoryName, items} = categoryItems["69f9e3a0024e37a42754636b"] || []
    return (
      <div className="absolute top-[178vw] left-[9vw] w-[36vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mb-[3vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const HotMilk = function() {
    const {categoryName, items} = categoryItems["69f9e3b9024e37a42754636c"] || []
    return (
      <div className="absolute top-[5.5vw] right-[11vw] w-[44vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mr-[-4vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div className="flex">
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const MilkShake = function() {
    const {categoryName, items} = categoryItems["69f9e407024e37a42754636d"] || []
    return (
      <div className="absolute top-[10vw] right-[10vw] w-[36vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mr-[-2vw] mb-[4vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div className="flex">
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-purple">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Smoothie = function() {
    const {categoryName, items} = categoryItems["69f9e411024e37a42754636e"] || []
    return (
      <div className="absolute top-[10vw] right-[50vw] w-[40vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mb-[4vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div className="flex">
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-purple">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const ColdBar = function() {
    const {categoryName, items} = categoryItems["69f9e427024e37a42754636f"] || []
    return (
      <div className="absolute top-[8vw] right-[8vw] w-[84vw] flex gap-[4vw]">
        <div className="space-y-[0.6vw] w-[40vw]">
          <h2 className="text-[4.5vw]">{categoryName}</h2>
          {items.filter((item,index) => index<3).map((item: Item) => {
            return (
              <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
                <div>
                  <p>{item.name}</p>
                  {item.description && <p className="text-[3vw]">{item.description}</p>}
                </div>
                <p className="text-orange">{formatCurrency(item.price)}</p>
              </div>
            )
          })}
        </div>
        <div className="space-y-[2.4vw] w-[40vw] pt-[7.2vw]">
          {items.filter((item,index) => index>2).map((item: Item) => {
            return (
              <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
                <div>
                  <p>{item.name}</p>
                  {item.description && <p className="text-[3vw]">{item.description}</p>}
                </div>
                <p className="text-orange">{formatCurrency(item.price)}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const Beer = function() {
    const {categoryName, items} = categoryItems["69f9e450024e37a427546370"] || []
    return (
      <div className="absolute top-[48vw] right-[9.5vw] w-[32vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw]">{categoryName}</h2>
        <p className="mb-[2vw] text-[3vw]">
          (+ساید بادام‌زمینی)
        </p>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Appetizer = function() {
    const {categoryName, items} = categoryItems["69f9e460024e37a427546371"] || []
    return (
      <div className="absolute top-[130vw] left-[12vw] w-[42vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mb-[3vw] text-center">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-purple">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Cake = function() {
    const {categoryName, items} = categoryItems["69f9e47c024e37a427546372"] || []
    return (
      <div className="absolute top-[12vw] right-[8vw] w-[32vw] space-y-[0.6vw]">
        <h2 className="text-[4vw] mb-[4vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.5vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[2.8vw]">{item.description}</p>}
              </div>
              <p className="text-purple">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Pasta = function() {
    const {categoryName, items} = categoryItems["69f9e494024e37a427546373"] || []
    return (
      <div className="absolute top-[14vw] left-[9vw] w-[34vw] space-y-[0.6vw]">
        <h2 className="text-[4.5vw] mb-[8vw] text-left pl-[6vw]">{categoryName}</h2>
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[3vw]">{item.description}</p>}
              </div>
              <p className="text-orange">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Breakfast = function() {
    const {items} = categoryItems["69f9e49e024e37a427546374"] || []
    return (
      <div className="absolute top-[50vw] left-[10vw] w-[34vw]">
        {items.map((item: Item) => {
          return (
            <div key={item._id} className={`flex justify-between text-[3.5vw] ${item.available? "" : " line-through"}`}>
              <div>
                <p>{item.name}</p>
                {item.description && <p className="text-[2.8vw]">{item.description}</p>}
              </div>
              <p className="text-purple align-sub">{formatCurrency(item.price)}</p>
            </div>
          )
        })}
      </div>
    )
  }

  const Daily = function() {
    const {categoryName, items} = categoryItems["69fba732ebfa0e0f6ecc4f47"] || []
    if (items.length > 0) {
      return (
        <div className="absolute top-[38vw] right-[10vw] w-[31vw] space-y-[0.6vw]">
          <h2 className="text-[4.5vw] text-left mb-[3vw]">{categoryName}</h2>
          {items.map((item: Item) => {
            return (
              <div key={item._id} className={`flex justify-between text-[3.8vw] ${item.available? "" : " line-through"}`}>
                <div>
                  <p>{item.name}</p>
                  {item.description && <p className="text-[3vw]">{item.description}</p>}
                </div>
                <p className="text-orange">{formatCurrency(item.price)}</p>
              </div>
            )
          })}
        </div>
    )} else return null
  }

  // Items view with sticky badge row
  return (
    <div className="space-y-2 min-h-screen pb-12 pt-4">
      {isLoading? 
        <div className="w-full aspect-square flex justify-center items-center">
          <div className="relative w-27 aspect-square animate-[bounce_3s_ease-in-out_infinite]">
            <Image src="/octo.png" alt="لودینگ اختاپوس" fill />
          </div>
        </div> :
        <div className="flex flex-col relative">
          <AnimatedSection>
            <div className="w-full aspect-1080/2340 relative">
              <Image src="/menu1.jpg" fill alt="پس زمینه منو" />
              <HotEspresso />
              <ColdEspresso />
              <Brew />
              <Tea />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="w-full aspect-1080/532 relative">
              <Image src="/menu3.jpg" fill alt="پس زمینه منو" />
              <HotMilk />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="w-full aspect-1080/542 relative">
              <Image src="/menu4.jpg" fill alt="پس زمینه منو" />
              <MilkShake />
              <Smoothie />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="w-full aspect-1080/1749 relative">
              <Image src="/menu5.jpg" fill alt="پس زمینه منو" />
              <ColdBar />
              <Beer />
              <Appetizer />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="w-full aspect-1080/873 relative">
              <Image src="/menu6.jpg" fill alt="پس زمینه منو" />
              <Cake />
              <Pasta />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="w-full aspect-1080/879 relative">
              <Image src="/menu7.jpg" fill alt="پس زمینه منو" />
              <Breakfast />
              <Daily />
            </div>
          </AnimatedSection>
        </div>
      }
    </div>
  );
}
