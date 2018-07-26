// import project model.
import { Project } from 'src/domains/contributions/project'
// import account model.
import { Account } from 'src/domains/users/account'
// lodash helpers.
import { get } from 'lodash'
// custom https errors.
import { HttpsError } from 'src/support/firebase/functions/handler/errors'

import * as Github from '@octokit/rest'

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

  let docs = []

  const accounts = new Account()

  await accounts.getCollection().get()
    .then(snapshot => {
      console.log(snapshot)
      snapshot.forEach(doc => {
        docs.push({id: doc.id})
      })
    })

  console.log(docs)
  const match = new RegExp(data.creator, 'i')
  docs = docs.filter((doc) => match.test(doc.id))
  console.log(docs)
  const username = docs.github.username
  console.log(username)

  if (data.openSource && data.platforms && data.platforms.github.token) {
    const token = data.platforms.github.token
    console.log(token)
    await Github.authenticate({
      type: 'token',
      token
    })
    const splittedGithubRepository = data.platforms.github.repository.split('/')
    const repo = splittedGithubRepository.pop()
    const owner = splittedGithubRepository.pop()
    const result = (await Github.repos.reviewUserPermissionLevel({ owner, repo, username })).data.permission

    if (!(result === 'admin')) {
      return Promise.reject(new HttpsError(
        'permission-denied',
        `You don't have permission for performing following operation.`
      ))
    }
    delete data.platforms.github.token
  }

  if (!data.images || !data.description || !data.name || !data.creator || !data.tags || !((data.openSource && data.platforms) || !data.openSource) || !data.slug || !data.id) {
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
