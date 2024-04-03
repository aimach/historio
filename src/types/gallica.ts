export type Info = {
  data: {
    'profile': string;
    'width': number;
    'height': number;
    '@context': string;
    '@id': string
  }
}

export type Manifest = {
 data: {
  '@id': string;
  'label': string;
  'attribution': string;
  'license': string;
  'logo': string;
  'related': string;
  'seeAlso': string[];
  'description': string;
  'metadata': {
    'label': string;
    'value': string;
  }[];
  'sequences': {
    'canvases': Canva[];
    'label': string;
    '@type': string;
    '@id': string;
  }[];
  'thumbnail': {
    '@id': string;
  };
  '@type': string;
  '@context': string;
 }
}

export type Canva = {
  '@id': string;
  'label': string;
  'height': number;
  'width': number;
  'images': {
    'motivation': string;
    'on': string;
    'resource': {
      'format': string;
      'service': {
        'profile': string;
        '@context': string;
        '@id': string;
      }
      'height': number;
      'width': number;
      '@id': string;
      '@type': string;
    }
    '@type': string;
  }[];
  'thumbnail': {
    '@id': string;
  };
  '@type': string;
}