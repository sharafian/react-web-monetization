import { Component, PropTypes, Children } from 'react'

export class WebMonetizationProvider extends Component {
  state = {
    paymentPointer: null,
    requestId: null,
    assetCode: null,
    assetScale: null,
    totalAmount: 0,
    hasPaid: false
  }

  static propTypes = {}

  static childContextTypes = {
    monetizationSupported: PropTypes.boolean.isRequired,
    monetizationState: PropTypes.string,
    monetizationPaymentPointer: PropTypes.string,
    monetizationRequestId: PropTypes.string,
    monetizationAssetCode: PropTypes.string,
    monetizationAssetScale: PropTypes.number,
    monetizationTotalAmount: PropTypes.number.isRequired,
    monetizationHasPaid: PropTypes.boolean.isRequired
  }

  getChildContext () {
    const monetizationSupported = !!document.monetization
    const monetizationState = document.monetization &&
      document.monetization.state

    const {
      paymentPointer,
      requestId,
      assetCode,
      assetScale,
      totalAmount,
      hasPaid
    } = this.state
    
    return {
      monetizationSupported,
      monetizationState,
      monetizationPaymentPointer: paymentPointer,
      monetizationRequestId: requestId,
      monetizationAssetCode: assetCode,
      monetizationAssetScale: assetScale,
      monetizationTotalAmount: totalAmount,
      monetizationHasPaid: hasPaid
    }
  }

  componentWillMount () {
    if (!document.monetization) return

    document.monetization.addEventListener('monetizationstart', ev => {
      const { paymentPointer, requestId } = ev.detail

      this.setState({
        paymentPointer,
        requestId
      })
    })

    document.monetization.addEventListener('monetizationprogress', ev => {
      const { amount, assetCode, assetScale } = ev.detail
      const { totalAmount } = this.state

      this.setState({
        totalAmount: totalAmount + amount,
        assetCode,
        assetScale,
        hasPaid: true
      })
    })
  }

  render () {
    return Children.only(this.props.children)
  }
}
