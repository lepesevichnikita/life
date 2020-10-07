import React, {useEffect, useState} from "react";
import LifeUtil from "../../util";
import {Field, Panel, PanelColor, SettingsPanel} from "../";

import "./MainPage.css";
import GenerationState from "../../constant";

type FieldSettings = {
  fieldHeight: number;
  fieldWidth: number;
  generationDensity: number;
};

const DEFAULT_GENERATION_STATE: string = GenerationState.PAUSED;
const DEFAULT_DELAY: number = 50;
const DEFAULT_FIELD_SETTINGS: FieldSettings = {
  fieldHeight: 50,
  fieldWidth: 50,
  generationDensity: 0.5
};

const delay = async (timeout: number) => {
  return new Promise<Function>((handler) => setTimeout(handler, timeout));
}

export const MainPage: React.FC = (): JSX.Element => {
  const [generationState, setGenerationState] = useState(DEFAULT_GENERATION_STATE);
  const [fieldSettings, setFieldSettings] = useState(DEFAULT_FIELD_SETTINGS);
  const [generation, setGeneration] = useState(new Array<Array<boolean>>());

  const handleParamUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const paramName: string = event.target.name;
    const paramValue: number = Number.parseFloat(event.target.value);
    setFieldSettings({...fieldSettings, [paramName]: paramValue});
  };

  const handleToggleGenerationStateButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (generationState === GenerationState.ALIVE) {
      setGenerationState(GenerationState.PAUSED);
    } else {
      setGenerationState(GenerationState.ALIVE);
    }
  };

  const handleGenerateNewRandomGenerationClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    generateNewRandomGeneration();
  }

  const generateNewRandomGeneration = (): void => {
    const newRandomGeneration: Array<Array<boolean>> = LifeUtil.getNewRandomGeneration(fieldSettings.generationDensity,
                                                                                       fieldSettings.fieldWidth,
                                                                                       fieldSettings.fieldHeight);
    if (generationState === GenerationState.ALIVE) {
      setGenerationState(GenerationState.PAUSED);
      delay(DEFAULT_DELAY).then(() => {
        setGeneration(newRandomGeneration);
      })
    } else {
      setGeneration(newRandomGeneration);
    }
  }

  useEffect(() => {
    if (generationState === GenerationState.ALIVE) {
      if (LifeUtil.isGenerationDead(generation)) {
        setGenerationState(GenerationState.PAUSED);
      } else {
        const calculateNextGeneration = async () => {
          await delay(DEFAULT_DELAY);
          const nextGeneration: Array<Array<boolean>> = LifeUtil.getNextGeneration(generation);
          if (LifeUtil.isEqualsGenerations(generation, nextGeneration)) {
            setGenerationState(GenerationState.PAUSED);
          } else {
            setGeneration(nextGeneration);
          }
        }
        calculateNextGeneration();
      }
    }
  }, [generationState, generation]);

  useEffect(() => {
    generateNewRandomGeneration();
  }, [fieldSettings])

  return (
      <Panel>
        <SettingsPanel {...fieldSettings} onParamUpdate={handleParamUpdate}/>
        <Panel isInline={true} color={PanelColor.Light}>
            <button onClick={handleToggleGenerationStateButton}>{generationState === GenerationState.PAUSED ? 'Start' : 'Pause'}</button>
            <button onClick={handleGenerateNewRandomGenerationClick}>{"Get new generation"}</button>
        </Panel>
        <Panel color={PanelColor.Light}>
          <div className="FieldContainer">
            <Field generation={generation}/>
          </div>
        </Panel>
      </Panel>
  );
};

export default MainPage;