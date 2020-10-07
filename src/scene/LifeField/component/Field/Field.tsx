import React from "react";
import "./Field.css";
import Row from "../Row";

type Props = { generation: Array<Array<boolean>> };

export const Field: React.FC<Props> = ({generation}: Props): JSX.Element => {
  const createRow = (cells: Array<boolean>, index: number) => <Row key={index} cells={cells}/>;
  return (
      <div className="Field">
        {generation.map(createRow)}
      </div>
  );
}

export default Field;