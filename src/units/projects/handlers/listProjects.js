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

  let docs = []

  await project.getCollection().get()
    .then(snapshot => {
      console.log(snapshot)
      snapshot.forEach(doc => {
        docs.push({id: doc.id, data: doc.data().name})
      })
    })

  console.log(docs)

  if (query) {
    const match = new RegExp(query, 'i')
    docs = docs.filter((doc) => match.test(doc.data))
  }

  return docs
}
