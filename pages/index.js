import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GridWrapper } from "../styles/GridWrapper";
import { GlobalStyle } from "../styles/GlobalStyle";
import { Title } from "../styles/Title";
import { Subtitle } from "../styles/Subtitle";

const BOARD_SIZE = 50;
const NUMBER_OF_CELLS = BOARD_SIZE * BOARD_SIZE;

const BorderBox = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_SIZE}, 10px);
  grid-template-rows: repeat(${BOARD_SIZE}, 10px);
  background: black;
  column-gap: 1px;
  row-gap: 1px;
`;

const Cell = styled.div`
  background: ${(props) => (props.isAlive ? "#00ff1d" : "black")};
  width: 10px;
  height: 10px;
`;

const analyseType = (name) => {
  const esquinaSupIzq = 0;
  const esquinaSupDer = BOARD_SIZE - 1;
  const esquinaInfizq = BOARD_SIZE * BOARD_SIZE - BOARD_SIZE;
  const esquinaInfDer = BOARD_SIZE * BOARD_SIZE - 1;
  const limiteInferior = name % BOARD_SIZE;
  const limiteSuperior = (name + 1) % BOARD_SIZE;

  if (name === esquinaSupIzq) {
    return "A1";
  } else if (name === esquinaSupDer) {
    return "A2";
  } else if (name === esquinaInfizq) {
    return "A3";
  } else if (name === esquinaInfDer) {
    return "A4";
  }
  // Fila superior
  else if (name > esquinaSupIzq && name < esquinaSupDer) {
    return "B";
  }
  // Fila inferior
  else if (name > esquinaInfizq && name < esquinaInfDer) {
    return "C";
  }
  // Columna izq
  else if (limiteInferior === 0) {
    return "D";
  }
  // Columna derecha
  else if (limiteSuperior === 0) {
    return "E";
  } else {
    return "F";
  }
};

const createIfIsAlive = (count) => {
  if (count === 2 || count === 3) {
    return true;
  } else {
    return false;
  }
};

const createIfIsDead = (count) => {
  if (count === 3) {
    return true;
  } else {
    return false;
  }
};

const liveOrDieA1 = (index, cells) => {
  let counter = 0;
  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieA2 = (index, cells) => {
  let counter = 0;
  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieA3 = (index, cells) => {
  let counter = 0;
  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieA4 = (index, cells) => {
  let counter = 0;
  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieB = (index, cells) => {
  let counter = 0;
  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieC = (index, cells) => {
  let counter = 0;
  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieD = (index, cells) => {
  let counter = 0;
  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieE = (index, cells) => {
  let counter = 0;
  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieF = (index, cells) => {
  let counter = 0;
  if (cells[index - BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index - BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index - 1].isAlive) {
    counter++;
  }

  if (cells[index + 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE - 1].isAlive) {
    counter++;
  }

  if (cells[index + BOARD_SIZE + 1].isAlive) {
    counter++;
  }

  if (cells[index].isAlive) {
    return createIfIsAlive(counter);
  } else {
    return createIfIsDead(counter);
  }
};

const liveOrDieByType = (type, index, boardOfCells) => {
  switch (type) {
    case "A1":
      return liveOrDieA1(index, boardOfCells);
    case "A2":
      return liveOrDieA2(index, boardOfCells);
    case "A3":
      return liveOrDieA3(index, boardOfCells);
    case "A4":
      return liveOrDieA4(index, boardOfCells);
    case "B":
      return liveOrDieB(index, boardOfCells);
    case "C":
      return liveOrDieC(index, boardOfCells);
    case "D":
      return liveOrDieD(index, boardOfCells);
    case "E":
      return liveOrDieE(index, boardOfCells);
    case "F":
      return liveOrDieF(index, boardOfCells);
  }
};

const createCells = () => {
  let cells = [NUMBER_OF_CELLS];
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    const isAlive = Math.random() > 0.8 ? true : false;
    cells[i] = {
      isAlive,
      index: i,
      type: analyseType(i),
    };
  }

  return cells;
};

const createNewGeneration = (boardOfCells) => {
  let newBoardOfCells = [NUMBER_OF_CELLS];
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    let type = boardOfCells[i].type;
    newBoardOfCells[i] = {
      isAlive: liveOrDieByType(type, i, boardOfCells),
      index: i,
      type,
    };
  }
  return newBoardOfCells;
};

const Home = () => {
  const [cells, setCells] = useState([]);
  const [time, setTime] = useState(Date.now());
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    if (generation === 0) {
      setCells(createCells());
    } else {
      setCells(createNewGeneration(cells));
    }
    setGeneration(generation + 1);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div>
      <GlobalStyle />
      <GridWrapper>
        <BorderBox>
          <Title>El juego de la vida</Title>
          <Subtitle>de John Horton Conway</Subtitle>
          <Board>
            {cells.map(({ isAlive, index }) => (
              <Cell key={index} isAlive={isAlive} />
            ))}
          </Board>
          <h3>No. de generación {generation}</h3>
        </BorderBox>
        <aside>
          <h3>Descripción</h3>
          <p>
            El juego de la vida es un autómata celular diseñado por el
            matemático británico John Horton Conway en 1970. Se lleva a cabo en
            un tablero de m filas por n columnas. Este tablero es de 50 x 50
            celulas con un total de 2500 celulas.
          </p>
          <h3>Las reglas</h3>
          <ul>
            <li>Este juego no necesita jugadores.</li>
            <li>
              Una célula muerta con exactamente 3 células vecinas vivas "nace"
              (es decir, al turno siguiente estará viva).
            </li>
            <li>
              Una célula viva con 2 o 3 células vecinas vivas sigue viva, en
              otro caso muere (por "soledad" o "superpoblación").
            </li>
          </ul>
        </aside>
      </GridWrapper>
    </div>
  );
};

export default Home;
