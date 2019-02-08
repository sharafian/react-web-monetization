import React, { useState, useEffect } from 'react'

export function useMonetizationCounter () {
  const [monetizationDetails, setMonetizationDetails] = useState({
    state: document.monetization && document.monetization.state,
    paymentPointer: null,
    requestId: null,
    assetCode: null,
    assetScale: null,
    totalAmount: 0,
    hasPaid: false
  })

  // create something we can mutate
  const monetizationDetailsCopy = Object.assign({}, monetizationDetails)

  useEffect(() => {
    if (!document.monetization) return

    const onMonetizationStart = ev => {
      const { paymentPointer, requestId } = ev.detail

      // this is purposely mutating because sometimes we get multiple state
      // updates before reload
      setMonetizationDetails(Object.assign(monetizationDetailsCopy, {
        state: document.monetization.state,
        paymentPointer,
        requestId
      }))
    }

    const onMonetizationProgress = ev => {
      const { amount, assetCode, assetScale } = ev.detail
      const { totalAmount } = monetizationDetails

      // this is purposely mutating because sometimes we get multiple state
      // updates before reload
      setMonetizationDetails(Object.assign(monetizationDetailsCopy, {
        totalAmount: totalAmount + Number(amount),
        assetCode,
        assetScale,
        hasPaid: true
      }))
    }

    document.monetization.addEventListener('monetizationstart', onMonetizationStart)
    document.monetization.addEventListener('monetizationprogress', onMonetizationProgress)

    return () => {
      document.monetization.removeEventListener('monetizationstart', onMonetizationStart)
      document.monetization.removeEventListener('monetizationprogress', onMonetizationProgress)
    }
  })

  return monetizationDetails
}
