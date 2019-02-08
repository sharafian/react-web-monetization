import React, { useState, useEffect } from 'react'

export function useMonetizationState () {
  const [monetizationState, setMonetizationState] = useState({
    state: document.monetization && document.monetization.state,
    paymentPointer: null,
    requestId: null,
    hasPaid: false,
  })

  useEffect(() => {
    if (!document.monetization) return

    const onMonetizationStart = ev => {
      const { paymentPointer, requestId } = ev.detail

      setMonetizationState({
        state: document.monetization.state,
        paymentPointer,
        requestId,
        hasPaid: true
      })
    }

    document.monetization.addEventListener('monetizationstart', onMonetizationStart)

    return () => {
      document.monetization.removeEventListener('monetizationstart', onMonetizationStart)
    }
  })

  return monetizationState
}
