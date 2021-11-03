import { ILights } from './../../interfaces/lights'

type PorpertyMap = {
  bri: number
  sat: number
  hue: number
  on: boolean
}
type PropertyStateName = keyof PorpertyMap

export class PhilipsLights implements ILights {
  private ip: string
  private username: string
  private endpoint: string

  constructor () {
    this.ip = 'http://192.168.1.5'
    // this.ip = 'http://192.168.0.59'
    this.username = 'TPIHs77b1OtzOelifj0V5sWOEvK62F8JOBRv3r4P'
    // this.username = 'R4q5HAkSdeCrASYLoWRneGryo-vSXwIaNXgr9P0u'
    this.endpoint = `${this.ip}/api/${this.username}`
  }

  private async updateState<Property extends PropertyStateName> (
    id: number,
    property: PropertyStateName,
    value: PorpertyMap[Property]
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

  changeBrightness (id: number, value: number) {
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
