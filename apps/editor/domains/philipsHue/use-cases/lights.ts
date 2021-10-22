import { ILights } from '../../../interfaces/lights'
import Container from 'typedi'
import { useEvent } from '../../core/events'

export default function useLights () {
  useEvent('LineFaderCChangedThrottled', (value: number) => {
    console.log('use case thoreels')
    const lights = Container.get<ILights>('lights')
    const officeLightId = 1
    const livingRoomLightFirstLightId = 2
    const livingRoomLightSecondLightId = 3

      lights.changeBrightness(livingRoomLightFirstLightId, value)
      lights.changeBrightness(livingRoomLightSecondLightId, value)

    
    // lights.setOn(livingRoomLightFirstLightId, false)
    // lights.setOn(livingRoomLightSecondLightId, false)
  })
}
