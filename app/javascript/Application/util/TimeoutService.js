import Cookies from 'universal-cookie'
import { eventBus } from './eventBus'
import { TIMEOUT_EVENT, SESSION_EXPIRATION_WARNING_TIME } from './constants'
import { alertMessage } from '../components/Assessment/AssessmentContainer'

class TimeoutService {
  run() {
    const cookies = new Cookies()
    const expirationTime = cookies.get('_ca_cans_timeout')
    if (!expirationTime) {
      window.removeEventListener('beforeunload', alertMessage)
      window.location.reload()
      return
    }
    const instance = this
    const expirationTimeMs = parseInt(expirationTime)
    const msTimeUntilExpiry = expirationTimeMs - new Date().getTime()
    const callback = () => instance.run()
    if (msTimeUntilExpiry <= SESSION_EXPIRATION_WARNING_TIME) {
      eventBus.post(TIMEOUT_EVENT)
      setTimeout(callback, msTimeUntilExpiry)
    } else {
      setTimeout(callback, msTimeUntilExpiry - SESSION_EXPIRATION_WARNING_TIME)
    }
  }
}

export const timeoutService = new TimeoutService()
