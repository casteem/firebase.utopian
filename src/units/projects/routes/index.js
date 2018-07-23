import createProject from './createProject'
import listProjects from './listProjects'

export default {
  prefix: '/projects',
  routes: [createProject, listProjects]
}
