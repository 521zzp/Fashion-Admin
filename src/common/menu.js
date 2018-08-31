/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: 'Pages',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '门店',
        path: 'stores',
      },
      {
        name: '产品',
        path: 'product',
      },
      {
        name: '会员卡',
        path: 'card',
      },
      {
        name: '订单',
        path: 'order',
      },
    ],
  },
  {
    name: 'a',
    icon: 'dashboard',
    path: 'a',
    children: [
      {
        name: '分析页',
        path: 'asfasf',
      },
      {
        name: '监控页',
        path: 'sagasg',
      },
      {
        name: '工作台',
        path: 'asgasg',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
