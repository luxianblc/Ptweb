import { initImageGrid } from '../modules/image-grid.js';

export async function initHomepage() {
    console.log('初始化首页...');
    
    // 首页图片数据
    const homepageImages = [
        {
            title: "山间晨雾",
            description: "清晨的第一缕阳光穿透薄雾",
            url: "assets/images/previews/mountain.jpg",
            category: "nature"
        },
        // ... 更多图片
    ];
    
    // 初始化首页图片网格
    if (document.getElementById('homeGrid')) {
        initImageGrid(homepageImages, 'homeGrid');
    }
    
    // 其他首页特定的初始化...
}
