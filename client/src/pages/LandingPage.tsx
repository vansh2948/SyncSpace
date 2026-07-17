import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background";
import PageTransition from "../components/PageTransition";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden text-white">
        <Background />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-black tracking-tight md:text-8xl"
          >
            SyncSpace
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-4xl text-3xl font-bold leading-tight md:text-6xl"
          >
            Think Together.
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
              Build Together.
            </span>

            <br />

            Sync Instantly.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            A futuristic collaborative workspace where teams can
            brainstorm, code, draw and communicate together in
            real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
          >
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_45px_rgba(34,211,238,0.45)]"
            >
              Get Started

              <ArrowRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border border-purple-400/30 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-400/70 hover:bg-purple-500/10 hover:shadow-[0_0_45px_rgba(168,85,247,0.35)]"
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute bottom-8 flex flex-col items-center text-slate-400"
          >
            <span className="mb-2 text-sm uppercase tracking-widest">
              Scroll
            </span>

            <ChevronDown size={24} />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LandingPage;