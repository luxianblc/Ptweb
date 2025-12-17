// 主应用程序入口
import { initComponents } from './modules/components.js';
import { initNavigation } from './modules/navigation.js';
import { initLightbox } from './modules/lightbox.js';

// 页面特定的初始化函数
import { initHomepage } from './pages/home.js';
import { initPaintingsPage } from './pages/paintings.js';
import { initGalleryPage } from './pages/gallery.js';
import { initWallpaperPage } from './pages/wallpaper.js';
import { initAboutPage } from './pages/about.js';

// 页面映射
const pageInitializers = {
    'index.html': initHomepage,
    '': initHomepage,
    'paintings.html': initPaintingsPage,
    'gallery.html': initGalleryPage,
    'wallpaper.html': initWallpaperPage,
    'about.html': initAboutPage
};

// 主初始化函数
async function initApp() {
    console.log('应用初始化开始...');
    
    try {
        // 1. 加载并注入组件
        await initComponents();
        
        // 2. 初始化通用模块
        initNavigation();
        initLightbox();
        
        // 3. 初始化当前页面
        const currentPage = getCurrentPage();
        const initializer = pageInitializers[currentPage];
        
        if (initializer) {
            console.log(`初始化页面: ${currentPage}`);
            await initializer();
        } else {
            console.warn(`未找到页面 ${currentPage} 的初始化函数`);
        }
        
        console.log('应用初始化完成');
    } catch (error) {
        console.error('应用初始化失败:', error);
    }
}

// 获取当前页面名称
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || 'index.html';
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
