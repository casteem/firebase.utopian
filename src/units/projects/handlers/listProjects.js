// import project model.
import { Project } from 'src/domains/contributions/project'

/**
 *
 * @param {{token: String}} data
 * @param context
 * @return {Promise<Object>}
 */
export const handler = async (data, context) => {
  console.log('context', context)
  console.log('data', data)

  const project = new Project()

  let query = context.rawRequest.query.q
  let openSource = context.rawRequest.query.opensource
  let featured = context.rawRequest.query.featured
  console.log(featured)
  console.log('openSource', openSource)
  if (typeof openSource === 'undefined') {
    openSource = 'true'
  }
  let docs = []
  await project.getCollection().get()
    .then(snapshot => {
      console.log(snapshot)
      snapshot.forEach(doc => {
        docs.push({id: doc.id, data: doc.data()})
      })
    })

  docs = docs.filter((doc) => {
    return !(doc.data.blacklisted || doc.data.status === 'deleted')
  })

  if (query) {
    const match = new RegExp(query, 'i')
    docs = docs.filter((doc) => match.test(doc.id))
  }

  if (!(typeof featured === 'undefined')) {
    if (featured === 'true') {
      docs = docs.filter((doc) => doc.data.featured === true)
    } else if (featured === 'false') {
      docs = docs.filter((doc) => !doc.data.featured === true)
    }
  }

  switch (openSource) {
    case 'any':
      break
    case 'true':
      docs = docs.filter((doc) => doc.data.openSource)
      break
    case 'false':
      docs = docs.filter((doc) => !doc.data.openSource)
      break
    default:
      break
  }

  return docs
}
