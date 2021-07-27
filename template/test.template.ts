import test from 'ava'

import { sayHello } from '{{ name }}'

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
