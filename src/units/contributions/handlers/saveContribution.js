// import account model.
import { Contribution } from 'src/domains/contributions/contribution'
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
  const permlink = get(data, 'contribution.permlink', null)

  // reject if no token present.
  if (!permlink) {
    return Promise.reject(new HttpsError(
      'invalid-data',
      'Invalid permlink.'
    ))
  }
  // return Promise.resolve(permlink)
  // get post from blockchain
  return steem.api.getContentAsync(author, permlink)
    // generate the contribution model data.
    .then(content => {
      const contribution = new Contribution(content)
      return contribution.save().then(() => contribution)
    })
    // save on firestore.
    //.then(contribution => contribution.save())
    // send the contribution model back with a success message.
    // .then(contribution => ({ contribution, message: 'SUCCESS' }))
}
