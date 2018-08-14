import { Model } from 'src/support/domains/model'

/**
 * Account class definition.
 */
export class Account extends Model {
  constructor (data = {}) {
    super()
    this.name = data.login
    this.displayName = data.name
    this.avatar = data.avatar_url
  }

  getPrimary () {
    return this.name
  }

  getCollectionName () {
    return 'accounts'
  }

  getFirebaseUser () {
    return {
      uid: this.name,
      email: `${this.name}@users.utopian`,
      displayName: this.displayName,
      photoURL: this.avatar || `https://img.blocker.press/a/${this.name}`
    }
  }

  getFields () {
    return {
      id: null,
      name: null,
      displayName: null,
      avatar: null,
      createdAt: null,
      updatedAt: null,
      deletedAt: null
    }
  }
}

// export account class.
export default Account
