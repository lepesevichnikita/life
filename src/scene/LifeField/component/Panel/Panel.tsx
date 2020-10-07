import React, {ReactNode, ReactNodeArray} from "react";

import "./Panel.css";
import PanelColor from "./PanelColor";

type Props = {
  isInline?: boolean;
  children: ReactNode | ReactNodeArray;
  color?: PanelColor;
};

export const Panel: React.FC<Props> = ({isInline = false, color, ...props}: Props): JSX.Element => {
  let className: string = isInline ? "Panel Inline" : "Panel";
  if (color) {
    className += ` ${color}`;
  }
  return (<div className={className}>{props.children}</div>);
};

export default Panel;