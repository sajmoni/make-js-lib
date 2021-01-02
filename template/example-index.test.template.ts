import test from 'ava'
import { sayHello } from '{{ libraryName }}'

test('sayHello', (t) => {
  t.is(sayHello(), 'Hello world!')
})
