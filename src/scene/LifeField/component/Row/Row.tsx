import React from "react";
import Cell from "../Cell";

import "./Row.css";

type Props = { cells: Array<boolean> };

export const Row: React.FC<Props> = ({cells}: Props) => {
  const createCell = (isAlive: boolean, index: number) => <Cell key={index} isAlive={isAlive}/>;
  return (<div className="Row">{cells.map(createCell)}</div>);
}

export default Row;
