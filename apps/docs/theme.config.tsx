import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Web3 Sets'
    }
  },
  logo: <span>Web3 Sets</span>,
  project: {
    link: 'https://github.com/district-labs/web3-sets',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/district-labs/web3-sets',
  footer: {
    text: 'Web3 Sets Docs - District Labs © 2023',
  },
}

export default config
