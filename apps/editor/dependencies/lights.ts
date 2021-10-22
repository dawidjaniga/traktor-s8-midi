import Container from 'typedi'
import { PhilipsLights } from './../domains/philipsHue/lights'

Container.set('lights', new PhilipsLights())
