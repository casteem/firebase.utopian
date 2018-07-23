import saveContribution from './saveContribution'
import getContributions from './getContributions'

export default {
  prefix: '/contributions',
  routes: [saveContribution, getContributions]
}
