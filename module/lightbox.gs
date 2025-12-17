// 灯箱功能模块
export function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (!lightbox || !lightboxImage || !lightboxClose) return;
    
    // 打开灯箱的函数（可从其他模块调用）
    window.openLightbox = function(src, alt, info = '') {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        
        // 如果有额外信息，显示在灯箱中
        const lightboxInfo = document.getElementById('lightboxInfo');
        if (lightboxInfo && info) {
            lightboxInfo.innerHTML = info;
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // 关闭灯箱的函数
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 事件监听
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // 键盘支持
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    console.log('灯箱初始化完成');
}

// 导出供其他模块使用的函数
export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
