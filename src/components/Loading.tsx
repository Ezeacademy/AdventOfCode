import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import mining from "../assets/mining_dwarves.jpg?w=512&webp"

export default function Loading() {
  return (
    <div className="flex mt-6 flex-col gap-10 items-center">
      <FontAwesomeIcon icon={faSpinner} size="4x" spinPulse={true} />
      <img
        src={mining}
        alt="a grumpy dwarf"
        className="drop-shadow-lg grayscale rounded-sm"
      />
    </div>
  )
}
