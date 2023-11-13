interface NavbarProps {
  activeDay: number
  setActiveDay: React.Dispatch<React.SetStateAction<number>>
}

export default function Navbar({ activeDay, setActiveDay }: NavbarProps) {
  const totalDays = [...Array(26).keys()]

  return (
    <div className="space-x-1 py-4 px-2">
      {totalDays.map((day) => (
        <button
          key={day}
          onClick={() => setActiveDay(day)}
          className={`${
            day === activeDay ? "bg-red-300" : "bg-slate-300"
          } px-2 py-1 rounded-md`}
        >
          {day === 0 ? "Home" : day}
        </button>
      ))}
    </div>
  )
}
