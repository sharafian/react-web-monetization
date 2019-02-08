import React, { useState, useEffect } from 'react'

export function useWebMonetizationCounter () {
  const [monetizationDetails, setMonetizationDetails] = useState({
    state: document.monetization && document.monetization.state,
    paymentPointer: null,
    requestId: null,
    assetCode: null,
    assetScale: null,
    totalAmount: 0,
    hasPaid: false
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

    document.monetization.addEventListener('monetizationprogress', ev => {
      const { amount, assetCode, assetScale } = ev.detail
      const { totalAmount } = monetizationDetails

      setMonetizationDetails({
        totalAmount: totalAmount + amount,
        assetCode,
        assetScale,
        hasPaid: true
      })
    })
  })

  return monetizationDetails
}
