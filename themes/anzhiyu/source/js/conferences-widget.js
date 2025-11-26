(function () {
  'use strict';

  const STORAGE_KEY = 'conference_favorites';

  function getFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const normalized = normalizeFavoritesArray(parsed);
      if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      }
      return normalized;
    } catch (e) {
      console.warn('Failed to read favorites from storage', e);
      return [];
    }
  }

  function getConferenceId(conf) {
    const namePart = (conf.name || conf.abbr || '').trim().toLowerCase();
    const rawDeadline = conf.rawDeadline || conf.originalDeadline || conf.deadline;
    let deadlinePart = '';
    if (rawDeadline instanceof Date) {
      deadlinePart = rawDeadline.toISOString();
    } else if (rawDeadline) {
      const parsed = new Date(rawDeadline);
      if (!Number.isNaN(parsed.getTime())) {
        deadlinePart = parsed.toISOString();
      } else {
        deadlinePart = String(rawDeadline).trim();
      }
    }
    return `${namePart}_${deadlinePart}`;
  }
  
  function normalizeFavoriteId(id) {
    if (!id) return '';
    const parts = String(id).split('_');
    if (!parts.length) return '';
    const namePart = (parts.shift() || '').trim().toLowerCase();
    const deadlineRaw = parts.join('_').trim();
    let deadlinePart = deadlineRaw;
    const parsed = new Date(deadlineRaw);
    if (!Number.isNaN(parsed.getTime())) {
      deadlinePart = parsed.toISOString();
    }
    return `${namePart}_${deadlinePart}`;
  }
  
  function normalizeFavoritesArray(favs) {
    if (!Array.isArray(favs)) return [];
    const seen = new Set();
    const normalized = [];
    favs.forEach(id => {
      const norm = normalizeFavoriteId(id);
      if (norm && !seen.has(norm)) {
        seen.add(norm);
        normalized.push(norm);
      }
    });
    return normalized;
  }

  function formatDeadline(deadline) {
    if (!deadline) return '未知';
    const date = new Date(deadline.replace(' ', 'T'));
    if (isNaN(date)) return deadline;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function calcDaysLeft(deadline) {
    if (!deadline) return null;
    const now = new Date();
    const date = new Date(deadline.replace(' ', 'T'));
    if (isNaN(date)) return null;
    const diff = date - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  function renderList(container, favoritesData) {
    const listEl = container.querySelector('.conference-favorites-list');
    if (!listEl) return;

    if (!favoritesData.length) {
      listEl.innerHTML = '<div class="conference-empty">暂无收藏会议</div>';
      return;
    }

    const items = favoritesData
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5)
      .map((conf) => {
        const daysLeft = calcDaysLeft(conf.deadline);
        const isUrgent = typeof daysLeft === 'number' && daysLeft <= 30 && daysLeft >= 0;
        const deadlineText = formatDeadline(conf.deadline);
        let daysLeftText = '日期待定';
        let daysClass = 'days-left';
        if (typeof daysLeft === 'number') {
          if (daysLeft >= 0) {
            daysLeftText = `还有 ${daysLeft} 天`;
            if (isUrgent) daysClass += ' urgent-text';
          } else {
            daysLeftText = '已截止';
            daysClass += ' passed';
          }
        }
        const displayName = conf.name || conf.abbr || '未命名会议';

        return `
          <div class="favorite-mini-item ${isUrgent ? 'urgent' : ''}">
            <div class="favorite-mini-name">${displayName}</div>
            <div class="favorite-mini-meta">
              <span class="deadline-date">${deadlineText}</span>
              <span class="${daysClass}">${daysLeftText}</span>
            </div>
          </div>
        `;
      })
      .join('');

    listEl.innerHTML = items;
  }

  function initWidget(container) {
    const dataScript = container.querySelector('script[data-conference-source]');
    if (!dataScript) return;

    let conferences = [];
    try {
      conferences = JSON.parse(dataScript.textContent || '[]');
    } catch (e) {
      console.error('Failed to parse conference data for widget:', e);
      return;
    }

    const favorites = getFavorites();
    const favoriteSet = new Set(favorites);

    const favoriteConfs = conferences.filter((conf) => favoriteSet.has(getConferenceId(conf)));
    renderList(container, favoriteConfs);
  }

  function initAllWidgets() {
    const widgets = document.querySelectorAll('.card-conferences[data-widget="favorites"]');
    widgets.forEach(initWidget);
  }

  function refreshAllWidgets() {
    const widgets = document.querySelectorAll('.card-conferences[data-widget="favorites"]');
    widgets.forEach(initWidget);
  }

  // 监听收藏变化事件
  window.addEventListener('conferenceFavoriteChanged', () => {
    refreshAllWidgets();
  });

  // 监听 localStorage 变化（跨标签页同步）
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      refreshAllWidgets();
    }
  });

  // 定期检查收藏变化（用于同标签页内更新）
  let lastFavorites = JSON.stringify(getFavorites());
  setInterval(() => {
    const currentFavorites = JSON.stringify(getFavorites());
    if (currentFavorites !== lastFavorites) {
      lastFavorites = currentFavorites;
      refreshAllWidgets();
    }
  }, 500);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllWidgets);
  } else {
    initAllWidgets();
  }
})();

