import MenuCategories from "@/components/menu/menuCategories";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader } from "react-icons/lu";
import ClubDialog from "./dialog";

export default async function Home() {

  return (
    <>
      <MenuCategories />
      <ClubDialog />
    </>
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
