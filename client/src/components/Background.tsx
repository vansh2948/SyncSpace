import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const Background = () => {
  const mouseX = useMotionValue(-160);
  const mouseY = useMotionValue(-160);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 26,
    mass: 0.8,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 26,
    mass: 0.8,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 160);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020617]">

      {/* Aurora 1 */}

      <motion.div
        animate={{
          x: [0, 140, -100, 0],
          y: [0, -90, 70, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-44
          -top-44
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-500/20
          blur-[110px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Aurora 2 */}

      <motion.div
        animate={{
          x: [0, -120, 90, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-44
          -right-44
          h-[650px]
          w-[650px]
          rounded-full
          bg-purple-600/20
          blur-[120px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Aurora 3 */}

      <motion.div
        animate={{
          x: [0, 70, -70, 0],
          y: [0, 60, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-sky-500/10
          blur-[90px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Mouse Glow */}

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="
          pointer-events-none
          absolute
          h-[320px]
          w-[320px]
          rounded-full
          bg-cyan-400/15
          blur-[90px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Vignette */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.68))]
        "
      />
    </div>
  );
};

export default Background;