import { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'

function App() {
  const [choices, setChoices] = useState<{ option: string }[]>([])
  const [currentChoice, setCurrentChoice] = useState<string>('')
  const [hasDuplicate, setHasDuplicate] = useState<boolean>(false)
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * choices.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  // Load choices from local storage on initial render
  useEffect(() => {
    const storedChoices = localStorage.getItem('choices')
    if (storedChoices) {
      setChoices(JSON.parse(storedChoices))
    }
  }, [])

  const handleAddChoice = () => {
    if (choices.find((choice) => choice.option === currentChoice)) {
      setHasDuplicate(true)
      setTimeout(() => {
        setHasDuplicate(false)
      }, 2000)
      return
    }
    const newChoices = [...choices, { option: currentChoice }]
    setChoices(newChoices)
    localStorage.setItem('choices', JSON.stringify(newChoices))
    setCurrentChoice('')
  }

  const handleClearChoices = () => {
    setChoices([])
    localStorage.removeItem('choices')
  }

  const handleRemoveChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index)
    setChoices(newChoices)
    localStorage.setItem('choices', JSON.stringify(newChoices))
  }

  return (
    <div className='flex justify-center min-w-dvw  min-h-dvh h-full py-8'>
      <div className='max-w-3xl w-full flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold text-center font-[arial]'>Study Roulette</h1>

        {/* info */}
        <p className='w-full text-center'>
          Welcome to Study Roulette! This project aims to help you decide what to study next. If
          you're feeling overwhelmed by choices like Linux, backend development, Docker, UI/UX
          design, and more, just use our simple lottery-type spinner. Enter your choices, spin the
          wheel, and let fate decide your next learning adventure!
        </p>

        {/* input logic */}
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-row items-center justify-between gap-10 w-full'>
            <input
              type='text'
              placeholder='Enter your choices here'
              className='p-2 border border-gray-300 rounded focus:outline-none w-full'
              value={currentChoice}
              onChange={(e) => {
                setHasDuplicate(false)
                setCurrentChoice(e?.target?.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddChoice()
                }
              }}
            />
            <button
              className='bg-gray-700 text-white text-nowrap p-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer'
              disabled={currentChoice === ''}
              onClick={handleAddChoice}
            >
              Add Choices
            </button>
          </div>
          {hasDuplicate && (
            <p className='text-red-500'>You already have this choice. Please enter a new one.</p>
          )}
          <div
            className={`flex flex-col w-full border rounded-xl gap-3 p-3 ${
              choices.length === 0 && 'hidden'
            }`}
          >
            <div className='flex justify-between items-center'>
              <span className='text-lg'>Your Choices:</span>
              <button
                onClick={handleClearChoices}
                className={`bg-red-500 text-white px-2 rounded disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer text-sm hover:bg-red-700 transition-colors duration-300`}
              >
                Clear
              </button>
            </div>
            <div className='flex flex-wrap gap-2 pl-3'>
              {choices.map((choice, index) => (
                <button
                  key={index + choice.option}
                  className='bg-gray-600 px-2 rounded cursor-pointer'
                  onClick={() => {
                    handleRemoveChoice(index)
                  }}
                >
                  {choice.option}
                </button>
              ))}
            </div>
          </div>
          {choices.length < 2 && (
            <p className='text-red-500'>Please enter at least 2 choices to spin the wheel.</p>
          )}
        </div>
        {/* spinner */}
        {choices.length >= 2 && (
          <div className='text-wrap flex flex-col gap-5 items-center'>
            <Wheel
              mustStartSpinning={mustSpin}
              backgroundColors={['#06504b', '#3e3e3e', '#06504b', '#3e3e3e', '#06504b', '#3e3e3e']}
              prizeNumber={prizeNumber}
              data={choices}
              onStopSpinning={() => {
                setMustSpin(false)
              }}
              textColors={['#ffffff']}
              fontSize={16}
            />
            <button
              onClick={handleSpinClick}
              className='bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer'
            >
              SPIN
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
