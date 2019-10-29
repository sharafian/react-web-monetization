import { EventEmitter } from 'events'

// TODO: is there a more elegant pattern for this?
export class GlobalWebMonetizationState extends EventEmitter {
  constructor() {
    super()

    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
    this.initialized = false

    this.boundMonetizationStart = this.onMonetizationStart.bind(this)
    this.boundMonetizationProgress = this.onMonetizationProgress.bind(this)
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
        this.boundMonetizationStart
      )
      document.monetization.addEventListener(
        'monetizationprogress',
        this.boundMonetizationProgress
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
        this.boundMonetizationStart
      )
      document.monetization.removeEventListener(
        'monetizationprogress',
        this.boundMonetizationProgress
      )
    }
  }

  onMonetizationStart(ev) {
    const { paymentPointer, requestId } = ev.detail

    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
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
