import { useEvent } from '../../core/events'

export default function useKnobs () {
  // Light 1
  useEvent('MidCChangedThrottled', async (value: number) => {
    const light1 = document.querySelector('#light1') as HTMLDivElement

    light1.style.opacity = String(value)
  })

  // useEvent('LowCChangedThrottled', async (value: number) => {
  //   const lights = Container.get<ILights>('lights')

  //   lights.changeSaturation(firstLightId, value)
  // })

  useEvent('SliderCChangedThrottled', async (value: number) => {
    const light1 = document.querySelector('#light1') as HTMLDivElement

    light1.style.opacity = String(value)
  })

  // // Light 2
  // useEvent('MidAChangedThrottled', async (value: number) => {
  //   const lights = Container.get<ILights>('lights')

  //   lights.changeHue(secondLightId, value)
  // })

  // useEvent('LowAChangedThrottled', async (value: number) => {
  //   const lights = Container.get<ILights>('lights')

  //   lights.changeSaturation(secondLightId, value)
  // })

  useEvent('SliderAChangedThrottled', async (value: number) => {
    const light2 = document.querySelector('#light2') as HTMLDivElement

    light2.style.opacity = String(value)
  })

  // // Light 3
  // useEvent('MidBChangedThrottled', async (value: number) => {
  //   const lights = Container.get<ILights>('lights')

  //   lights.changeHue(thirdLightId, value)
  // })

  // useEvent('LowBChangedThrottled', async (value: number) => {
  //   const lights = Container.get<ILights>('lights')

  //   lights.changeSaturation(thirdLightId, value)
  // })

  useEvent('SliderBChangedThrottled', async (value: number) => {
    const light3 = document.querySelector('#light3') as HTMLDivElement

    light3.style.opacity = String(value)
  })
}
