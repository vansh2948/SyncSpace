import { motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import { useState } from "react";

const JoinRoomCard = () => {
  const [roomId, setRoomId] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      transition={{ duration: 0.25 }}
      className="
        rounded-[32px]
        border
        border-blue-400/20
        bg-white/5
        backdrop-blur-3xl
        p-8
        overflow-hidden
        transition-all
        duration-300
        hover:border-blue-400/40
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      <div className="flex items-center justify-between mb-8">
        <div
          className="
            h-16
            w-16
            rounded-2xl
            bg-blue-500/20
            flex
            items-center
            justify-center
          "
        >
          <LogIn
            size={30}
            className="text-blue-300"
          />
        </div>

        <ArrowRight
          size={24}
          className="text-blue-300"
        />
      </div>

      <h2 className="text-3xl font-bold text-white">
        Join Room
      </h2>

      <p className="mt-4 text-slate-400 leading-8">
        Enter a room ID shared by your teammates and instantly join your collaborative workspace.
      </p>

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Room ID
        </label>

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Example: 7F4A-29CD"
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-500/20
          "
        />
      </div>

      <button
        className="
          mt-8
          w-full
          rounded-2xl
          bg-blue-500
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-blue-400
          hover:shadow-lg
          hover:shadow-blue-500/40
        "
      >
        Join Room
      </button>
    </motion.div>
  );
};

export default JoinRoomCard;