import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
}

const FloatingCard = ({ children }: FloatingCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [5, -5]),
    {
      stiffness: 90,
      damping: 24,
      mass: 0.8,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-5, 5]),
    {
      stiffness: 90,
      damping: 24,
      mass: 0.8,
    }
  );

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        mouseX.set(
          e.clientX - rect.left - rect.width / 2
        );

        mouseY.set(
          e.clientY - rect.top - rect.height / 2
        );
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        willChange: "transform",
      }}
      className="relative transform-gpu"
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-[40px]
          bg-cyan-500/15
          blur-2xl
        "
      />

      {children}
    </motion.div>
  );
};

export default FloatingCard;