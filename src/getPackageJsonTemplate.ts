import { PackageJson } from 'type-fest'

type ExtendedPackageJson = PackageJson & {
  ava: {
    require: string[]
    extensions: string[]
  }
  prettier: any
  xo: any
  husky: any
}

const getPackageJsonTemplate = ({ libraryName }: { libraryName: string }) => {
  const packageJsonTemplate: ExtendedPackageJson = {
    name: libraryName,
    license: 'MIT',
    version: '0.0.0',
    description: '',
    keywords: [],
    scripts: {
      build: 'rm -rf dist && tsc',
      release: 'np --no-tests',
      qa: 'tsc && xo --fix',
      test: 'npm run build && preview && ava',
    },
    main: 'dist/index.js',
    files: ['dist/'],
    directories: {
      example: 'example',
    },
    ava: {
      require: ['ts-node/register'],
      extensions: ['ts'],
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
      useTabs: false,
      bracketSpacing: true,
    },
    xo: {
      prettier: true,
      env: ['es2020', 'node'],
      rules: {
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
      },
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'yarn test',
      },
    },
  }

  return packageJsonTemplate
}

export default getPackageJsonTemplate
