// import helpers.
import { get, toString } from 'lodash'
// import base model to extend.
import { Model } from 'src/support/domains/model'

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
    super(data)
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
      accountId: null, // internal account id reference.
      projectId: null, // internal project id reference.
      body: null, // markdown body.
      html: null, // parsed markdown body (pre-render),
      beneficiaryPercent: 0.15, // value of the beneficiary reward percent for utopian.
      tags: [], // list of tags on the contribution.
      createdAt: null, // create date.
      updatedAt: null, // update date.
      deletedAt: null // delete date (soft deletes, keep the record but hidden).
    }
  }
}

// default export for the model class.
export default Contribution
