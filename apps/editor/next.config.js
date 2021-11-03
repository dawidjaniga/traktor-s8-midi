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
    philipsHueIp: 'http://192.168.0.59',
    philipsHueUsername: 'R4q5HAkSdeCrASYLoWRneGryo-vSXwIaNXgr9P0u'
  }
}

module.exports = withNx(nextConfig)
