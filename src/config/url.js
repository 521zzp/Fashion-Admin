export const ADMIN = '/api/admin/auth'

export const AD_LOGIN = '/api/admin/login'   //登录

/*
 * 门店产品管理
 */
export const STORE_MANAGE_LIST = ADMIN + '/store/list'
export const STORE_MANAGE = ADMIN + '/store/manage'      // 门店管理，添加，删除
export const STORE_STATUS_CHANGE = ADMIN + '/store/status/change' // 门店状态修改

/*
 * 产品管理
 */
export const PRODUCT_MANAGE_LIST = ADMIN + '/product/list'
export const PRO_STORE_OPTIONS = ADMIN + '/product/store/options'
export const PRO_IMAGE_UPLOAD = ADMIN + '/product/image/upload'       // 产品图片上传
export const PRO_INFO_SAVE = ADMIN + '/product/info/save'             // 新增 or 更新产品信息
