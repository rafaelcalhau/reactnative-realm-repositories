export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: { type: 'string'  },
      fullName: { type: 'string' },
      description: { type: 'string' },
      stars: { type: 'int' },
      forks: { type: 'int' }
    }
  }
}
