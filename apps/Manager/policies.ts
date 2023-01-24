export default {
  RealisationPolicy: () => import('App/Manager/Policies/RealisationPolicy'),
  ManagerPolicy: () => import('App/Manager/Policies/ManagerPolicy'),
  RolePolicy: () => import('App/Manager/Policies/RolePolicy'),
  UserPolicy: () => import('App/Manager/Policies/UserPolicy')
}
