import React from "react";

import "./SettingsPanel.css";
import {Panel} from "../";
import {PanelColor} from "../Panel";

type Props = {
  fieldHeight: number;
  fieldWidth: number;
  generationDensity: number;
  delay: number;
  onParamUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsPanel: React.FC<Props> = ({fieldHeight, fieldWidth, generationDensity, delay, onParamUpdate}: Props) => {
  return (
      <Panel color={PanelColor.Light}>
          <label htmlFor="generationDensity">Generation density ({generationDensity})</label>
          <input name="generationDensity"
                 type="range"
                 value={generationDensity}
                 min={0}
                 max={1}
                 step={0.1}
                 onChange={onParamUpdate}/>
          <label htmlFor="fieldWidth">Field width ({fieldWidth})</label>
          <input type="range" name="fieldWidth" value={fieldWidth} min={0} max={100} step={1} onChange={onParamUpdate}/>
          <label htmlFor="fieldHeight">Field height ({fieldHeight})</label>
          <input type="range" name="fieldHeight" value={fieldHeight} min={0} max={100} step={1} onChange={onParamUpdate}/>
          <label htmlFor="delay">Delay ({delay})</label>
          <input type="range" name="delay" value={delay} min={50} max={1000} step={50} onChange={onParamUpdate}/>
      </Panel>
  );
};

export default SettingsPanel;