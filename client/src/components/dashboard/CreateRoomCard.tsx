import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import roomService from "../../services/roomService";

const CreateRoomCard = () => {
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const response = await roomService.createRoom();

      navigate(`/room/${response.room.roomId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create room.");
    }
  };

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
        border-cyan-400/20
        bg-white/5
        backdrop-blur-3xl
        p-8
        overflow-hidden
        transition-all
        duration-300
        hover:border-cyan-400/40
        hover:shadow-2xl
        hover:shadow-cyan-500/10
      "
    >
      <div className="flex items-center justify-between mb-8">
        <div
          className="
            h-16
            w-16
            rounded-2xl
            bg-cyan-500/20
            flex
            items-center
            justify-center
          "
        >
          <Plus size={30} className="text-cyan-300" />
        </div>

        <ArrowUpRight size={24} className="text-cyan-300" />
      </div>

      <h2 className="text-3xl font-bold text-white">
        Create Room
      </h2>

      <p className="mt-4 text-slate-400 leading-8">
        Start a new collaborative workspace with an integrated
        whiteboard and live code editor.
      </p>

      <button
        onClick={handleCreateRoom}
        className="
          mt-10
          w-full
          rounded-2xl
          bg-cyan-500
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-cyan-400
          hover:shadow-lg
          hover:shadow-cyan-500/40
        "
      >
        Create Room
      </button>
    </motion.div>
  );
};

export default CreateRoomCard;
