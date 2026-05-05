import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex flex-row-reverse gap-2 items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-blue hover:bg-orange",
          destructive: "text-red-400 bg-white border border-red-400 hover:text-white hover:bg-red-400",
          outline: "border border-indigo hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-peach hover:bg-white",
          ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost has no background until hovered
          link: "underline-offset-4 hover:underline text-primary",
        },
        size: {
          default: "h-10 py-2 px-4",
          sm: "p-2 rounded-md h-9 min-w-9",
          lg: "h-11 px-8 rounded-md",
          icon: "h-10 w-10 p-0", // Icon size is square with no padding
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  )
  
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean
  }
  
  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      // Use the appropriate element based on asChild prop
      const Comp = asChild ? React.Fragment : "button"
  
      return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    },
  )
  Button.displayName = "Button"
  
  export { Button, buttonVariants }
