import React, {useState} from 'react'
import { throttledEmit } from '../domains/core/events'

export default function DeveloperTools() {
    const [lineCFaderValue, setLineCFader] = useState(0.5)
  const [lineAFaderValue, setLineAFader] = useState(0.5)
  const [lineDFaderValue, setLineDFader] = useState(0.5)
  
    return (
        <div>
            <h1>LineCFader</h1>
        <input
          type='range'
          min={0}
          max={1}
          step={0.1}
          value={lineCFaderValue}
          onChange={e => {
            throttledEmit('LineFaderCChangedThrottled', Number(e.target.value))
            setLineCFader(Number(e.target.value))
          }}
        />

        <h1>LineAFader</h1>
        <input
          type='range'
          min={0}
          max={1}
          step={0.1}
          value={lineAFaderValue}
          onChange={e => {
            throttledEmit('LineFaderAChangedThrottled', Number(e.target.value))
            setLineAFader(Number(e.target.value))
          }}
        />

        <h1>LineDFader</h1>
        <input
          type='range'
          min={0}
          max={1}
          step={0.1}
          value={lineDFaderValue}
          onChange={e => {
            throttledEmit('LineFaderDChangedThrottled', Number(e.target.value))
            setLineDFader(Number(e.target.value))
          }}
        />
            
        </div>
    )
}
