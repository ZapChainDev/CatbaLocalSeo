interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
