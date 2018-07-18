// import helpers.
import { get, toString, assign, attempt, isError, toPlainObject } from 'lodash'
// import base model to extend.
import { Model } from 'src/support/domains/model'

/**
 * Parse / normalize contribution data.
 *
 * @param contributionData
 * @return {*}
 */
const parseContribution = (contributionData) => {
  // start a local data variable.
  const data = assign({}, contributionData)
  // parse metadata.
  const meta = JSON.parse(get(data, 'json_metadata', {}))

  // parse tags.
  data['tags'] = toPlainObject(get(meta, 'tags', {}))
  // parse project ID.
  data['projectId'] = get(meta, 'projectId', null)
  // parse category.
  data['category'] = get(meta, 'category', null)
  console.log(data)
  // return data.
  return data
}

/**
 * Model class definition.
 */
export class Contribution extends Model {
  /**
   * Model constructor.
   *
   * @param data
   */
  constructor (data = {}) {
    // call parent constructor.
    super(parseContribution(data))
  }

  /**
   * Primary key / doc reference field.
   *
   * @return {string|number|null}
   */
  getPrimary () {
    return toString(get(this, 'id', null))
  }

  /**
   * Collection name.
   *
   * @return {string}
   */
  getCollectionName () {
    return 'contributions'
  }

  /**
   * Model fields.
   *
   * @return {Object}
   */
  getFields () {
    return {
      id: null, // auto generated id.
      title: null, // human title for the contribution.
      author: null, // steem author id.
      except: null, // optional except for small spaces descriptions.
      permlink: null, // steem permlink / slug.
      category: null, // contribution category.
      accountId: null, // internal account id reference.
      projectId: null, // internal project id reference.
      body: null, // markdown body.
      html: null, // parsed markdown body (pre-render),
      beneficiaries: {}, // beneficaries.
      tags: {}, // list of tags on the contribution.
      url: null, // contribution URL.
      createdAt: null, // create date.
      updatedAt: null, // update date.
      deletedAt: null // delete date (soft deletes, keep the record but hidden).
    }
  }
}

// default export for the model class.
export default Contribution
