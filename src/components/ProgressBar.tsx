export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-[#4CAF50] h-4 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
