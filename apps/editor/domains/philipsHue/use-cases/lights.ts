import { ILights } from '../../../interfaces/lights'
import Container from 'typedi'
import { useEvent } from '../../core/events'

const firstLightId = 1
const secondLightId = 3

export default function useLights () {
  useEvent('LineFaderCChangedThrottled', (value: number) => {
    console.log('use case thoreels')
    const lights = Container.get<ILights>('lights')
    // const officeLightId = 1
    // const livingRoomLightFirstLightId = 2
    // const livingRoomLightSecondLightId = 3

    // lights.changeBrightness(livingRoomLightFirstLightId, value)
    // lights.changeBrightness(livingRoomLightSecondLightId, value)

    lights.changeBrightness(firstLightId, value)
    lights.changeBrightness(secondLightId, value)

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
