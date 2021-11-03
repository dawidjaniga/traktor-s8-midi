import { ILights } from '../../../interfaces/lights'
import Container from 'typedi'
import { useEvent } from '../../core/events'

const firstLightId = 1
const secondLightId = 2
const thirdLightId = 3

export default function useLights () {
  useEvent('LineFaderCChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    const response = await fetch(
      `https://192.168.1.59/api/smpd53dPuPS-utEDroE68UNvKfR9wz7iboTWr0sW/lights/1/state`,
      {
        method: 'PUT',
        body: JSON.stringify({ bri: value })
      }
    )
    console.log(response)

    // lights.changeBrightness(firstLightId, value)
    // lights.changeBrightness(secondLightId, value)
    // lights.changeBrightness(thirdLightId, value)

    // lights.setOn(livingRoomLightFirstLightId, false)
    // lights.setOn(livingRoomLightSecondLightId, false)
  })

  useEvent('LineFaderAChangedThrottled', (value: number) => {
    console.log('use case thoreels')
    const lights = Container.get<ILights>('lights')

    lights.changeHue(firstLightId, value)
    lights.changeHue(secondLightId, value)
  })

  useEvent('LineFaderDChangedThrottled', (value: number) => {
    console.log('use case thoreels')
    const lights = Container.get<ILights>('lights')

    lights.changeSaturation(firstLightId, value)
    lights.changeSaturation(secondLightId, value)
  })
}
