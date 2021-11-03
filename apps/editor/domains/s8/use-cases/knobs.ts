import { useEvent } from '../../core/events'

export default function useKnobs () {
  // Light 1
  useEvent('MidCChangedThrottled', async (value: number) => {
    const light1 = document.querySelector('#light1') as HTMLDivElement

    light1.style.opacity = String(value)
  })

  useEvent('SliderCChangedThrottled', async (value: number) => {
    const light1 = document.querySelector('#light1') as HTMLDivElement

    light1.style.opacity = String(value)
  })

  useEvent('SliderAChangedThrottled', async (value: number) => {
    const light2 = document.querySelector('#light2') as HTMLDivElement

    light2.style.opacity = String(value)
  })

  useEvent('SliderBChangedThrottled', async (value: number) => {
    const light3 = document.querySelector('#light3') as HTMLDivElement

    light3.style.opacity = String(value)
  })
}
