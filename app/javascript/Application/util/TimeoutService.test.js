import { timeoutService } from './TimeoutService'
import { TIMEOUT_EVENT, SESSION_EXPIRATION_WARNING_TIME } from './constants'
import { eventBus } from './eventBus'

describe('TimeoutService', () => {
  it('window reloads when timeout cookie is not present', () => {
    global.location = jest.fn()
    global.removeEventListener = jest.fn()
    global.setTimeout = jest.fn()
    global.location.reload = jest.fn()
    eventBus.post = jest.fn()
    timeoutService.run()
    expect(global.location.reload).toBeCalled()
    expect(global.removeEventListener).toBeCalled()
    expect(global.setTimeout).not.toHaveBeenCalled()
    expect(eventBus.post).not.toBeCalled()
  })

  it('timeout check is schedulled when timeout cookie is present', () => {
    global.location = jest.fn()
    jest.useFakeTimers()
    global.location.reload = jest.fn()
    eventBus.post = jest.fn()
    const interval = SESSION_EXPIRATION_WARNING_TIME * 48
    const timeout = new Date().getTime() + interval
    global.document.cookie = `_ca_cans_timeout=${timeout}`
    timeoutService.run()
    const minInterval = SESSION_EXPIRATION_WARNING_TIME
    expect(global.location.reload).not.toBeCalled()
    expect(global.setTimeout.mock.calls[0][1]).not.toBeLessThan(minInterval)
    expect(global.setTimeout.mock.calls[0][1]).not.toBeGreaterThan(interval)
    expect(eventBus.post).not.toBeCalled()
  })

  it('sends timeout warning event prior session expiration', () => {
    global.location = jest.fn()
    jest.useFakeTimers()
    global.location.reload = jest.fn()
    eventBus.post = jest.fn()
    const interval = SESSION_EXPIRATION_WARNING_TIME / 2.0
    const timeout = new Date().getTime() + interval
    global.document.cookie = `_ca_cans_timeout=${timeout}`
    timeoutService.run()
    const minInterval = 0
    expect(global.location.reload).not.toBeCalled()
    expect(global.setTimeout.mock.calls[0][1]).not.toBeLessThan(minInterval)
    expect(global.setTimeout.mock.calls[0][1]).not.toBeGreaterThan(interval)
    expect(eventBus.post).toBeCalledWith(TIMEOUT_EVENT)
  })
})
