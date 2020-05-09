import test from 'ava'
import { sayHello } from '.'

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
