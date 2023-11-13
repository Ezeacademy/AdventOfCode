import drunkendwarf from "../assets/drunkendwarf.jpg?w=256&webp"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-4xl">Advent of code 2022 @React</h1>
      <p className="mx-auto">
        Santa's elves are dwarfs. You just didn't know it.
      </p>
      <img
        src={drunkendwarf}
        alt="a drunken dwarf laying on the ground"
        className="w-64 mx-auto drop-shadow-lg grayscale"
      />
    </div>
  )
}
