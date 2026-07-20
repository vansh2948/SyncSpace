import { motion } from "framer-motion";

const UserProfile = () => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
      className="
        flex
        items-center
        gap-6
      "
    >

      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-cyan-500
          to-blue-600
          text-3xl
          font-bold
          text-white
        "
      >
        {user?.name
          ? user.name.charAt(0).toUpperCase()
          : "U"}
      </div>

      <div>

        <h2
          className="
            text-3xl
            font-semibold
            text-white
          "
        >
          Welcome back,
          {" "}
          {user?.name || "User"} 👋
        </h2>

        <p
          className="
            mt-2
            text-lg
            text-slate-400
          "
        >
          Ready to collaborate?
        </p>

      </div>

    </motion.div>
  );
};

export default UserProfile;