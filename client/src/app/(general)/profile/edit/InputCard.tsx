export const InputCard = ({
  children,
  className,
  title,
  description
}: {
  children: React.ReactNode,
  className?: string,
  title: string,
  description?: string
}) => {
  return (
    <div className={`w-full rounded-md bg-card border-primary-foreground/50 p-2 sm:p-5 ${className}`}>
      <header className="mb-4">
        <h1 className="text-xl">{title}</h1>
        {description && (
          <p className="text-sm">{description}</p>
        )}
      </header>
      <main>
        { children }
      </main>
    </div>
  )
}