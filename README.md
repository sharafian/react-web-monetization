# React Web Monetization
> React module that lets you access the state of Web Monetization

## Examples

This repo contains several usage examples in `example/`. To host the site and
view the examples, run:

```
cd example
npm install
npm start
```

Then go to `http://localhost:3000`.

## Usage

### Enabling Web Monetization

You will still need to insert the Web Monetization meta tag into your
document's `<head>`. This should be done in the HTML file that react renders
into, not in React.

For a specification of this meta tag, see [Interledger RFC
0028](https://github.com/interledger/rfcs/blob/master/0028-web-monetization/0028-web-monetization.md)

### Web Monetization State Hook

This hook will update when the first web-monetization micropayment occurs on the page and the state goes from `pending` to `started`.

```jsx
import React from 'react'
import { useMonetizationState } from 'react-web-monetization'

const MyMessage = props => {
  const monetization = useMonetizationState()

  return <p>
    {monetization.state === 'pending' && 'Loading...'}
    {monetization.state === 'started' && 'Thanks for supporting our site!'}
    {!monetization.state && 'Sign up for Coil to support our site!'}
  </p>
}

export default MyMessage
```

### Web Monetization Counter Hook

This hook will update on each web-monetization micropayment that occurs. It
tracks a running total for how much has been paid out to the page.

You should only use this hook if you're updating on every micropayment. If you
only need a boolean on whether or not payment is happening, use
[useMonetizationState](#web-monetization-state-hook)

```jsx
import React from 'react'
import { useMonetizationCounter } from 'react-web-monetization'

const MyCounter = props => {
  const monetization = useMonetizationCounter()

  return <p>
    {(monetization.totalAmount / (10 ** monetization.assetScale)).toFixed(monetization.assetScale)}
    {monetization.assetCode}
  </p>
}

export default MyCounter
```
