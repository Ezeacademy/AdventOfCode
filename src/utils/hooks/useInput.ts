import { useEffect, useState } from "react"

export default function useInput<T>(
  resFn: (input: string) => T,
  input: string
): T {
  const [result, setResult] = useState<T | null>(null)

  useEffect(() => {
    async function fetchInput(input: string) {
      const rawInput = await fetch(input)
      const textInput = await rawInput.text()
      setResult(resFn(textInput))
    }
    fetchInput(input)
  }, [])

  return result as T
}

export function getInput<T>(
    input: string
): T {
  const [result, setResult] = useState<String | null>(null)

  useEffect(() => {
    async function fetchInput(input: string) {
      const rawInput = await fetch(input)
      const textInput = await rawInput.text()
      setResult(textInput)
    }
    fetchInput(input)
  }, [])

  return result as T
}