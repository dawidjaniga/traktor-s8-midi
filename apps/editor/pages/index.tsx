import '../dependencies/lights'
import { useEffect } from 'react'
import styled from 'styled-components'
import WebMidi from 'webmidi'

import { eventBus, throttledEmit } from '../domains/core/events'
import useCircles from '../domains/circles'
import { ControllerName } from '../domains/s8'
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

export function Index () {
  useCircles()
  usePhilpsHue()

  useEffect(() => {
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
        17865: { name: 'MidC', maxValue: 127 },
        17866: { name: 'LowC', maxValue: 127 },
        17869: { name: 'SliderC', maxValue: 127 },

        17665: { name: 'MidA', maxValue: 127 },
        17666: { name: 'LowA', maxValue: 127 },
        17669: { name: 'SliderA', maxValue: 127 },

        17765: { name: 'MidB', maxValue: 127 },
        17766: { name: 'LowB', maxValue: 127 },
        17769: { name: 'SliderB', maxValue: 127 }
      }

      if (input) {
        console.log('Input Connected', input)

        input.addListener('controlchange', 'all', function (e) {
          const [controllerId, anotherId, value] = e.data

          console.log('Control Changed', e.data)

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
