import { ILights } from './../../interfaces/lights'

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

  async changeBrightness (id: number, value: number) {
    const maxValue = 254
    const calculatedValue = Math.floor(value * maxValue)

    try {
      console.log('brightness ', maxValue, value, calculatedValue)

      await fetch(`${this.endpoint}/lights/${id}/state`, {
        method: 'PUT',
        body: JSON.stringify({ bri: calculatedValue })
      })
    } catch (e) {
      console.error('Lights setting error', e)
    }
  }

  async changeSaturation (id: number, value: number) {
    const maxValue = 254
    const calculatedValue = value * maxValue

    try {
      await fetch(`${this.endpoint}/lights/${id}/state`, {
        method: 'PUT',
        body: JSON.stringify({ sat: calculatedValue })
      })
    } catch (e) {
      console.error('Lights setting error', e)
    }
  }

  async changeHue (id: number, value: number) {
    const maxValue = 65535
    const calculatedValue = value * maxValue

    try {
      await fetch(`${this.endpoint}/lights/${id}/state`, {
        method: 'PUT',
        body: JSON.stringify({ hue: calculatedValue })
      })
    } catch (e) {
      console.error('Lights setting error', e)
    }
  }

  async setOn (id: number, value: boolean) {
    await fetch(`${this.endpoint}/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({ on: value })
    })
  }
}
