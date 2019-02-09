# React Web Monetization
> React module that lets you access the state of Web Monetization

## Examples

This repo contains several usage examples in `examples/`. To host the site and
view the examples, run:

```
cd examples
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
