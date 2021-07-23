import test from 'ava'

import { sayHello } from './src'

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
