// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  env: {
    philipsHueIp: 'https://192.168.1.59',
    philipsHueUsername: 'smpd53dPuPS-utEDroE68UNvKfR9wz7iboTWr0sW'
  }
}

module.exports = withNx(nextConfig)
