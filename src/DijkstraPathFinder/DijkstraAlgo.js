import React, { useState } from 'react';
import produce from 'immer';
import './DijkstraAlgo.css';

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

const DijstraAlgo = () => {

    const [grid, setGrid] = useState(generateEmptyGrid);
    


    return (
        <>
            {/* --------------------------------------------- */}

            <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top"> 
                <div className="container">
                    <Navbar.Brand href="#home">Dijkstra's Algorithm</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Button
                                variant="primary"
                                className="mr-3"
                                onClick={() => {/*
                                    setRunning(!running);
                                    if (!running) {
                                        runningRef.current = true;
                                        runSimulation();
                                    }*/

                                }}
                            >
                                Start
                            </Button>

                            <Button
                                className="mr-3"
                                variant="info"
                                onClick={() => {
                                    setGrid(generateEmptyGrid());
                                }}
                            >Clear</Button>                            


                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            {/* --------------------------------------------- */}

            

            <div className='d-grid-container' style={{ marginTop: '3em' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                    {grid.map((rows, i) =>
                        rows.map((col, k) =>
                            <div
                                key={`${i}-${k}`}
                                
                                style={{
                                    width: 20,
                                    height: 20,
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

