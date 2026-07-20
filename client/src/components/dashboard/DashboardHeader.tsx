import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex items-center justify-between"
    >
      <div>

        <h1
          className="
            text-5xl
            font-bold
            tracking-tight
            text-white
          "
        >
          SyncSpace
        </h1>

        <p
          className="
            mt-3
            text-lg
            text-slate-400
          "
        >
          Think Together. Build Together.
        </p>

      </div>
    </motion.div>
  );
};

export default DashboardHeader;