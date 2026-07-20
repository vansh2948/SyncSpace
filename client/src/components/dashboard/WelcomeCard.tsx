import { motion } from "framer-motion";

const WelcomeCard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        w-full
        rounded-[32px]
        border
        border-cyan-400/20
        bg-white/5
        px-10
        py-8
        backdrop-blur-3xl
      "
    >
      <div className="flex items-center gap-6">

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            text-4xl
            font-bold
            text-white
            shadow-lg
            shadow-cyan-500/20
          "
        >
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="flex-1">

          <h2 className="text-4xl font-bold text-white">
            Welcome back,
            {" "}
            {user?.name || "User"} 👋
          </h2>

          <p className="mt-3 text-lg text-slate-400">
            Ready to collaborate today?
          </p>

        </div>

      </div>
    </motion.div>
  );
};

export default WelcomeCard;