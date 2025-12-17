// 主应用程序入口
import { initNavigation } from './modules/navigation.js';
import { initLightbox } from './modules/lightbox.js';
import { initImageGrid } from './modules/image-grid.js';

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('网站初始化...');
    
    // 初始化通用模块
    initNavigation();
    initLightbox();
    
    // 根据当前页面初始化特定功能
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        // 首页初始化
        console.log('初始化首页...');
    } else if (currentPage === 'paintings.html') {
        // 绘画作品页面初始化
        console.log('初始化绘画作品页面...');
        // 这里可以调用绘画页面特定的初始化函数
    }
    // 其他页面的初始化...
});

// 导出供其他模块使用的函数
export { initNavigation, initLightbox, initImageGrid };
