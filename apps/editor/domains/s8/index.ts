import useKnobs from './use-cases/knobs'

export type ControllerName =
  | 'MidA'
  | 'LowA'
  | 'SliderA'
  | 'MidB'
  | 'LowB'
  | 'SliderB'
  | 'MidC'
  | 'LowC'
  | 'SliderC'
  | 'MidD'
  | 'LowD'
  | 'SliderD'

export default function useS8 () {
  useKnobs()
}
