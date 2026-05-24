import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: [
    '@maxdraft/core',
    '@maxdraft/react',
    '@maxdraft/ui',
    '@maxdraft/extensions',
    '@maxdraft/themes',
    '@maxdraft/markdown',
    '@maxdraft/shared',
  ],
}

export default config
