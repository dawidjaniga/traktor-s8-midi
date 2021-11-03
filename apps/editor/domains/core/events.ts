import { useEffect } from 'react'
import { createNanoEvents } from 'nanoevents'
import throttle from 'lodash/throttle'

export type Events = {
  MidAChanged: (value: number) => void
  MidAChangedThrottled: (value: number) => void
  LowAChanged: (value: number) => void
  LowAChangedThrottled: (value: number) => void
  SliderAChanged: (value: number) => void
  SliderAChangedThrottled: (value: number) => void

  MidBChanged: (value: number) => void
  MidBChangedThrottled: (value: number) => void
  LowBChanged: (value: number) => void
  LowBChangedThrottled: (value: number) => void
  SliderBChanged: (value: number) => void
  SliderBChangedThrottled: (value: number) => void

  MidCChanged: (value: number) => void
  MidCChangedThrottled: (value: number) => void
  LowCChanged: (value: number) => void
  LowCChangedThrottled: (value: number) => void
  SliderCChanged: (value: number) => void
  SliderCChangedThrottled: (value: number) => void

  MidDChanged: (value: number) => void
  MidDChangedThrottled: (value: number) => void
  LowDChanged: (value: number) => void
  LowDChangedThrottled: (value: number) => void
  SliderDChanged: (value: number) => void
  SliderDChangedThrottled: (value: number) => void
}

export type EventName = keyof Events

export const eventBus = createNanoEvents<Events>()

export function useEvent<E extends EventName> (event: E, handler: Events[E]) {
  useEffect(() => {
    const unsubscriber = eventBus.on(event, handler)

    return () => {
      unsubscriber()
    }
    // eslint-disable-next-line
  }, [])
}

export const throttledEmit = throttle(
  (eventName: EventName, value: number) => eventBus.emit(eventName, value),
  100
)
