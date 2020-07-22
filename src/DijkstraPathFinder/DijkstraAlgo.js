import React, { useState } from 'react';
import produce from 'immer';
import './DijkstraAlgo.css';

const numRows = 50;
const numCols = 50;

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
}

const DijstraAlgo = () => {

    const [grid, setGrid] = useState(generateEmptyGrid);


    return (
        <>
            <h1 className='d-title'>Dikjstra Visualizer</h1>

            <div className='d-grid-container'>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                    {grid.map((rows, i) =>
                        rows.map((col, k) =>
                            <div
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                                    });
                                    console.log(newGrid);
                                    setGrid(newGrid);
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k] ? 'pink' : undefined,
                                    border: "1px solid black"
                                }} />
                        )
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default DijstraAlgo;

