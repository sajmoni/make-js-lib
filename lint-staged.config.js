const config = {
  '**/*.ts': () => 'tsc',
  '**/*.{ts,md}': ['xo --fix'],
}

export default config
