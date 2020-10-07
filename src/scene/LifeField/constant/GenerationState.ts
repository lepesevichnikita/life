export class GenerationState {
  private constructor() {
  }

  public static readonly ALIVE: string = "ALIVE";
  public static readonly PAUSED: string = "PAUSED";
}

export default GenerationState;