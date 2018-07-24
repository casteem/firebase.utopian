// import account model.
import { Project } from 'src/domains/contributions/project'
// lodash helpers.
import { get } from 'lodash'
// custom https errors.
import { HttpsError } from 'src/support/firebase/functions/handler/errors'

/**
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
      'Authentication is required for creating projects.'
    ))
  }

  if (!data.image || !data.description || !data.name || !data.creator || !data.tags || !((data.openSource && data.platform) || !data.openSource) || !data.slug || !data.id) {
    return Promise.reject(new HttpsError(
      'failed-precondition',
      'Not Proper Arguments Provided.'
    ))
  }

  const project = new Project(data)
  // save on firestore.
  return project.save()
  // send the project model back with a success message.
    .then(project => ({ project, message: 'SUCCESS' }))
}
