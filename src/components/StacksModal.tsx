import { Modal } from "flowbite-react"
import Moves from "./Moves"
import Stacks from "./Stacks"

type StacksModalProps = {
  activePart: {
    [key: string]: string[]
  }[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  slideIdx: number
  setSlideIdx: React.Dispatch<React.SetStateAction<number>>
}

export default function StacksModal({
  activePart,
  isOpen,
  setIsOpen,
  slideIdx,
  setSlideIdx,
}: StacksModalProps) {
  return (
    <Modal
      data-testid="modal"
      size="3xl"
      show={isOpen}
      popup={true}
      dismissible={true}
      onClose={() => {
        setIsOpen(false)
        setSlideIdx(0)
      }}
    >
      <Modal.Header
        data-testid="modalHeader"
        className=""
        style={{ color: "red" }}
      />
      <Modal.Body data-testid="modalBody">
        <Moves moves={activePart[slideIdx + 1].mov} />
        <div className="flex justify-between">
          <button
            data-testid="prevButton"
            disabled={slideIdx === 0}
            onClick={() => setSlideIdx(slideIdx - 1)}
            className="disabled:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div className="flex gap-8">
            <Stacks stacks={activePart[slideIdx]} columns={9} />
            <Stacks stacks={activePart[slideIdx + 1]} columns={9} />
          </div>
          <button
            data-testid="nextButton"
            disabled={slideIdx === activePart.length - 2}
            onClick={() => setSlideIdx(slideIdx + 1)}
            className="disabled:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
