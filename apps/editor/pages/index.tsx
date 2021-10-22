import '../dependencies/lights'
import { useEffect } from 'react'
import styled from 'styled-components'
import Container from 'typedi'
import WebMidi from 'webmidi'
import throttle from 'lodash/throttle'

import { eventBus } from '../domains/core/events'
import useS8 from '../domains/s8'
import usePhilpsHue from '../domains/philipsHue'

const Block = styled.div`
  width: 200px;
  height: 200px;
  background: limegreen;
  position: absolute;
  background-image: url('https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/241529920_4222778334458688_4735259106659692291_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=Wnab-riOD6IAX9PyxoG&_nc_ht=scontent-waw1-1.xx&oh=7a7524250eb33959ee1101ef4b54e856&oe=61918AFE');
  background-attachment: fixed;
  background-size: 100% 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`

const throttledEmit = throttle((name: string, value: number) => eventBus.emit(
  name,
  value
), 100)

export type ControllerName =
  | 'GainC'
  | 'LineFaderC'
  | 'LineFaderA'
  | 'LineFaderB'
  | 'LineFaderD'

export function Index () {
  useS8()
  usePhilpsHue()

  useEffect(() => {
    const block = document.querySelector('#block')
    Container.set('block', block)

    window.addEventListener('mousedown', () => {
      eventBus.emit('LineFaderCChangedThrottled', 50)
    })

    WebMidi.enable(function (err) {
      console.log(err)
      console.log(WebMidi.inputs)
      console.log(WebMidi.outputs)

      const input = WebMidi.getInputByName('Traktor Kontrol S8 Input')
      console.log('input', input)

      const controllerMap: Record<
        number,
        { name: ControllerName; maxValue: number }
      > = {
        17860: { name: 'GainC', maxValue: 127 },
        17869: { name: 'LineFaderC', maxValue: 127 },
        17669: { name: 'LineFaderA', maxValue: 127 },
        17769: { name: 'LineFaderB', maxValue: 127 },
        17969: { name: 'LineFaderD', maxValue: 127 }
      }

      if (input) {
        input.addListener('controlchange', 'all', function (e) {
          const [controllerId, anotherId, value] = e.data

          // console.log(e.data)

          const controller =
            controllerMap[Number(String(controllerId) + String(anotherId))]

          if (controller) {
            eventBus.emit(
              `${controller.name}Changed`,
              value / controller.maxValue
            )

            throttledEmit(
              `${controller.name}ChangedThrottled`,
              value / controller.maxValue
            )
          }
        })
      }
    })
  }, [])

  return (
    <>
      <Block id='block' />
      {/* <Iframe
        id='video'
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/7-4GpL41DIE?controls=0'
        title='YouTube video player'
        frameBorder={0}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></Iframe> */}
    </>
  )
}

export default Index
