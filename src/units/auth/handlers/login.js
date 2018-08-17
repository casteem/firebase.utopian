import { omit } from 'lodash'
import { Account } from 'src/domains/users/account'

export const handler = async (data) => {
  const account = new Account(data)
  let accountRef = await account.findById()
  if (!accountRef) {
    await account.save()
    accountRef = account
  }
  return omit(accountRef, ['createdAt', 'deletedAt', 'updatedAt'])
}
