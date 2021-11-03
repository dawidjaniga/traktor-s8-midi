import '../dependencies/lights'
import { useEffect } from 'react'
import styled from 'styled-components'
import Container from 'typedi'
import WebMidi from 'webmidi'

import { eventBus, throttledEmit } from '../domains/core/events'
import useS8 from '../domains/s8'
import usePhilpsHue from '../domains/philipsHue'

const Circles = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 90vh;
  margin: auto;
`

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #fff;
`

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
      eventBus.emit('LineFaderCChangedThrottled', 0.1)
    })

    WebMidi.enable(function (err) {
      if (err) {
        console.log('WebMIDI Error: ', err)
      }

      WebMidi.addListener('connected', function (e) {
        console.log('MIDI Device connected', e)
      })

      WebMidi.addListener('disconnected', function (e) {
        console.log('MIDI Device disconnected', e)
      })

      console.log(WebMidi)
      console.log(WebMidi.inputs)
      console.log(WebMidi.outputs)

      const input = WebMidi.getInputByName('Traktor Kontrol S8 Input')
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
        console.log('Input Connected', input)

        input.addListener('controlchange', 'all', function (e) {
          console.log("Received 'controlchange' message.", e)
        })

        input.addListener('controlchange', 'all', function (e) {
          const [controllerId, anotherId, value] = e.data

          console.log('controlchange', e.data)

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
      } else {
        console.error('Input not found')
      }
    })
  }, [])

  return (
    <Circles>
      <Circle id='light1' />
      <Circle id='light2' />
      <Circle id='light3' />
    </Circles>
  )
}

export default Index
