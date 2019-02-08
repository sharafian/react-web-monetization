import React, { useState, useEffect } from 'react'

export function useWebMonetizationState () {
  const [monetizationState, setMonetizationState] = useState({
    state: document.monetization && document.monetization.state,
    paymentPointer: null,
    requestId: null,
    hasPaid: false,
  })

  useEffect(() => {
    if (!document.monetization) return

    document.monetization.addEventListener('monetizationstart', ev => {
      const { paymentPointer, requestId } = ev.detail

      setMonetizationDetails({
        state: document.monetization.state,
        paymentPointer,
        requestId
      })
    })
  })

  return monetizationDetails
}
