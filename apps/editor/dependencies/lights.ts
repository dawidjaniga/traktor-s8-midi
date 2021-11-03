import Container from 'typedi'
import { PhilipsLights } from './../domains/philipsHue/lights'

Container.set(
  'lights',
  new PhilipsLights(process.env.philipsHueIp, process.env.philipsHueUsername)
)
