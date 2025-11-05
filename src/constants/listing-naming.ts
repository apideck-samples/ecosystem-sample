export const LISTING_NAMING = [
  {
    type: 'INTEGRATIONS',
    label: 'integrations',
    singular: 'integration'
  },
  {
    type: 'APPS',
    label: 'apps',
    singular: 'app'
  },
  {
    type: 'PARTNERS',
    label: 'partners',
    singular: 'partner'
  },
  {
    type: 'LISTINGS',
    label: 'listings',
    singular: 'listing'
  },
  {
    type: 'DATASOURCES',
    label: 'data sources',
    singular: 'data source'
  },
  {
    type: 'ADDONS',
    label: 'add-ons',
    singular: 'add-on'
  },
  {
    type: 'PLUGINS',
    label: 'plugins',
    singular: 'plugin'
  },
  {
    type: 'CONNECTORS',
    label: 'connectors',
    singular: 'connector'
  },
  {
    type: 'CHANNELS',
    label: 'channels',
    singular: 'channel'
  },
  {
    type: 'CONNECTIONS',
    label: 'connections',
    singular: 'connection'
  },
  {
    type: 'EXTENSIONS',
    label: 'extensions',
    singular: 'extension'
  }
] as const

export type ListingNamingType = (typeof LISTING_NAMING)[number]['type']

