import { ILights } from '../../../interfaces/lights'
import Container from 'typedi'
import { useEvent } from '../../core/events'

const firstLightId = 1
const secondLightId = 2
const thirdLightId = 3

export default function useLights () {
  // Light 1
  useEvent('MidCChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeHue(firstLightId, value)
  })

  useEvent('LowCChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeSaturation(firstLightId, value)
  })

  useEvent('SliderCChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeBrightness(firstLightId, value)
  })

  // Light 2
  useEvent('MidAChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeHue(secondLightId, value)
  })

  useEvent('LowAChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeSaturation(secondLightId, value)
  })

  useEvent('SliderAChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeBrightness(secondLightId, value)
  })

  // Light 3
  useEvent('MidBChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeHue(thirdLightId, value)
  })

  useEvent('LowBChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeSaturation(thirdLightId, value)
  })

  useEvent('SliderBChangedThrottled', async (value: number) => {
    const lights = Container.get<ILights>('lights')

    lights.changeBrightness(thirdLightId, value)
  })
}
