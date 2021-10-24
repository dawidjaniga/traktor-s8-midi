export interface ILights {
  changeBrightness(id: number, value: number): void
  changeSaturation(id: number, value: number): void
  changeHue(id: number, value: number): void
  setOn(id: number, value: boolean): void
}
