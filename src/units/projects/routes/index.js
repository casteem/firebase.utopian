import createProject from './createProject'
import listProjects from './listProjects'
import editProject from './editProject'

export default {
  prefix: '/projects',
  routes: [createProject, listProjects, editProject]
}
