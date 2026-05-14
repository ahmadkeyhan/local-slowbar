"use client"

import { Button } from "@/components/ui/button";
import { getCustomers } from "@/lib/data/customerData"
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type Customer = {
  _id: string;
  name: string;
  phone: string;
};

type CustomersResponse = {
  customers: Customer[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function CustomerManager() {
     const [data, setData] = useState<CustomersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);

        const response = await getCustomers(page,10)

        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
  }, [page]);

  if (loading) {
    return <p>
        در حال بارگذاری
    </p>;
  }

  if (!data) {
    return <p>
        خطا در بارگذاری
        </p>;
  }

  return (
    <div dir="rtl" className="space-y-6 relative">
        <div className="sticky top-15 sm:top-18 w-100vw bg-white -mx-4">
            <div className="flex w-100vw items-center justify-between px-4 bg-peach/20">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    variant="outline"
                    >
                    قبلی
                    <LuChevronRight />
                    </Button>

                    <p>
                    صفحه‌ی {formatCurrency(data.page)} از {formatCurrency(data.totalPages)}
                    </p>

                    <Button
                    disabled={page === data.totalPages}
                    variant="outline"
                    onClick={() => setPage((prev) => prev + 1)}
                    >
                        <LuChevronLeft />
                    بعدی
                    </Button>
            </div>
      </div>
      <div className="space-y-3">
        {data.customers.map((customer) => (
          <div
            key={customer._id}
            className="border rounded-lg p-4 flex justify-between"
          >
            <p className="font-medium">{customer.name}</p>
            <p dir="ltr" className="text-sm text-muted-foreground">
              {customer.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}