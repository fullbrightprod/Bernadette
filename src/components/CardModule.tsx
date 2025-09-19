import Link from "next/link"

export function CardModule({
  title,
  link,
  color,
}: {
  title: string
  link: string
  color?: string
}) {
  return (
    <Link href={link}>
      <div
        className={`rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer ${
          color || "bg-white"
        }`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-2">Cliquez pour commencer</p>
      </div>
    </Link>
  )
}
