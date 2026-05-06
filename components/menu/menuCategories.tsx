"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/data/categoryData";
import { getAllCategoryItems } from "@/lib/data/itemData";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

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
  [key : string] : Item[]
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
        try {
          const items = await getAllCategoryItems(categoryId)
          return {categoryId, items}
        } catch (error) {
          console.error(`Error loading items for category ${categoryId}:`, error)
          return { categoryId, items: [] }
        }
      })

      const results = await Promise.all(loadPromises)

      const newCategoryItems = { ...categoryItems }
      results.forEach(({ categoryId, items }) => {
        newCategoryItems[categoryId] = items
      })
      setIsLoading(false)

      console.log(newCategoryItems)

      setCategoryItems(newCategoryItems)
    };
    loadCategories();
  }, []);

  // Items view with sticky badge row
  return (
    <div className="space-y-2 min-h-screen pb-4">
      {isLoading? 
        <div className="w-full aspect-square flex justify-center items-center">
          <div className="relative w-27 aspect-square animate-[bounce_3s_ease-in-out_infinite]">
            <Image src="/octo.png" alt="لودینگ اختاپوس" fill />
          </div>
        </div> :
        <div className="flex flex-col relative">
          <div className="w-full aspect-1080/1842 relative">
            <Image src="/menu1.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/498 relative">
            <Image src="/menu2.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/532 relative">
            <Image src="/menu3.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/542 relative">
            <Image src="/menu4.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/1749 relative">
            <Image src="/menu5.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/873 relative">
            <Image src="/menu6.jpg" fill alt="پس زمینه منو" />
          </div>
          <div className="w-full aspect-1080/879 relative">
            <Image src="/menu7.jpg" fill alt="پس زمینه منو" />
          </div>
          {
            categories.map((category) => {
              const items = categoryItems[category._id] || []
              //hot espresso
              if (category._id == "69f9e2d9024e37a427546367") {
                return (
                  <div key={category._id} className="absolute top-[8vw] right-[7vw] w-[36vw] space-y-[0.6vw]">
                    <h2 className="text-center text-[4.5vw]">{category.name}</h2>
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
              //cold espresso
              if (category._id == "69f9e30a024e37a427546368") {
                return (
                  <div key={category._id} className="absolute top-[72vw] right-[7vw] w-[36vw] space-y-[0.6vw]">
                    <h2 className="text-center text-[4.5vw]">{category.name}</h2>
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
              //brew
              if (category._id == "69f9e370024e37a427546369") {
                return (
                  <div key={category._id} className="absolute top-[118vw] left-[5.5vw] w-[38.5vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mb-[3vw]">{category.name}</h2>
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
              //tea
              if (category._id == "69f9e3a0024e37a42754636b") {
                return (
                  <div key={category._id} className="absolute top-[178vw] left-[9vw] w-[36vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mb-[3vw]">{category.name}</h2>
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
              //hot milk
              if (category._id == "69f9e3b9024e37a42754636c") {
                return (
                  <div key={category._id} className="absolute top-[222vw] right-[11vw] w-[44vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mr-[-4vw]">{category.name}</h2>
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
              //milkshake
              if (category._id == "69f9e407024e37a42754636d") {
                return (
                  <div key={category._id} className="absolute top-[275vw] right-[10vw] w-[36vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mr-[-2vw] mb-[4vw]">{category.name}</h2>
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
              //smoothie
              if (category._id == "69f9e411024e37a42754636e") {
                return (
                  <div key={category._id} className="absolute top-[275vw] right-[50vw] w-[40vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mb-[4vw]">{category.name}</h2>
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
              //cold bar
              if (category._id == "69f9e427024e37a42754636f") {
                return (
                  <div key={category._id} className="absolute top-[322vw] right-[13vw] w-[78vw] flex gap-[4vw]">
                    <div className="space-y-[0.6vw] w-[28vw]">
                      <h2 className="text-[4.5vw] mr-[-3vw]">{category.name}</h2>
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
              //beer
              if (category._id == "69f9e450024e37a427546370") {
                return (
                  <div key={category._id} className="absolute top-[364vw] right-[9.5vw] w-[32vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw]">{category.name}</h2>
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
              //pish
              if (category._id == "69f9e460024e37a427546371") {
                return (
                  <div key={category._id} className="absolute top-[446vw] left-[12vw] w-[42vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mb-[3vw] text-center">{category.name}</h2>
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
              //cake too squished!!!!!!!!!!!!!!!!!!!!!!
              if (category._id == "69f9e47c024e37a427546372") {
                return (
                  <div key={category._id} className="absolute top-[489vw] right-[8vw] w-[32vw] space-y-[0.6vw]">
                    <h2 className="text-[4vw] mb-[4vw]">{category.name}</h2>
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
              //pasta
              if (category._id == "69f9e494024e37a427546373") {
                return (
                  <div key={category._id} className="absolute top-[492vw] left-[9vw] w-[34vw] space-y-[0.6vw]">
                    <h2 className="text-[4.5vw] mb-[8vw] text-left pl-[6vw]">{category.name}</h2>
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
              //breakfast
              if (category._id == "69f9e49e024e37a427546374") {
                return (
                  <div key={category._id} className="absolute top-[609vw] left-[10vw] w-[34vw]">
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
            })
          }
        </div>
      }
    </div>
  );
}
