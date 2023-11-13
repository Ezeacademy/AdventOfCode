import grumpy from "../assets/grumpy.png?w=256&webp"

export default function Fallback() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mt-10 mb-4">Day unresolved.</h1>
      <img
        src={grumpy}
        alt="a grumpy dwarf"
        className="drop-shadow-lg grayscale"
      />
    </div>
  )
}
