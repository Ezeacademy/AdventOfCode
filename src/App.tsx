import { useState } from "react"
import Fallback from "./components/Fallback"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Day1 from "./day1/Index"
import Day2 from "./day2/Index"
import Day3 from "./day3/Index"
import Day4 from "./day4/Index"
import Day5 from "./day5/Index"
import Day6 from "./day6/Index"
import Day7 from "./day7/Index"
import Day8 from "./day8/Index"
import Day9 from "./day9/Index"
import Day10 from "./day10/Index"

function App() {
  const [activeDay, setActiveDay] = useState(0)

  interface ComponentsType {
    [key: number]: JSX.Element
  }

  const components: ComponentsType = {
    0: <Home />,
    1: <Day1 />,
    2: <Day2 />,
    3: <Day3 />,
    4: <Day4 />,
    5: <Day5 />,
    6: <Day6 />,
    7: <Day7 />,
    8: <Day8 />,
    9: <Day9 />,
    10: <Day10 />,
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-zinc-100">
      <Navbar activeDay={activeDay} setActiveDay={setActiveDay} />
      <div className="p-2 min-w-[900px]">
        {activeDay in components ? components[activeDay] : <Fallback />}
      </div>
    </div>
  )
}

export default App
