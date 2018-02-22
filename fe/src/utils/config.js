module.exports = {
  name: 'lazy shop Admin',
  pageTitle: function(title = '') {
    if (!title) {
      return '零售库存管理系统';
    }
    return '零售库存管理系统/' + title;
  },
  prefix: 'lanAdmin',
  footerText: 'Copyright  ©  2017 零售库存管理系统',
  logoSrc: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  logoText: '零售库存管理系统',
  needLogin: true,
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  defaultPagination: {
    defaultPageSize: 20,
    pageSizeOptions: ['20', '30', '50'],
    showSizeChanger: true,
    defaultCurrent: 1,
    current: 1,
    total: null
  }
}
