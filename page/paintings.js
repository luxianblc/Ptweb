import { initImageGrid } from '../modules/image-grid.js';

// 绘画作品数据
const paintings = [
    {
        id: 1,
        title: "晨曦森林",
        description: "尝试用光斑表现清晨穿透树叶的阳光，色彩上选择了偏冷的蓝绿色调。",
        category: "original",
        tags: ["水彩", "风景"],
        collaborators: [],
        imgUrl: "assets/images/paintings/original1.jpg"
    },
    // ... 更多作品
];

export async function initPaintingsPage() {
    console.log('初始化绘画作品页面...');
    
    // 初始化绘画作品网格
    const gridOptions = {
        cardTemplate: 'painting',
        enableFilter: true,
        filterButtons: document.querySelectorAll('.filter-btn')
    };
    
    initImageGrid(paintings, 'paintingsGrid', gridOptions);
    
    // 其他绘画页面特定的初始化...
}
