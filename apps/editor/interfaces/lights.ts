export interface ILights {
    changeBrightness(id: number, value: number): void
    setOn(id: number, value: boolean): void
}