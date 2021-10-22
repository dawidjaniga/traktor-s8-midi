import { useEffect } from 'react'
import { createNanoEvents } from 'nanoevents'

export type Events = {
  GainCChanged: (value: number) => void
  LineFaderCChanged: (value: number) => void
  LineFaderCChangedThrottled: (value: number) => void
  LineFaderAChanged: (value: number) => void
  LineFaderBChanged: (value: number) => void
  LineFaderDChanged: (value: number) => void
}

export const eventBus = createNanoEvents<Events>()

export function useEvent (event: keyof Events, handler: any) {
  useEffect(() => {
    const unsubscriber = eventBus.on(event as keyof Events, handler)

    return () => {
      unsubscriber()
    }
    // eslint-disable-next-line
  }, [])
}
