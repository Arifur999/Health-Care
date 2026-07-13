const bullets = [
  "A Passion for Healing",
  "5-Star Care",
  "All our best",
  "Believe in Us",
  "Always Caring",
  "A Legacy of Excellence",
]

interface PassionForPatientsBlockProps {
  eyebrow: string
  title: string
  description: string[]
  image: string
  imageFirst?: boolean
}

const PassionForPatientsBlock = ({
  eyebrow,
  title,
  description,
  image,
  imageFirst = true,
}: PassionForPatientsBlockProps) => {
  const imageBlock = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" className="h-72.5 w-full rounded-[5px] object-cover sm:h-100" />
  )

  const textBlock = (
    <div className="space-y-5">
      <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl text-primary sm:text-4xl">{title}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-3">
            <span className="size-4 shrink-0 rounded-full bg-accent" />
            <p className="text-lg">{bullet}</p>
          </div>
        ))}
      </div>

      {description.map((paragraph) => (
        <p key={paragraph} className="text-base leading-7 text-foreground/80">
          {paragraph}
        </p>
      ))}
    </div>
  )

  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {imageFirst ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  )
}

export default PassionForPatientsBlock
