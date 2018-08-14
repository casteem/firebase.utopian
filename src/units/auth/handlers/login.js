import * as admin from 'firebase-admin'
import { GithubClient } from 'src/support/github/client'

import { Account } from 'src/domains/users/account'
export const handler = async (data) => {
  const githubClient = new GithubClient(data.accessToken)
  const githubAccount = await githubClient.getAccount()
  const account = new Account(githubAccount)
  try {
    await admin.auth().getUser(account.name)
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      await admin.auth().createUser(account.getFirebaseUser())
      await account.save()
    }
  }
  // admin.auth().createCustomToken(account.name)
  return {
    avatar: account.avatar,
    name: account.name,
    displayName: account.displayName
  }
}
