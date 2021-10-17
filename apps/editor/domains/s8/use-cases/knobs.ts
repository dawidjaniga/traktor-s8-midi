import Container from 'typedi'
import { useEvent } from '../../core/events'

export default function useKnobs () {
  useEvent('GainCChanged', (value: number) => {
    const block = Container.get<HTMLDivElement>('block')
    block.style.opacity = String(value)
  })

  useEvent('LineFaderAChanged', (value: number) => {
    const block = Container.get<HTMLDivElement>('block')
    const maxWidth = 1000

    block.style.width = `${value * maxWidth}px`
  })

  useEvent('LineFaderCChanged', (value: number) => {
    const block = Container.get<HTMLDivElement>('block')
    const maxHeight = 1000

    block.style.height = `${value * maxHeight}px`
  })

  useEvent('LineFaderBChanged', (value: number) => {
    const block = Container.get<HTMLDivElement>('block')
    const maxTranslate = 100

    block.style.left = `${value * maxTranslate}%`
  })

  useEvent('LineFaderDChanged', (value: number) => {
    const block = Container.get<HTMLDivElement>('block')
    const maxTranslate = 100

    block.style.top = `${value * maxTranslate}%`
  })
}
