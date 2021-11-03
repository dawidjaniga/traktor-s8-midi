import { ILights } from './../../interfaces/lights'

type PropertyMap = {
  bri: number
  sat: number
  hue: number
  on: boolean
}
type PropertyStateName = keyof PropertyMap

export class PhilipsLights implements ILights {
  private ip: string
  private username: string
  private endpoint: string

  constructor (ip: string, username: string) {
    this.ip = ip
    this.username = username
    this.endpoint = `${this.ip}/api/${this.username}`
  }

  private async updateState<Property extends PropertyStateName> (
    id: number,
    property: PropertyStateName,
    value: PropertyMap[Property]
  ) {
    try {
      await fetch(`${this.endpoint}/lights/${id}/state`, {
        method: 'PUT',
        body: JSON.stringify({ [property]: value })
      })
    } catch (e) {
      console.error(`Light#${id} setting ${property} error`, e)
    }
  }

  async changeBrightness (id: number, value: number) {
    const maxValue = 254
    const calculatedValue = Math.floor(value * maxValue)

    this.updateState<'bri'>(id, 'bri', calculatedValue)
  }

  changeSaturation (id: number, value: number) {
    const maxValue = 254
    const calculatedValue = value * maxValue

    this.updateState<'sat'>(id, 'sat', calculatedValue)
  }

  async changeHue (id: number, value: number) {
    const maxValue = 65535
    const calculatedValue = value * maxValue

    this.updateState<'hue'>(id, 'hue', calculatedValue)
  }

  async setOn (id: number, value: boolean) {
    this.updateState<'on'>(id, 'on', value)
  }
}
