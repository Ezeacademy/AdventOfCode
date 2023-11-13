export default function resolution(input: string): [
  number,
  number,
  {
    firstMarker: string
    splittedInput: string[]
  }
] {
  const inputArr = input.split("")
  const inputLength = inputArr.length
  let startOfPacket = false
  let startOfMessage = false
  let charsProcessedForPacket
  let charsProcessedForMessage

  function filterRepeatedChars(arr: string[]) {
    return arr.filter((char, idx) => {
      return arr.indexOf(char) === idx
    })
  }

  // We can asume the start-of-packet and start-of-message never overlap
  function getProcessedInput(
    input: string,
    startOfPacket: number,
    startOfMessage: number
  ) {
    const firstMarker = Math.min(startOfPacket, startOfMessage)
    const secondMarker = Math.max(startOfPacket, startOfMessage)
    const first = firstMarker === startOfPacket ? "packet" : "message"
    const firstMarkerLength = first === "packet" ? 4 : 14
    const secondMarkerLength = first === "packet" ? 14 : 4

    const splittedInput =
      startOfPacket === 0
        ? [
            "",
            input.slice(0, firstMarkerLength),
            input.slice(firstMarkerLength, secondMarker - 1),
            input.slice(secondMarker - 1, secondMarker + secondMarkerLength),
            input.slice(secondMarker + secondMarkerLength),
          ]
        : [
            input.slice(0, firstMarker - 1),
            input.slice(firstMarker - 1, firstMarker + firstMarkerLength - 1),
            input.slice(firstMarker + firstMarkerLength, secondMarker - 1),
            input.slice(
              secondMarker - 1,
              secondMarker + secondMarkerLength - 1
            ),
            input.slice(secondMarker + secondMarkerLength),
          ]

    return {
      firstMarker: first,
      splittedInput,
    }
  }

  for (let i = 0; i < inputLength - 4; i++) {
    let filteredPacketSlice = []
    if (!startOfPacket) {
      const packetSlice = inputArr.slice(i, i + 4)
      filteredPacketSlice = filterRepeatedChars(packetSlice)
    }

    let filteredMessageSlice = []
    if (!startOfMessage) {
      const messageSlice = inputArr.slice(i, i + 14)
      filteredMessageSlice = filterRepeatedChars(messageSlice)
    }

    if (filteredPacketSlice.length === 4 && !startOfPacket) {
      charsProcessedForPacket = i + 4
      startOfPacket = true
    }

    if (filteredMessageSlice.length === 14 && !startOfMessage) {
      charsProcessedForMessage = i + 14
      startOfMessage = true
    }

    if (startOfPacket && startOfMessage) break
  }

  const processedInput = getProcessedInput(
    input,
    charsProcessedForPacket as number,
    charsProcessedForMessage as number
  )

  return [
    charsProcessedForPacket as number,
    charsProcessedForMessage as number,
    processedInput,
  ]
}
