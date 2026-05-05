import MenuCategories from "@/components/menu/menuCategories";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader } from "react-icons/lu";

export default async function Home() {

  return (
    <main className="min-h-screen bg-white">
      <div className="container px-2 py-4 mx-auto max-w-3xl">
        <section className="space-y-4"> 
          <MenuCategories />
        </section>
      </div>
    </main>
  );
}

// Loading spinner animation variants
const spinnerVariants = {
  animate: {
    rotate: 360,
    // transition: {
    //   repeat: Number.POSITIVE_INFINITY,
    //   duration: 1,
    //   ease: "linear",
    // },
  },
}

function MenuSkeleton() {
  return (
    <AnimatePresence>
      <motion.div
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
        className="w-3 h-3 rounded-full"
      >
        <LuLoader />
      </motion.div>
    </AnimatePresence>
  )
}
