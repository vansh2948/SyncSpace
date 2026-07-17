import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const PrimaryButton = ({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        via-sky-500
        to-blue-600
        px-8
        py-4
        text-lg
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300

        hover:shadow-[0_0_45px_rgba(34,211,238,0.45)]

        ${className}
      `}
      {...props}
    >
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700

          group-hover:translate-x-full
        "
      />

      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};

export default PrimaryButton;