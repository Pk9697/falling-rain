import { useState, useEffect, useRef } from 'react'

const numRows = 15
const numCols = 20
const colors = ['#4a91e2', '#9013fe', '#50e3c2'] // Define some colors

// Function to create the initial grid
const createEmptyGrid = () => {
	return Array.from({ length: numRows }, () => Array(numCols).fill(0))
}

const App = () => {
	const [grid, setGrid] = useState(createEmptyGrid())
	const colorIdx = useRef(0)

	useEffect(() => {
		// Function to animate the rain drops
		const interval = setInterval(() => {
			setGrid((oldGrid) => {
				const newGrid = [...oldGrid.map((row) => [...row])]

				// Add a new drop at random columns at the top
				for (let col = 0; col < numCols; col++) {
					if (Math.random() > 0.95) {
						// Random chance to drop
						newGrid[0][col] = colors[colorIdx.current % colors.length]
					}
				}

				// Move the drops down
				for (let row = numRows - 1; row > 0; row--) {
          for (let col = 0; col < numCols; col++) {
            newGrid[row][col] = newGrid[row - 1][col]
					}
				}

				// Clear the top row
				if (Math.random() > 0.8) {
					newGrid[0].fill(0)
				}
				return newGrid
			})
		}, 50) // Change the interval for drop speed

		return () => clearInterval(interval) // Cleanup on unmount
  }, [])
  
  useEffect(() => {
    const interval=setInterval(() => {
      // setColorIdx((colorIdx) => (colorIdx + 1) % colors.length)
      colorIdx.current = (colorIdx.current + 1) % colors.length
    }, 5000)
  
    return () => {
      clearInterval(interval)
    }
  }, [])
  

	return (
		<div className='App'>
			<h1>Rain Drop Animation</h1>
			<div className='grid'>
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className='row'>
						{row.map((cell, colIndex) => (
							<div
								key={colIndex}
								className='cell'
								style={{ backgroundColor: cell || 'black' }}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default App
