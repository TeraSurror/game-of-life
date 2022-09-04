import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

// Bootstarp imports
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'

const numRows = 50;
const numCols = 50;
const operations = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
];


const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
}

const GameOfLife = () => {

    const [grid, setGrid] = useState(generateEmptyGrid());

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        // Simulation

        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbours = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbours += g[newI][newK];
                            }

                        });

                        if (neighbours < 2 || neighbours > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbours === 3) {
                            gridCopy[i][k] = 1;
                        }

                    }
                }
            });
        })


        setTimeout(runSimulation, 500);
    }, []);

    return (
        <>
            {/* --------------------------------------------- */}

            <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top"> 
                <div className="container">
                    <Navbar.Brand href="#home">Conway's Game of Life Simulator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Button
                                variant={!running ? "primary" : "danger"}
                                className="mr-3"
                                onClick={() => {
                                    setRunning(!running);
                                    if (!running) {
                                        runningRef.current = true;
                                        runSimulation();
                                    }

                                }}
                            >
                                {running ? 'Stop' : 'Start'}
                            </Button>

                            <Button
                                className="mr-3"
                                variant="info"
                                onClick={() => {
                                    setGrid(generateEmptyGrid());
                                }}
                            >Clear</Button>

                            <Button
                                variant="info"
                                onClick={() => {
                                    const rows = [];
                                    for (let i = 0; i < numRows; i++) {
                                        rows.push(Array.from(Array(numCols), () => Math.random() > .7 ? 1 : 0));
                                    }
                                    setGrid(rows);
                                }}
                            >Random
                            </Button>


                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            {/* --------------------------------------------- */}


            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2em 0'
            }}>

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
}

export default GameOfLife;
