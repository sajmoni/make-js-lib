import { PackageJson } from 'type-fest'

type ExtendedPackageJson = PackageJson & {
  ava: {
    require: string[]
    extensions: string[]
  }
  prettier: any
  xo: any
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
      go: 'npm run build && preview && ava',
      release: 'npm run build && np --no-tests',
      test: 'ava',
      qa: 'tsc && xo --fix',
    },
    main: 'dist/index.js',
    repository: {
      type: 'git',
      url: '',
    },
    files: ['dist/'],
    ava: {
      require: ['esbuild-runner/register'],
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
        'import/no-extraneous-dependencies': 'off',
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
      },
    },
  }

  return packageJsonTemplate
}

export default getPackageJsonTemplate
