import { parseDepartureMonitorId } from '@/util/smap'

describe('parseDepartureMonitorId', () => {
  it('returns ifopt ids with two colons unchanged', () => {
    const result = parseDepartureMonitorId('de:08135:650')
    expect(result).toEqual('de:08135:650')
  })

  it('returns ifopt ids with thee colons shortened to two colons', () => {
    const result = parseDepartureMonitorId('de:08135:650:1')
    expect(result).toEqual('de:08135:650')
  })
})
