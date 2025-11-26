// 会议信息页面脚本
(function() {
  'use strict';
  
  const STORAGE_KEY = 'conference_favorites';
  
  // 使用事件委托，只绑定一次
  let favoriteHandlerBound = false;
  
  // 存储原始会议数据，用于搜索
  let allConferencesData = [];
  let initialStateApplied = false;
  let lastSearchTerm = '';
  
  // 收藏管理函数
  function getFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const normalized = normalizeFavoritesArray(parsed);
      if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        saveFavorites(normalized);
      }
      return normalized;
    } catch (e) {
      return [];
    }
  }
  
  function saveFavorites(favorites) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
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
  
  function isFavorite(confId) {
    const favorites = getFavorites();
    return favorites.includes(confId);
  }
  
  function toggleFavorite(confId) {
    const normalizedId = normalizeFavoriteId(confId);
    if (!normalizedId) return false;
    const favorites = getFavorites();
    const index = favorites.indexOf(normalizedId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(normalizedId);
    }
    saveFavorites(favorites);
    return index === -1; // 返回是否已收藏
  }
  
  // 生成会议唯一ID
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
  
  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // 检查是否在会议页面
    if (!document.getElementById('conferences-list')) {
      return;
    }
    
    // 加载会议数据
    loadConferencesData();
  }
  
  // 将函数暴露到全局作用域，供事件处理使用
  window.conferenceFavorites = {
    getFavorites,
    isFavorite,
    toggleFavorite,
    getConferenceId
  };
  
  function loadConferencesData() {
    // 尝试从全局变量获取（如果通过模板注入）
    if (window.conferencesData) {
      console.log('Loading conferences from window.conferencesData:', window.conferencesData.length);
      renderPage(window.conferencesData);
      return;
    }
    
    // 尝试从 data 属性获取
    const dataScript = document.querySelector('script[type="application/json"][data-conferences]');
    if (dataScript) {
      const scriptContent = dataScript.textContent.trim();
      console.log('Found data script, content length:', scriptContent.length);
      
      if (!scriptContent || scriptContent === '') {
        console.warn('Data script is empty');
        showError('会议数据为空，请检查 source/_data/conferences.yml 文件');
        return;
      }
      
      try {
        const data = JSON.parse(scriptContent);
        console.log('Parsed conferences data:', Array.isArray(data) ? data.length : 'not an array');
        
        if (!Array.isArray(data)) {
          console.error('Data is not an array:', typeof data, data);
          showError('会议数据格式错误，期望数组格式');
          return;
        }
        
        renderPage(data);
        return;
      } catch (e) {
        console.error('Failed to parse conferences data:', e);
        console.error('Script content preview:', scriptContent.substring(0, 200));
        showError('解析会议数据失败：' + e.message);
        return;
      }
    } else {
      console.warn('Data script not found');
    }
    
    // 显示错误信息
    showError('无法加载会议数据，请检查配置文件 source/_data/conferences.yml');
  }
  
  function renderPage(conferencesData, options = {}) {
    if (!conferencesData || conferencesData.length === 0) {
      showError('暂无会议数据，请先配置 source/_data/conferences.yml');
      return;
    }
    
    // 保存原始数据用于搜索
    allConferencesData = conferencesData;
    
    const now = new Date();
    
    // 处理会议数据
    const processedConferences = conferencesData.map(conf => {
      const rawDeadline = conf.deadline;
      const deadline = new Date(rawDeadline);
      // 保留精确时间，不重置为 0
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      const isUrgent = daysLeft <= 30 && daysLeft >= 0;
      const isUpcoming = daysLeft >= 0;
      
      const ccfColor = conf.ccf === 'A' ? '#ff6b6b' : conf.ccf === 'B' ? '#4ecdc4' : '#95e1d3';
      
      // 提取年份：优先从 note 中提取会议举办年份，否则使用 deadline 的年份
      let year = '';
      if (conf.note) {
        const yearMatch = conf.note.match(/\b(20\d{2})\b/);
        if (yearMatch) year = yearMatch[1];
      }
      if (!year) year = String(deadline.getFullYear());
      
      const confId = getConferenceId({ ...conf, rawDeadline });
      const isFav = isFavorite(confId);
      
      return {
        ...conf,
        rawDeadline,
        deadline,
        daysLeft,
        isUrgent,
        isUpcoming,
        ccfColor,
        displayYear: year,
        confId,
        isFavorite: isFav
      };
    });
    
    // 排序
    processedConferences.sort((a, b) => a.deadline - b.deadline);
    
    // 渲染统计信息
    renderStats(processedConferences);
    
    // 渲染会议列表
    renderConferences(processedConferences);
    
    // 绑定筛选按钮
    bindFilters(processedConferences, options.initialFilter, options.initialSearch ?? lastSearchTerm);
    
    // 绑定收藏按钮
    bindFavoriteButtons(processedConferences);
  }
  
  function bindFavoriteButtons(conferences) {
    if (favoriteHandlerBound) return;
    favoriteHandlerBound = true;
    
    document.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = e.target.closest('.favorite-btn');
        const confId = btn.dataset.confId;
        const isNowFavorite = toggleFavorite(confId);
        
        // 更新按钮状态
        const iconSpan = btn.querySelector('.favorite-icon');
        const iconI = btn.querySelector('i');
        if (isNowFavorite) {
          btn.classList.add('active');
          if (iconSpan) iconSpan.textContent = '★';
          if (iconI) iconI.className = 'anzhiyufont anzhiyu-icon-star';
          btn.title = '取消收藏';
          btn.setAttribute('aria-label', '取消收藏');
        } else {
          btn.classList.remove('active');
          if (iconSpan) iconSpan.textContent = '☆';
          if (iconI) iconI.className = 'anzhiyufont anzhiyu-icon-star-empty';
          btn.title = '收藏';
          btn.setAttribute('aria-label', '收藏');
        }
        
        // 更新卡片状态
        const card = btn.closest('.conference-card');
        if (isNowFavorite) {
          card.classList.add('favorite');
        } else {
          card.classList.remove('favorite');
        }
        
        // 触发侧栏更新事件
        window.dispatchEvent(new CustomEvent('conferenceFavoriteChanged', {
          detail: { confId, isFavorite: isNowFavorite }
        }));
        
        // 如果当前筛选是"我的收藏"，需要重新渲染
        const activeFilter = document.querySelector('.filter-btn.active');
        const previousFilter = activeFilter ? activeFilter.dataset.filter : 'all';
        if (activeFilter && activeFilter.dataset.filter === 'favorite') {
          // 重新获取所有会议数据并筛选
          const dataScript = document.querySelector('script[type="application/json"][data-conferences]');
          if (dataScript) {
            try {
              const data = JSON.parse(dataScript.textContent);
              renderPage(data, { initialFilter: previousFilter, initialSearch: lastSearchTerm });
            } catch (e) {
              console.error('Failed to reload conferences:', e);
            }
          }
        } else {
          // 更新当前显示的会议列表中的收藏状态
          const searchInput = document.getElementById('conference-search');
          const searchTerm = searchInput ? searchInput.value.trim() : '';
          const currentFilter = activeFilter ? activeFilter.dataset.filter : 'all';
          if (allConferencesData.length > 0) {
            applyFiltersAndSearch(allConferencesData, currentFilter, searchTerm);
          }
        }
      }
    });
  }
  
  function renderStats(conferences) {
    const total = conferences.length;
    const upcoming = conferences.filter(c => c.isUpcoming).length;
    const urgent = conferences.filter(c => c.isUrgent).length;
    const ccfA = conferences.filter(c => c.ccf === 'A').length;
    
    const statsEl = document.getElementById('conferences-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <div class="stat-item">
          <span class="stat-number">${total}</span>
          <span class="stat-label">总会议数</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${upcoming}</span>
          <span class="stat-label">即将截止</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${urgent}</span>
          <span class="stat-label">紧急 (≤30天)</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${ccfA}</span>
          <span class="stat-label">CCF-A类</span>
        </div>
      `;
    }
  }
  
  function renderConferences(conferences) {
    const container = document.getElementById('conferences-list');
    if (!container) return;
    
    if (conferences.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="anzhiyufont anzhiyu-icon-calendar-xmark"></i>
          <p>没有符合条件的会议</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = conferences.map(conf => {
      const daysLeftText = conf.daysLeft >= 0 
        ? `<span class="days-left ${conf.isUrgent ? 'urgent-text' : ''}">还有 ${conf.daysLeft} 天</span>`
        : '<span class="days-left passed">已截止</span>';
      
      // 格式化日期时间：YYYY-MM-DD HH:mm:ss
      const year = conf.deadline.getFullYear();
      const month = String(conf.deadline.getMonth() + 1).padStart(2, '0');
      const day = String(conf.deadline.getDate()).padStart(2, '0');
      const hour = String(conf.deadline.getHours()).padStart(2, '0');
      const minute = String(conf.deadline.getMinutes()).padStart(2, '0');
      const second = String(conf.deadline.getSeconds()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      
      return `
        <div class="conference-card ${conf.isUrgent ? 'urgent' : ''} ${conf.isFavorite ? 'favorite' : ''}" data-conf-id="${escapeHtml(conf.confId)}">
          <div class="conference-card-header">
            <div class="conference-card-name">
              ${conf.website 
                ? `<a href="${escapeHtml(conf.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(conf.name)}</a>`
                : `<span>${escapeHtml(conf.name)}</span>`
              }
              ${conf.abbr ? `<div class="conference-card-abbr">${escapeHtml(conf.abbr)} ${conf.displayYear || ''}</div>` : ''}
            </div>
            <div class="conference-card-actions">
              ${conf.ccf ? `<div class="conference-card-ccf" style="background: ${conf.ccfColor}">CCF-${escapeHtml(conf.ccf)}</div>` : ''}
              <button class="favorite-btn ${conf.isFavorite ? 'active' : ''}" data-conf-id="${escapeHtml(conf.confId)}" title="${conf.isFavorite ? '取消收藏' : '收藏'}" aria-label="${conf.isFavorite ? '取消收藏' : '收藏'}">
                <span class="favorite-icon">${conf.isFavorite ? '★' : '☆'}</span>
                <i class="anzhiyufont ${conf.isFavorite ? 'anzhiyu-icon-star' : 'anzhiyu-icon-star-empty'}" style="display: none;"></i>
              </button>
            </div>
          </div>
          <div class="conference-card-info">
            <div class="conference-card-deadline">
              <i class="anzhiyufont anzhiyu-icon-clock"></i>
              <span class="deadline-date">${dateStr}</span>
              ${daysLeftText}
            </div>
            ${conf.location ? `
              <div class="conference-card-location">
                <i class="anzhiyufont anzhiyu-icon-location"></i>
                <span>${escapeHtml(conf.location)}</span>
              </div>
            ` : ''}
            ${conf.note ? `<div class="conference-card-note">${escapeHtml(conf.note)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }
  
  function bindFilters(conferences, initialFilter = 'all', initialSearch = null) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const currentFilter = btn.dataset.filter;
        applyFiltersAndSearch(conferences, currentFilter);
      });
    });
    
    // 绑定搜索功能
    bindSearch(conferences, initialSearch);
    
    // 应用初始筛选
    const targetFilter = Array.from(filterBtns).find(btn => btn.dataset.filter === initialFilter);
    if (targetFilter) {
      filterBtns.forEach(b => b.classList.remove('active'));
      targetFilter.classList.add('active');
      const searchInput = document.getElementById('conference-search');
      const currentSearch = typeof initialSearch === 'string' ? initialSearch : (searchInput ? searchInput.value.trim() : '');
      applyFiltersAndSearch(conferences, initialFilter, currentSearch);
    } else {
      const searchInput = document.getElementById('conference-search');
      const currentSearch = searchInput ? searchInput.value.trim() : '';
      applyFiltersAndSearch(conferences, 'all', currentSearch);
    }
  }
  
  function bindSearch(conferences, initialSearch = null) {
    const searchInput = document.getElementById('conference-search');
    const searchClear = document.getElementById('search-clear');
    
    if (!searchInput) return;
    
    if (initialSearch !== null) {
      searchInput.value = initialSearch;
      if (searchClear) searchClear.style.display = initialSearch ? 'block' : 'none';
      lastSearchTerm = initialSearch;
    } else if (lastSearchTerm) {
      searchInput.value = lastSearchTerm;
      if (searchClear) searchClear.style.display = 'block';
    }
    
    let searchTimeout;
    let currentFilter = 'all';
    
    // 获取当前激活的筛选
    const getCurrentFilter = () => {
      const activeBtn = document.querySelector('.filter-btn.active');
      return activeBtn ? activeBtn.dataset.filter : 'all';
    };
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const searchTerm = e.target.value.trim();
      lastSearchTerm = searchTerm;
      
      if (searchTerm) {
        searchClear.style.display = 'block';
      } else {
        searchClear.style.display = 'none';
      }
      
      searchTimeout = setTimeout(() => {
        currentFilter = getCurrentFilter();
        applyFiltersAndSearch(conferences, currentFilter, searchTerm);
      }, 300);
    });
    
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      lastSearchTerm = '';
      currentFilter = getCurrentFilter();
      applyFiltersAndSearch(conferences, currentFilter, '');
    });
    
    // 监听筛选按钮变化，保持搜索状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        currentFilter = btn.dataset.filter;
        applyFiltersAndSearch(conferences, currentFilter, searchTerm);
      });
    });

    applyInitialState(conferences);
  }

  function applyInitialState(conferences) {
    if (initialStateApplied) return;
    initialStateApplied = true;

    const searchInput = document.getElementById('conference-search');
    const searchClear = document.getElementById('search-clear');
    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get('search');
    const activeBtn = document.querySelector('.filter-btn.active');
    const currentFilter = activeBtn ? activeBtn.dataset.filter : 'all';

    if (initialSearch && searchInput) {
      searchInput.value = initialSearch;
      if (searchClear) searchClear.style.display = 'block';
      lastSearchTerm = initialSearch;
      applyFiltersAndSearch(conferences, currentFilter, initialSearch);
    } else {
      applyFiltersAndSearch(conferences, currentFilter, '');
    }
  }
  
  function applyFiltersAndSearch(conferences, filter, searchTerm = '') {
    // 先应用筛选
    let filtered = filterConferencesInternal(conferences, filter);
    
    // 再应用搜索
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(conf => {
        const name = (conf.name || '').toLowerCase();
        const abbr = (conf.abbr || '').toLowerCase();
        const ccf = (conf.ccf || '').toLowerCase();
        const location = (conf.location || '').toLowerCase();
        const note = (conf.note || '').toLowerCase();
        
        return name.includes(term) || 
               abbr.includes(term) || 
               ccf.includes(term) ||
               location.includes(term) ||
               note.includes(term);
      });
    }
    
    renderConferences(filtered);
  }
  
  function filterConferencesInternal(conferences, filter) {
    // 重新处理会议数据，更新收藏状态
    const now = new Date();
    const processedConferences = conferences.map(conf => {
      const rawDeadline = conf.rawDeadline || conf.deadline;
      const deadline = new Date(rawDeadline);
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      const isUrgent = daysLeft <= 30 && daysLeft >= 0;
      const isUpcoming = daysLeft >= 0;
      const ccfColor = conf.ccf === 'A' ? '#ff6b6b' : conf.ccf === 'B' ? '#4ecdc4' : '#95e1d3';
      
      let year = '';
      if (conf.note) {
        const yearMatch = conf.note.match(/\b(20\d{2})\b/);
        if (yearMatch) year = yearMatch[1];
      }
      if (!year) year = String(deadline.getFullYear());
      
      const confId = getConferenceId({ ...conf, rawDeadline });
      const isFav = isFavorite(confId);
      
      return {
        ...conf,
        rawDeadline,
        deadline,
        daysLeft,
        isUrgent,
        isUpcoming,
        ccfColor,
        displayYear: year,
        confId,
        isFavorite: isFav
      };
    });
    
    let filtered = processedConferences;
    
    if (filter === 'A' || filter === 'B' || filter === 'C') {
      filtered = processedConferences.filter(c => c.ccf === filter);
    } else if (filter === 'upcoming') {
      filtered = processedConferences.filter(c => c.isUpcoming);
    } else if (filter === 'urgent') {
      filtered = processedConferences.filter(c => c.isUrgent);
    } else if (filter === 'favorite') {
      filtered = processedConferences.filter(c => isFavorite(c.confId));
    }
    
    return filtered;
  }
  
  function filterConferences(conferences, filter) {
    const searchInput = document.getElementById('conference-search');
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    applyFiltersAndSearch(conferences, filter, searchTerm);
  }
  
  function showError(message) {
    const container = document.getElementById('conferences-list');
    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="anzhiyufont anzhiyu-icon-triangle-exclamation"></i>
          <p>${escapeHtml(message)}</p>
        </div>
      `;
    }
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();

