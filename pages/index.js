import React, { useState, useEffect } from "react";
import styled from "styled-components";

const COLUMNS = 20;
const NUMBER_OF_CELLS = COLUMNS * COLUMNS;

const BorderBox = styled.div`
  display: inline-block;
  border: 50px solid blue;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 10px);
  grid-template-rows: repeat(${COLUMNS}, 10px);
  background: black;
  column-gap: 1px;
  row-gap: 1px;
`;

const Block = styled.div`
  background: ${(props) => (props.isAlive ? "red" : "black")};
  width: 10px;
  height: 10px;
`;

const analyseNeighbourhood = (name) => {
  const esquinaSupIzq = 0;
  const esquinaSupDer = COLUMNS - 1;
  const esquinaInfizq = (COLUMNS * COLUMNS) - COLUMNS;
  const esquinaInfDer = (COLUMNS*COLUMNS) - 1;
  const limiteInferior = name % COLUMNS;
  const limiteSuperior = (name + 1) % COLUMNS;

  if (
    name === esquinaSupIzq ||
    name === esquinaSupDer ||
    name === esquinaInfizq ||
    name === esquinaInfDer
  ) {
    return "A";
  }
  // Fila superior
  else if (name > esquinaSupIzq && name < esquinaSupDer) {
    return "B";
  }
  // Fila inferior
  else if (name > esquinaInfizq && name < esquinaInfDer) {
    return "B";
  }
  // Columna izq
  else if (limiteInferior === 0) {
    return "B";
  }
  // Columna derecha
  else if (limiteSuperior === 0) {
    return "B";
  } else {
    return "C";
  }
};

const createCells = () => {
  let cells = [NUMBER_OF_CELLS];
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    const isAlive = Math.random() > 0.5 ? true : false;
    cells[i] = {
      isAlive,
      name: i,
      typeNeighbourhood: analyseNeighbourhood(i),
    };
  }

  return cells;
};

const Home = () => {
  const [cells, setCells] = useState([]);
  const [time, setTime] = useState(Date.now());
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    setCells(createCells());
    setGeneration(generation + 1);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div>
      <h1>Ciclos de vida {generation}</h1>
      <BorderBox>
        <Grid>
          {cells.map(({ isAlive, name }) => (
            <Block key={name} isAlive={isAlive} />
          ))}
        </Grid>
      </BorderBox>
    </div>
  );
};

export default Home;
