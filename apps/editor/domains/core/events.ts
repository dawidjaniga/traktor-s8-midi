import { useEffect } from 'react'
import { createNanoEvents } from 'nanoevents'
import throttle from 'lodash/throttle'

export type Events = {
  GainCChanged: (value: number) => void
  GainCChangedThrottled: (value: number) => void
  LineFaderCChanged: (value: number) => void
  LineFaderAChangedThrottled: (value: number) => void
  LineFaderBChangedThrottled: (value: number) => void
  LineFaderCChangedThrottled: (value: number) => void
  LineFaderDChangedThrottled: (value: number) => void
  LineFaderAChanged: (value: number) => void
  LineFaderBChanged: (value: number) => void
  LineFaderDChanged: (value: number) => void
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
