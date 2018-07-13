// import account model.
// import { Account } from 'src/domains/users/account'
// lodash helpers.
import { get } from 'lodash'
// custom https errors.
import { HttpsError } from 'src/support/firebase/functions/handler/errors'
// import steem client.
import steem from 'steem'

/**
 * Handle Github token validation.
 *
 * @param {{token: String}} data
 * @param context
 * @return {Promise<Object>}
 */
export const handler = async (data, context) => {
  // get current user UID from required.
  const author = get(context, 'auth.uid', null)

  // throw when not authenticated.
  if (!author) {
    return Promise.reject(new HttpsError(
      'unauthenticated',
      'Authentication is required for storing contributions.'
    ))
  }

  // get permlink.
  const permlink = get(data, 'permlink', null)

  // reject if no token present.
  if (!permlink) {
    return Promise.reject(new HttpsError(
      'invalid-data',
      'Invalid permlink.'
    ))
  }

  // get post from blockchain
  const post = steem.api.getContent(author, permlink)

  // resolve.
  return Promise.resolve(post)

  // resolve with the account data itself.
  // return Promise.resolve({ message: 'SUCCESS' })
}
