export default {
  RealisationPolicy: () => import('App/Manager/Policies/RealisationPolicy'),
  ManagerPolicy: () => import('App/Manager/Policies/ManagerPolicy'),
  RolePolicy: () => import('App/Manager/Policies/RolePolicy'),
  UserPolicy: () => import('App/Manager/Policies/UserPolicy'),
  BlogArticlePolicy: () => import('App/Manager/Policies/BlogArticlePolicy'),
  BlogCategoryPolicy: () => import('App/Manager/Policies/BlogCategoryPolicy')
}
