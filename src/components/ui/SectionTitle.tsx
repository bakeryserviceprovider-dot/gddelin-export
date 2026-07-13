interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  align?: "center" | "left"
  className?: string
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {label && (
        <span className="badge-accent mb-4 inline-block tracking-wider uppercase text-xs">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-navy-600">
          {subtitle}
        </p>
      )}
    </div>
  )
}
