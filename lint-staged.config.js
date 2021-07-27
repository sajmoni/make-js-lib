const config = {
  '**/*.ts': () => 'tsc',
  '**/*.{ts,md}': ['xo --fix'],
}

module.exports = config
