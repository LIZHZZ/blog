hexo.extend.helper.register("catalog_list", function (type) {
  let html = ``;
  const root = hexo.config.root || ''; // 获取 root 配置，如果没有定义则为空字符串
  hexo.locals.get(type).map(function (item) {
    html += `
    <div class="catalog-list-item" id="${root}${item.path}">
      <a href="${root}${item.path}">
        ${item.name}
      </a>
    </div>
    `;
  });
  return html;
});
