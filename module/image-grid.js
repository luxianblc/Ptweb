// 图片网格功能模块
export function initImageGrid(images, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container || !images || images.length === 0) return;
    
    const {
        cardTemplate = 'default',
        enableFilter = false,
        filterButtons = []
    } = options;
    
    // 渲染图片网格
    function renderImages(imagesToRender) {
        container.innerHTML = '';
        
        if (imagesToRender.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>没有找到图片</h3>
                    <p>请尝试其他搜索词或分类</p>
                </div>
            `;
            return;
        }
        
        imagesToRender.forEach((image, index) => {
            const imageCard = createImageCard(image, cardTemplate, index);
            container.appendChild(imageCard);
        });
    }
    
    // 创建图片卡片
    function createImageCard(image, template, index) {
        const card = document.createElement('div');
        card.className = template === 'painting' ? 'painting-card glass' : 'image-card glass';
        
        if (image.category) {
            card.setAttribute('data-category', image.category);
        }
        
        if (template === 'painting') {
            // 绘画作品卡片模板
            let collaboratorsHTML = '';
            if (image.collaborators && image.collaborators.length > 0) {
                collaboratorsHTML = `
                    <div class="collaborators">
                        <span><i class="fas fa-users"></i> 合作者:</span>
                        ${image.collaborators.map(name => 
                            `<span class="collaborator-name">${name}</span>`
                        ).join('、')}
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="painting-img-container">
                    <img src="${image.imgUrl}" alt="${image.title}" loading="lazy">
                </div>
                <div class="painting-info">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                    ${collaboratorsHTML}
                    <div class="painting-tags">
                        <span class="painting-tag ${image.category}">
                            ${image.category === 'original' ? '原创' : 
                              image.category === 'derivative' ? '二次创作' : '共同绘画'}
                        </span>
                        ${image.tags.map(tag => `<span class="painting-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        } else {
            // 默认图片卡片模板
            card.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="image-overlay">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
        }
        
        // 点击事件
        card.addEventListener('click', () => {
            if (template === 'painting') {
                const info = `
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                    ${image.collaborators && image.collaborators.length > 0 ? 
                      `<p><i class="fas fa-users"></i> 合作者: ${image.collaborators.join('、')}</p>` : ''}
                `;
                window.openLightbox(image.imgUrl, image.title, info);
            } else {
                window.openLightbox(image.url, image.title);
            }
        });
        
        return card;
    }
    
    // 如果有筛选功能，初始化筛选
    if (enableFilter && filterButtons.length > 0) {
        initFiltering(images, renderImages, filterButtons);
    }
    
    // 初始渲染
    renderImages(images);
    
    console.log(`图片网格初始化完成，共加载 ${images.length} 张图片`);
    
    // 返回渲染函数，供外部调用
    return { renderImages };
}

// 筛选功能
function initFiltering(images, renderCallback, filterButtons) {
    let currentFilter = 'all';
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            
            const filteredImages = currentFilter === 'all' 
                ? images 
                : images.filter(img => img.category === currentFilter);
            
            renderCallback(filteredImages);
        });
    });
}
