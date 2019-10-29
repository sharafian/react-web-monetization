import { EventEmitter } from 'events'

// TODO: is there a more elegant pattern for this?
export class GlobalWebMonetizationState extends EventEmitter {
  constructor() {
    super()

    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
    this.resetState()

    this.initialized = false

    this.onMonetizationStart = this.onMonetizationStart.bind(this)
    this.onMonetizationProgress = this.onMonetizationProgress.bind(this)
    this.onMonetizationStop = this.onMonetizationStop.bind(this)
    this.onMonetizationPending = this.onMonetizationPending.bind(this)
  }

  resetState() {
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
  }

  getState() {
    return {
      state: this.state,
      paymentPointer: this.paymentPointer,
      requestId: this.requestId,
      assetCode: this.assetCode,
      assetScale: this.assetScale,
      totalAmount: this.totalAmount
    }
  }

  init() {
    if (
      !this.initialized &&
      typeof document !== 'undefined' &&
      document.monetization
    ) {
      this.initialized = true
      document.monetization.addEventListener(
        'monetizationstart',
        this.onMonetizationStart
      )
      document.monetization.addEventListener(
        'monetizationprogress',
        this.onMonetizationProgress
      )
      document.monetization.addEventListener(
        'monetizationpending',
        this.onMonetizationPending
      )
      document.monetization.addEventListener(
        'monetizationstop',
        this.onMonetizationStop
      )
    }
  }

  terminate() {
    if (
      this.initialized &&
      typeof document !== 'undefined' &&
      document.monetization
    ) {
      this.initialized = false
      document.monetization.removeEventListener(
        'monetizationstart',
        this.onMonetizationStart
      )
      document.monetization.removeEventListener(
        'monetizationprogress',
        this.onMonetizationProgress
      )
      document.monetization.removeEventListener(
        'monetizationpending',
        this.onMonetizationPending
      )
      document.monetization.removeEventListener(
        'monetizationstop',
        this.onMonetizationStop
      )
    }
  }

  onMonetizationStop(ev) {
    this.setStateFromDocumentMonetization()
    // TODO
    this.resetState()
    this.emit('monetizationstop')
  }

  setStateFromDocumentMonetization() {
    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
  }

  onMonetizationPending(ev) {
    const { paymentPointer, requestId } = ev.detail

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationStart(ev) {
    const { paymentPointer, requestId } = ev.detail

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationProgress(ev) {
    const { amount, assetCode, assetScale } = ev.detail

    this.totalAmount = this.totalAmount + Number(amount)
    this.assetCode = assetCode
    this.assetScale = assetScale
    this.emit('monetizationprogress')
  }
}

let globalWebMonetizationState

export function getGlobalWebMonetizationState() {
  if (!globalWebMonetizationState) {
    globalWebMonetizationState = new GlobalWebMonetizationState()
  }
  return globalWebMonetizationState
}

export function initGlobalWebMonetizationState() {
  getGlobalWebMonetizationState().init()
}
