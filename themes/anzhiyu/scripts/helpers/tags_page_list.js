hexo.extend.helper.register('tags_page_list', function (type) {
  const tags = hexo.locals.get(type);

  // Manually sort tags based on the length of tag names
  const sortedTags = tags.reduce((acc, tag) => {
    const index = acc.findIndex((t) => t.length < tag.length);
    if (index === -1) {
      acc.push(tag);
    } else {
      acc.splice(index, 0, tag);
    }
    return acc;
  }, []);

  let html = ``;
  const root = hexo.config.root; // 获取站点根目录

  sortedTags.forEach(function (item) {
    html += `
      <a href="${root}${item.path}" id="${root}${item.path}">
        <span class="tags-punctuation">#</span>${item.name}
        <span class="tagsPageCount">${item.length}</span>
      </a>
    `;
  });

  return html;
});
