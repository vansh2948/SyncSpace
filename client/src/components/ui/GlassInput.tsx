import { InputHTMLAttributes } from "react";

interface GlassInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const GlassInput = ({
  icon,
  rightIcon,
  className = "",
  ...props
}: GlassInputProps) => {
  return (
    <div className="relative">
      {icon && (
        <div
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`
          h-15
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          text-white
          outline-none
          backdrop-blur-xl

          transition-all
          duration-300

          placeholder:text-slate-500

          focus:border-cyan-400
          focus:bg-white/10
          focus:shadow-[0_0_25px_rgba(34,211,238,0.25)]

          ${icon ? "pl-14" : "pl-5"}
          ${rightIcon ? "pr-14" : "pr-5"}

          ${className}
        `}
      />

      {rightIcon && (
        <div
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
          "
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default GlassInput;