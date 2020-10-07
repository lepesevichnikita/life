import React from "react";

import "./Cell.css";

type Props = { isAlive: boolean };

export const Cell: React.FC<Props> = ({isAlive}: Props): JSX.Element => {
  const className = `Cell ${isAlive ? "Alive" : ''}`;
  return (<div className={className}/>);
};

export default Cell;
