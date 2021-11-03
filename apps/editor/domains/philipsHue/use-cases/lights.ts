import { ILights } from '../../../interfaces/lights'
import Container from 'typedi'
import { useEvent } from '../../core/events'

const firstLightId = 1
const secondLightId = 2
const thirdLightId = 3

export default function useLights () {
  useEvent('LineFaderCChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeBrightness(firstLightId, value)
    lights.changeBrightness(secondLightId, value)
    lights.changeBrightness(thirdLightId, value)
  })

  useEvent('LineFaderAChangedThrottled', (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeHue(firstLightId, value)
    lights.changeHue(secondLightId, value)
    lights.changeHue(thirdLightId, value)
  })

  useEvent('LineFaderDChangedThrottled', (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeSaturation(firstLightId, value)
    lights.changeSaturation(secondLightId, value)
    lights.changeSaturation(thirdLightId, value)
  })
}
