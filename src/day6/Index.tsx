import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Day6() {
  const [charsForPacket, charsForMessage, processedInput] =
    useInput(resolution, inputtxt) ?? []

  let firstMarker: string = ""
  let splittedInput: string[] = []

  if (processedInput?.firstMarker && processedInput?.splittedInput) {
    ;({ firstMarker, splittedInput } = processedInput)
  }

  const packetColor = "text-pink-500"
  const messageColor = "text-blue-500"

  return charsForPacket &&
    charsForMessage &&
    processedInput.firstMarker &&
    processedInput.splittedInput.length ? (
    <div className="">
      <div className="text-center">
        Characters processed for start-of-packet and start-of-message markers is{" "}
        {charsForPacket} and {charsForMessage} respectively.
      </div>
      <div className="max-w-3xl">
        <p className="mt-4">
          <span className={`${packetColor} font-bold`}>Pink</span> marks the
          start-of-packet marker.
          <br />
          <span className={`${messageColor} font-bold`}>Blue</span> marks the
          start-of-message marker.
        </p>
        <p className="tracking-widest mt-6 mx-auto break-words">
          {splittedInput[0]}
          <span
            className={`font-bold underline text-xl ${
              firstMarker === "packet" ? packetColor : messageColor
            }`}
          >
            {splittedInput[1]}
          </span>
          {splittedInput[2]}
          <span
            className={`font-bold underline text-xl ${
              firstMarker === "packet" ? messageColor : packetColor
            }`}
          >
            {splittedInput[3]}
          </span>
          {splittedInput[4]}
        </p>
      </div>
    </div>
  ) : (
    <></>
  )
}
