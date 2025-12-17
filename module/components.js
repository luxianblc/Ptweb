// 组件加载器
export async function loadComponent(componentName) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`无法加载组件: ${componentName}`);
        }
        
        const html = await response.text();
        return html;
    } catch (error) {
        console.error(`加载组件 ${componentName} 失败:`, error);
        return `<div class="error">组件加载失败: ${componentName}</div>`;
    }
}

// 初始化所有组件
export async function initComponents() {
    const components = ['header', 'footer', 'lightbox'];
    
    for (const component of components) {
        await loadAndInjectComponent(component);
    }
    
    console.log('所有组件加载完成');
}

// 加载并注入组件
async function loadAndInjectComponent(componentName) {
    const html = await loadComponent(componentName);
    
    // 查找组件插入点
    const insertionPoint = document.getElementById(`${componentName}-insert`);
    
    if (insertionPoint) {
        insertionPoint.innerHTML = html;
        console.log(`组件 ${componentName} 已注入`);
    } else {
        // 如果没有插入点，尝试自动插入到标准位置
        autoInjectComponent(componentName, html);
    }
}

// 自动注入组件到标准位置
function autoInjectComponent(componentName, html) {
    let targetElement;
    
    switch (componentName) {
        case 'header':
            targetElement = document.body.firstChild;
            if (targetElement) {
                document.body.insertAdjacentHTML('afterbegin', html);
            }
            break;
            
        case 'footer':
            targetElement = document.querySelector('main');
            if (targetElement) {
                targetElement.insertAdjacentHTML('afterend', html);
            }
            break;
            
        case 'lightbox':
            document.body.insertAdjacentHTML('beforeend', html);
            break;
    }
}
