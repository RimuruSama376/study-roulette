import { useState } from 'react'

function App() {
  const [choices, setChoices] = useState<string[]>([])
  const [currentChoice, setCurrentChoice] = useState<string>('')
  const [hasDuplicate, setHasDuplicate] = useState<boolean>(false)

  const handleAddChoice = () => {
    if (choices.find((choice) => choice === currentChoice)) {
      setHasDuplicate(true)
      setTimeout(() => {
        setHasDuplicate(false)
      }, 2000)
      return
    }
    setChoices([...choices, currentChoice])
    setCurrentChoice('')
  }

  return (
    <div className='flex justify-center w-dvw h-dvh py-8'>
      <div className='max-w-3xl w-full flex flex-col items-center gap-10'>
        <h1 className='text-4xl font-bold text-center font-[arial]'>Study Roulette</h1>

        {/* info */}
        <p className='w-full text-center'>
          Welcome to Study Roulette! This project aims to help you decide what to study next. If
          you're feeling overwhelmed by choices like Linux, backend development, Docker, UI/UX
          design, and more, just use our simple lottery-type spinner. Enter your choices, spin the
          wheel, and let fate decide your next learning adventure!
        </p>

        {/* input logic */}
        <div className='flex flex-col gap-10'>
          <div className='flex flex-row items-center justify-between gap-10 '>
            <input
              type='text'
              placeholder='Enter your choices here'
              className='w-96 p-2 border border-gray-300 rounded focus:outline-none'
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
              className='bg-gray-700 text-white p-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer'
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
                onClick={() => setChoices([])}
                className={`bg-red-500 text-white px-2 rounded disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer text-sm hover:bg-red-700 transition-colors duration-300`}
              >
                Clear
              </button>
            </div>
            <div className='flex flex-wrap gap-2 pl-3'>
              {choices.map((choice, index) => (
                <button
                  key={index + choice}
                  className='bg-gray-600 px-2 rounded cursor-pointer'
                  onClick={() => setChoices(choices.filter((_, i) => i !== index))}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
