/**
 * 浪漫情侣网站 - JavaScript
 * 使用 GSAP 实现动画效果
 */

// ============================================
// 倒计时功能
// ============================================
function initCountdown(targetDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    function updateCountdown() {
        const now = new Date();
        const diff = now - targetDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // 带动画更新数字
        gsap.to(daysEl, {
            duration: 0.5,
            textContent: days,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(hoursEl, {
            duration: 0.5,
            textContent: hours,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(minutesEl, {
            duration: 0.5,
            textContent: minutes,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(secondsEl, {
            duration: 0.5,
            textContent: seconds,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// 粒子背景
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 15 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -20px;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
    `;

    container.appendChild(particle);

    // 鼠标跟随效果
    particle.addEventListener('mouseenter', () => {
        gsap.to(particle, {
            scale: 1.5,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    });
}

// ============================================
// 主页动画
// ============================================
function initHomeAnimation() {
    const title = document.querySelector('.title');
    const countdown = document.querySelector('.countdown');
    const sinceText = document.querySelector('.since-text');
    const entryBtn = document.querySelector('.entry-btn');

    if (!title) return;

    const tl = gsap.timeline({ defaults: { ease: 'elastic.out(1, 0.5)' } });

    tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3
    })
    .to('.title-heart', {
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
    }, '-=0.5')
    .to(countdown, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .to(sinceText, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .to(entryBtn, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5');
}

// ============================================
// 时间轴数据
// ============================================
const timelineData = [
    { date: '2021年2月26日', title: '第一次相遇✨', text: '只能找到考研成绩的截图了，也许这就是无法复刻的相遇', images: [{src:'timeline_1/2021-02-26_001.jpg',caption:''}] },
    { date: '2022年6月4日', title: '网易云聊天时代🎵', text: '那时候小宝还是乖姐姐，我还是乖乖弟弟', images: [{src:'timeline_1/2022-06-04_001.jpg',caption:''},{src:'timeline_1/2022-06-08_001.jpg',caption:''}] },
    { date: '2022年6月30日', title: '终于爆照了📷', text: '我和小宝给对方发的第一张照片', images: [{src:'timeline_1/2022-06-30_001.jpg',caption:''},{src:'timeline_1/2022-0630_002.jpg',caption:''}] },
    { date: '2022年12月3日', title: '初见💋', text: '第一次牵手，第一次亲吻，清早的高铁站紧紧拥抱', images: [{src:'timeline_1/2022-12-03_001.jpg',caption:''},{src:'timeline_1/2022-12-03_002.jpg',caption:''},{src:'timeline_1/2022-12-03_003.jpg',caption:''}] },
    { date: '2023年2月17日', title: '第二次见面啦', text: '吃了茅庐川菜，看了流浪地球，小宝都睡着了😴', images: [{src:'timeline_1/2023-02-17_001.jpg',caption:''},{src:'timeline_1/2023-02-17_002.jpg',caption:''}] },
    { date: '2023年4月10日', title: '终于去徐州找小宝啦🧸', text: '虽然去了还一直在改论文，但给小宝带了布布一二 ，还住了锦江都城', images: [{src:'timeline_1/2023-04-10_001.jpg',caption:''},{src:'timeline_1/2023-04-10_002.jpg',caption:''}] },
    { date: '2023年5月2日', title: '第一次去红山动物园🐒', text: '在大树下休息的时候，看着小宝的侧脸，我真切体会到了什么叫人就是活几个瞬间', images: [{src:'timeline_1/2023-05-02_001.jpg',caption:''},{src:'timeline_1/2023-05-02_002.jpg',caption:''},{src:'timeline_1/2023-05-02_003.jpg',caption:''}] },
    { date: '2023年6月12日', title: '小宝临时多住一晚✨', text: '意料之外的最美好的一晚，去打了羽毛球，玩了滑滑梯', images: [{src:'timeline_1/2023-06-12_001.jpg',caption:''}] },
    { date: '2023年6月24日', title: '第一次陪小宝过生日啦🎂', text: '虽然只买了小小的蛋糕，在学校食堂的长椅上等了很久', images: [{src:'timeline_1/2023-06-24_001.jpg',caption:''}] },
    { date: '2023年10月1日', title: '第一次和小宝过国庆💕', text: '最喜欢骑电动车带小宝了，还❤❤了嘻嘻', images: [{src:'timeline_1/2023-10-01_001.jpg',caption:''},{src:'timeline_1/2023-10-01_002.jpg',caption:''},{src:'timeline_1/2023-10-01_003.jpg',caption:''},{src:'timeline_1/2023-10-01_004.jpg',caption:''}] },
    { date: '2023年12月3日', title: '一周年纪念🎉', text: '去泗洪和小宝过一周年啦，还吃了糖葫芦和小蛋糕！', images: [{src:'timeline_1/2023-12-03_001.jpg',caption:''},{src:'timeline_1/2023-12-03_002.jpg',caption:''}] },
    { date: '2023年12月30日', title: '第一次和小宝跨年咯🎆', text: '在镇江玩了几天，回来吃牛肉吃到要吐了', images: [{src:'timeline_1/2023-12-30_001.jpg',caption:''}] },
    { date: '2024年4月20日', title: '第一次看演唱会啦🎤', text: '小宝真厉害，抢到了凤凰传奇的演唱会！', images: [{src:'timeline_1/2024-04-20_001.jpg',caption:''}] },
    { date: '2024年6月1日', title: '许嵩演唱会🎵', text: '无需多言，曾经小宝的抢票能力！', images: [{src:'timeline_1/2024-06-01_001.jpg',caption:''}] },
    { date: '2024年6月15日', title: '陪小宝过的第二个生日！🎂', text: '在江阴给小宝过生日，小宝穿粉色可甜了', images: [{src:'timeline_1/2024-06-15_001.jpg',caption:''},{src:'timeline_1/2024-06-15_002.jpg',caption:''},{src:'timeline_1/2024-06-15_003.jpg',caption:''}] },
    { date: '2024年7月5日', title: '小宝陪我的第一个生日！🎂 ', text: '小宝都花心思布置呢 ，就是晚上烤羊排太腻了，最后还上了一大盆面', images: [{src:'timeline_1/2024-07-05_001.jpg',caption:''},{src:'timeline_1/2024-07-05_002.jpg',caption:''}] },
    { date: '2024年8月4日', title: '来徐州和小宝做戒指！💍', text: ' 带着摩手，可恶！', images: [{src:'timeline_1/2024-08-04_001.jpg',caption:''}] },
    { date: '2024年10月1日', title: '和小宝过的第二个国庆！🍲', text: '发了几天烧！但还是很开心！在雨花客厅吃火锅！', images: [{src:'timeline_1/2024-10-01_001.jpg',caption:''}] },
    { date: '2024年12月27日', title: '纪念小宝海底捞抓金豆😋', text: '那么多零食不记得吃了多久', images: [{src:'timeline_1/2024-12-27_001.jpg',caption:''}] },
    { date: '2024年12月31日', title: '第二次和小宝跨年咯🎆 ', text: '做了丑丑的爱心墙', images: [{src:'timeline_1/2024-12-31_001.jpg',caption:''}] },
    { date: '2025年5月11日', title: '小宝天天在家给我做饭呢🥩', text: '做了奇奇怪怪带血的牛肉 ~ 每天都期待小宝做的饭饭 ，带小夜宵给小宝吃！🌙', images: [{src:'timeline_1/2025-05-11_001.jpg',caption:''}] },
    { date: '2025年6月2日', title: '第三次给小宝过生日！🎂', text: '拍了超级好看的照片，买了好多好多气球呢，好开心！', images: [{src:'timeline_1/2025-06-02_001.jpg',caption:''},{src:'timeline_1/2025-06-02_002.jpg',caption:''}] },
    { date: '2025年6月12日', title: '小宝毕业了😜', text: '懂得都懂', images: [{src:'timeline_1/2025-06-12_001.jpg',caption:''}] },
    { date: '2025年6月21日', title: '来看苏超啦！⚽', text: '中途还去拉了个屎，下了老大的雨了！', images: [{src:'timeline_1/2025-06-21_001.jpg',caption:''}] },
    { date: '2025年7月5日', title: '小宝陪我的第二个生日！🎂', text: '收到了超级多礼物！超级感动！太爱小宝了！', images: [{src:'timeline_1/2025-07-05_001.jpg',caption:''},{src:'timeline_1/2025-07-05_002.jpg',caption:''}] },
    { date: '2025年12月7日', title: '来崇州找小宝啦✈️', text: ' 超级赶的两天，和小宝去了小众宝藏公园，但还是很开心!', images: [{src:'timeline_1/2025-12-07_01.jpg',caption:''},{src:'timeline_1/2025-12-07_02.jpg',caption:''}] },
    { date: '2026年2月11日', title: '第一次去迪士尼！🥳', text: '最最最最最最后悔的事！就是跟小宝发脾气! ', images: [{src:'timeline_1/2026-02-11_01.jpeg',caption:''}] }
];

// ============================================
// 时间轴动画
// ============================================
function initTimeline() {
    const container = document.getElementById('timeline');
    const header = document.querySelector('.timeline-header h1');
    const headerDesc = document.querySelector('.timeline-header p');
    const backBtn = document.querySelector('.back-btn');

    if (!header) return;

    // 动态渲染时间轴
    if (container) {
        container.innerHTML = timelineData.map((item, index) => `
            <article class="timeline-item" data-index="${index}">
                <div class="timeline-card">
                    <img src="${item.images[0].src}" alt="预览图" class="preview-image">
                    <div class="timeline-date">${item.date}</div>
                    <h3>${item.title}</h3>
                    <p>${item.text || '那一天，留下了美好的回忆...'}</p>
                </div>
            </article>
        `).join('');
    }

    const timelineItems = document.querySelectorAll('.timeline-item');

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.8
    })
    .to(headerDesc, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to(backBtn, {
        opacity: 1,
        x: 0,
        duration: 0.6
    }, '-=0.5');

    // 时间节点依次动画进入
    timelineItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.3 + index * 0.25,
            ease: 'back.out(1.7)'
        });
    });

    // 滚动视差效果
    if (window.innerWidth > 768) {
        gsap.utils.toArray('.timeline-item').forEach((item) => {
            gsap.to(item, {
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    // 点击打开模态框
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openTimelineModal(index);
        });
    });
}

// ============================================
// 模态框功能
// ============================================
function initModals() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const overlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    // 点击时间卡片打开模态框
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // 点击关闭按钮
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // 点击遮罩关闭
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 模态框内容动画
    const content = modal.querySelector('.modal-content');
    gsap.fromTo(content,
        { scale: 0.8, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 图片淡入
    const img = modal.querySelector('.modal-image');
    gsap.fromTo(img,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2 }
    );
}

function closeModal(modal) {
    gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            gsap.set(modal, { clearProps: 'opacity' });
        }
    });
}

// ============================================
// 音乐控制（可选功能）
// ============================================
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    const audio = new Audio('https://example.com/love-song.mp3');
    audio.loop = true;
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = '🎵';
        } else {
            audio.play();
            musicBtn.textContent = '🎶';
        }
        isPlaying = !isPlaying;
    });
}

// ============================================
// 心形点击特效
// ============================================
function initHeartEffect() {
    document.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(heart);

        gsap.to(heart, {
            y: -100,
            opacity: 0,
            scale: 1.5,
            duration: 1,
            ease: 'power1.out',
            onComplete: () => heart.remove()
        });
    });
}

// ============================================
// 旅行地图
// ============================================
function initMapPage() {
    const header = document.querySelector('.map-header h1');
    const headerDesc = document.querySelector('.map-header p');
    const backBtn = document.querySelector('.back-btn');
    const mapContainer = document.querySelector('.map-container');

    if (!header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(headerDesc, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(backBtn, { opacity: 1, x: 0, duration: 0.6 }, '-=0.5')
      .to(mapContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');

    // 城市标签点击
    const cityTags = document.querySelectorAll('.city-tag');
    cityTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const city = tag.dataset.city;
            showCityDetail(city);
        });
    });
}

// ============================================
// ECharts 中国地图
// ============================================

// 省份名称到文件名的映射
const provinceMap = {
    '四川': 'sichuan', '北京': 'beijing', '上海': 'shanghai',
    '云南': 'yunnan', '浙江': 'zhejiang', '广东': 'guangdong',
    '湖北': 'hubei', '湖南': 'hunan', '重庆': 'chongqing',
    '陕西': 'shanxi', '江苏': 'jiangsu', '山东': 'shandong',
    '福建': 'fujian', '新疆': 'xinjiang', '西藏': 'xizang',
    '海南': 'hainan', '贵州': 'guizhou', '广西': 'guangxi',
    '安徽': 'anhui', '江西': 'jiangxi', '河南': 'henan',
    '山西': 'shanxi', '河北': 'hebei', '天津': 'tianjin',
    '辽宁': 'liaoning', '吉林': 'jilin', '黑龙江': 'heilongjiang',
    '内蒙古': 'neimenggu', '宁夏': 'ningxia', '甘肃': 'gansu',
    '青海': 'qinghai'
};

let chart = null;
let currentLevel = 'china'; // 'china' or 'province'
let currentProvince = null;

// 规范化城市名称（去除 ECharts 地图后缀）
function normalizeCityName(name) {
    return name.replace(/(藏族自治州|回族自治州|蒙古族自治州|彝族自治州|傣族自治州|壮族自治州|布依族自治州|侗族自治州|瑶族自治州|白族自治州|哈尼族自治州|哈萨克自治州|柯尔克孜自治州|朝鲜族自治州|自治州|自治县|地区|林区|特区|新区|矿区|市辖区|市|县|区|旗|盟)$/, '');
}

function initEchartsMap() {
    const mapEl = document.getElementById('chinaMap');
    if (!mapEl) return;

    chart = echarts.init(mapEl);
    loadChinaMap();
}

function loadChinaMap() {
    currentLevel = 'china';
    currentProvince = null;

    // 隐藏返回按钮
    const backBtn = document.getElementById('backToChina');
    if (backBtn) backBtn.classList.remove('visible');

    // 去过的地方（只显示省级）
    const visitedProvinces = [...new Set(
        Object.keys(cityData).map(key => key.split('-')[0])
    )];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (cityData[params.name]) {
                    return params.name + '<br/>点击查看详情';
                }
                if (provinceMap[params.name]) {
                    return params.name + '<br/>点击查看地级市';
                }
                return params.name;
            }
        },
        series: [{
            name: '中国地图',
            type: 'map',
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: {
                show: false
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: '#FF69B4'
                }
            },
            select: {
                disabled: true
            },
            data: visitedProvinces.map(name => ({
                name: name,
                itemStyle: {
                    areaColor: '#DB7093'
                }
            }))
        }]
    };

    chart.setOption(option, true);

    // 点击省份 - 进入地级市或显示详情
    chart.off('click');
    chart.on('click', function(params) {
        if (!params.name) return;

        // 如果该省份有数据且不是省级地图入口，点击显示详情
        if (cityData[params.name] && !provinceMap[params.name]) {
            showCityDetail(params.name);
            return;
        }

        // 如果有下级地图，加载地级市
        if (provinceMap[params.name]) {
            loadProvinceMap(params.name);
        } else {
            alert('这个地方还没有添加旅行记录哦～');
        }
    });

    window.addEventListener('resize', () => chart.resize());
}

function loadProvinceMap(provinceName) {
    const mapFile = provinceMap[provinceName];
    if (!mapFile) return;

    currentLevel = 'province';
    currentProvince = provinceName;

    // 显示返回按钮
    const backBtn = document.getElementById('backToChina');
    if (backBtn) backBtn.classList.add('visible');

    // 如果地图已加载，直接渲染
    if (echarts.getMap(provinceName)) {
        renderProvinceMap(provinceName);
        return;
    }

    // 动态加载省级地图
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/npm/echarts/map/js/province/${mapFile}.js`;
    script.onload = function() {
        renderProvinceMap(provinceName);
    };
    script.onerror = function() {
        alert('加载地图失败，请稍后重试');
    };
    document.body.appendChild(script);
}

function renderProvinceMap(provinceName) {
    // 获取该省份去过的地方
    const visitedCities = Object.keys(cityData)
        .filter(key => key.startsWith(provinceName + '-'))
        .map(key => key.replace(provinceName + '-', ''));

    // 通过 ECharts 获取地图中实际使用的城市名称，建立规范化映射
    const mapData = echarts.getMap(provinceName);
    const exactNames = mapData && mapData.geoJson ? mapData.geoJson.features.map(f => f.properties.name) : [];
    const nameMap = {};
    exactNames.forEach(exact => {
        nameMap[normalizeCityName(exact)] = exact;
    });

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const normalizedCity = normalizeCityName(params.name);
                const fullName = provinceName + '-' + normalizedCity;
                if (cityData[fullName]) {
                    return params.name + '<br/>点击查看详情';
                }
                return params.name;
            }
        },
        series: [{
            name: provinceName,
            type: 'map',
            map: provinceName,
            roam: true,
            zoom: 1.5,
            label: {
                show: true,
                fontSize: 10
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: '#FF69B4'
                }
            },
            select: {
                disabled: true
            },
            data: visitedCities.map(name => {
                const exactName = nameMap[name] || name;
                return {
                    name: exactName,
                    itemStyle: {
                        areaColor: '#DB7093'
                    }
                };
            })
        }]
    };

    chart.setOption(option, true);

    // 点击地级市
    chart.off('click');
    chart.on('click', function(params) {
        if (!params.name) return;

        const normalizedCity = normalizeCityName(params.name);
        const fullName = provinceName + '-' + normalizedCity;
        if (cityData[fullName]) {
            showCityDetail(fullName);
        } else {
            alert('这个城市还没有添加旅行记录哦～');
        }
    });
}

// 城市数据（修改这里添加旅行记录）
// 格式：'省份-城市'，图片放在 travel_1/ 目录，命名：城市名_01.jpg
const cityData = {
    '上海-上海': {
        date: '2024年1月',
        title: '上海',
        text: '小宝拍的我的背影，历历在目。。。',
        images: [
            { src: 'travel_1/上海_01.jpg', caption: '' },
            { src: 'travel_1/上海_02.jpg', caption: '' },
            { src: 'travel_1/上海_03.jpg', caption: '' },
            { src: 'travel_1/上海_04.jpg', caption: '' },
            { src: 'travel_1/上海_05.jpg', caption: '' },
            { src: 'travel_1/上海_06.jpg', caption: '' }
        ]
    },
    '江苏-南京': {
        date: '2024年春',
        title: '南京',
        text: '我们最爱的南京！待的最久的地方！',
        images: [
            { src: 'travel_1/南京_01.jpg', caption: '' },
            { src: 'travel_1/南京_01 (2).jpg', caption: '' },
            { src: 'travel_1/南京_02.jpg', caption: '' },
            { src: 'travel_1/南京_03.jpg', caption: '' }
        ]
    },
    '安徽-合肥': {
        date: '2023年秋',
        title: '合肥',
        text: '和小宝看了我的母校！还有好喝的卡旺卡！',
        images: [
            { src: 'travel_1/合肥_01.jpg', caption: '' },
            { src: 'travel_1/合肥_02.jpg', caption: '' }
        ]
    },
    '浙江-嘉兴': {
        date: '2023年夏',
        title: '嘉兴',
        text: '啥也没有的海宁。',
        images: [
            { src: 'travel_1/嘉兴_01.jpg', caption: '' },
            { src: 'travel_1/嘉兴_02.jpg', caption: '' }
        ]
    },
    '江苏-宿迁': {
        date: '2023年夏',
        title: '宿迁',
        text: '早餐还不错',
        images: [
            { src: 'travel_1/宿迁_01.jpg', caption: '' }
        ]
    },
    '江苏-常州': {
        date: '2023年秋',
        title: '常州',
        text: '划船困到要睡着了',
        images: [
            { src: 'travel_1/常州_01.jpg', caption: '' },
            { src: 'travel_1/常州_02.jpg', caption: '' }
        ]
    },
    '江苏-徐州': {
        date: '2023年冬',
        title: '徐州',
        text: '仅次于南京的历史地位',
        images: [
            { src: 'travel_1/徐州_01.jpg', caption: '' },
            { src: 'travel_1/徐州_02.jpg', caption: '' }
        ]
    },
    '四川-成都': {
        date: '2023年夏',
        title: '成都',
        text: '在汉堡王的小宝都可怜的很呢',
        images: [
            { src: 'travel_1/成都_01.jpg', caption: '' },
            { src: 'travel_1/成都_02.jpg', caption: '' }
        ]
    },
    '江苏-扬州': {
        date: '2023年春',
        title: '扬州',
        text: '第一次和小宝旅游，小宝也太美了！',
        images: [
            { src: 'travel_1/扬州_01.jpg', caption: '' },
            { src: 'travel_1/扬州_02.jpg', caption: '' },
            { src: 'travel_1/扬州_03.jpg', caption: '' }
        ]
    },
    '江苏-无锡': {
        date: '2023年秋',
        title: '无锡',
        text: '这江阴最好玩的也就是八佰伴了',
        images: [
            { src: 'travel_1/无锡_01.jpg', caption: '' },
            { src: 'travel_1/无锡_02.jpg', caption: '' }
        ]
    },
    '浙江-杭州': {
        date: '2024年春',
        title: '杭州',
        text: '西湖，无需多言，想要再去几次！',
        images: [
            { src: 'travel_1/杭州_01.jpg', caption: '' },
            { src: 'travel_1/杭州_02.jpg', caption: '' }
        ]
    },
    '江苏-淮安': {
        date: '2023年夏',
        title: '淮安',
        text: '去了超级远的洪泽湖！还度过了最快乐的一天！',
        images: [
            { src: 'travel_1/淮安_01.jpg', caption: '' },
            { src: 'travel_1/淮安_02.jpg', caption: '' },
            { src: 'travel_1/淮安_03.jpg', caption: '' },
            { src: 'travel_1/淮安_04.jpg', caption: '' }
        ]
    },
    '四川-甘孜': {
        date: '2023年秋',
        title: '甘孜',
        text: '九寨沟还是太权威了，就是去一下得花三天时间',
        images: [
            { src: 'travel_1/甘孜_01.jpg', caption: '' },
            { src: 'travel_1/甘孜_02.jpg', caption: '' }
        ]
    },
    '江苏-苏州': {
        date: '2023年春',
        title: '苏州',
        text: '这常熟感觉也一般般，确实人少',
        images: [
            { src: 'travel_1/苏州_01.jpg', caption: '' },
            { src: 'travel_1/苏州_02.jpg', caption: '' }
        ]
    },
    '江苏-连云港': {
        date: '2023年夏',
        title: '连云港',
        text: '超级冷小宝还不多穿点!但是看小宝吃皮皮虾和梭子蟹还是很满足',
        images: [
            { src: 'travel_1/连云港_01.jpg', caption: '' },
            { src: 'travel_1/连云港_02.jpg', caption: '' },
            { src: 'travel_1/连云港_03.jpg', caption: '' },
            { src: 'travel_1/连云港_04.jpg', caption: '' }
        ]
    },
    '江苏-镇江': {
        date: '2023年秋',
        title: '镇江',
        text: '金山寺、北固山、西津渡、感觉不如年会不能停',
        images: [
            { src: 'travel_1/镇江_01.jpg', caption: '' },
            { src: 'travel_1/镇江_02.jpg', caption: '' }
        ]
    }
};

// 画廊状态
let currentGalleryImages = [];
let currentGalleryIndex = 0;

function showCityDetail(city) {
    const data = cityData[city];
    if (!data) {
        alert('这个地方还没有添加旅行记录哦～');
        return;
    }

    // 支持新版 images 数组和旧版 image 字符串
    currentGalleryImages = data.images || (data.image ? [{ src: data.image, caption: '' }] : []);
    currentGalleryIndex = 0;

    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalText').textContent = data.text;

    renderGallery();

    const modal = document.getElementById('cityModal');
    openModal(modal);
}

function renderGallery() {
    const imgEl = document.getElementById('modalImage');
    const captionEl = document.getElementById('galleryCaption');
    const dotsEl = document.getElementById('galleryDots');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (currentGalleryImages.length === 0) {
        imgEl.src = '';
        if (captionEl) captionEl.textContent = '';
        if (dotsEl) dotsEl.innerHTML = '';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    const item = currentGalleryImages[currentGalleryIndex];
    imgEl.src = item.src;
    if (captionEl) captionEl.textContent = item.caption || '';

    // 渲染指示点
    if (dotsEl) {
        dotsEl.innerHTML = currentGalleryImages.map((_, i) =>
            `<span class="gallery-dot ${i === currentGalleryIndex ? 'active' : ''}" data-index="${i}"></span>`
        ).join('');
        dotsEl.querySelectorAll('.gallery-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentGalleryIndex = parseInt(dot.dataset.index);
                renderGallery();
            });
        });
    }

    // 显示/隐藏切换按钮
    const showNav = currentGalleryImages.length > 1;
    if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    renderGallery();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    renderGallery();
}

function initMapModals() {
    const modal = document.getElementById('cityModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevGalleryImage(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextGalleryImage(); });
}

// ============================================
// 时间轴模态框与画廊
// ============================================
let timelineGalleryImages = [];
let timelineGalleryIndex = 0;

function openTimelineModal(index) {
    const data = timelineData[index];
    if (!data) return;

    timelineGalleryImages = data.images || [];
    timelineGalleryIndex = 0;

    document.getElementById('timelineModalDate').textContent = data.date;
    document.getElementById('timelineModalTitle').textContent = data.title;
    document.getElementById('timelineModalText').textContent = data.text || '那一天，留下了美好的回忆...';

    renderTimelineGallery();

    const modal = document.getElementById('timelineModal');
    openModal(modal);
}

function renderTimelineGallery() {
    const imgEl = document.getElementById('timelineModalImage');
    const captionEl = document.getElementById('timelineGalleryCaption');
    const dotsEl = document.getElementById('timelineGalleryDots');
    const prevBtn = document.getElementById('timelineGalleryPrev');
    const nextBtn = document.getElementById('timelineGalleryNext');

    if (timelineGalleryImages.length === 0) {
        imgEl.src = '';
        if (captionEl) captionEl.textContent = '';
        if (dotsEl) dotsEl.innerHTML = '';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    const item = timelineGalleryImages[timelineGalleryIndex];
    imgEl.src = item.src;
    if (captionEl) captionEl.textContent = item.caption || '';

    if (dotsEl) {
        dotsEl.innerHTML = timelineGalleryImages.map((_, i) =>
            `<span class="gallery-dot ${i === timelineGalleryIndex ? 'active' : ''}" data-index="${i}"></span>`
        ).join('');
        dotsEl.querySelectorAll('.gallery-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                timelineGalleryIndex = parseInt(dot.dataset.index);
                renderTimelineGallery();
            });
        });
    }

    const showNav = timelineGalleryImages.length > 1;
    if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';
}

function nextTimelineGalleryImage() {
    timelineGalleryIndex = (timelineGalleryIndex + 1) % timelineGalleryImages.length;
    renderTimelineGallery();
}

function prevTimelineGalleryImage() {
    timelineGalleryIndex = (timelineGalleryIndex - 1 + timelineGalleryImages.length) % timelineGalleryImages.length;
    renderTimelineGallery();
}

function initTimelineModals() {
    const modal = document.getElementById('timelineModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    const prevBtn = document.getElementById('timelineGalleryPrev');
    const nextBtn = document.getElementById('timelineGalleryNext');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevTimelineGalleryImage(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextTimelineGalleryImage(); });
}

// ============================================
// 抽奖功能
// ============================================
function initLottery() {
    const header = document.querySelector('.lottery-header h1');
    const headerDesc = document.querySelector('.lottery-header p');
    const chanceCounter = document.querySelector('.chance-counter');
    const lotteryContainer = document.querySelector('.lottery-container');
    const prizeConfig = document.querySelector('.prize-config');
    const lotteryHistory = document.querySelector('.lottery-history');
    const backBtn = document.querySelector('.back-btn');

    if (!header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(headerDesc, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(chanceCounter, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(lotteryContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(prizeConfig, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(lotteryHistory, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(backBtn, { opacity: 1, x: 0, duration: 0.6 }, '-=0.8');

    // 初始化抽奖次数
    let chances = parseInt(localStorage.getItem('lotteryChances')) || 5;
    document.getElementById('chanceCount').textContent = chances;

    // 初始化转盘扇形位置
    initWheelSegments();

    // 抽奖按钮
    const lotteryBtn = document.getElementById('lotteryBtn');
    lotteryBtn.addEventListener('click', () => startLottery());
}

function initWheelSegments() {
    const segments = document.querySelectorAll('.wheel-segment');
    const centerX = 140;
    const centerY = 140;
    const radius = 95;

    // prizeList = [0,7,6,5,4,3,2,1] 顺时针排列
    // i=0在0°(顶)，i=1在45°，i=2在90°...
    segments.forEach((seg, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180);

        const x = centerX + radius * Math.cos(angle) - 35;
        const y = centerY + radius * Math.sin(angle) - 10;

        seg.style.left = x + 'px';
        seg.style.top = y + 'px';
    });
}

function startLottery() {
    let chances = parseInt(localStorage.getItem('lotteryChances')) || 5;

    if (chances <= 0) {
        alert('今天的抽奖次数用完啦～明天再来吧！');
        return;
    }

    const btn = document.getElementById('lotteryBtn');
    btn.disabled = true;

    const wheel = document.getElementById('lotteryWheel');
    const prizes = document.querySelectorAll('.wheel-segment');

    // X = 0-7
    const X = Math.floor(Math.random() * 8);

    // 逆时针转 X*45 度
    const rotation = -45 * X + 360 * Math.floor(Math.random() * 4); // 多转几圈增加动画效果

    // 奖品 = X % 8
    const prizeIndex = X % 8;
    const prize = prizes[prizeIndex].dataset.prize;

    // 动画
    gsap.to(wheel, {
        rotation: '+=' + rotation,
        duration: 4,
        ease: 'power2.out',
        onComplete: () => {
            // 减少次数
            chances--;
            localStorage.setItem('lotteryChances', chances);
            document.getElementById('chanceCount').textContent = chances;

            // 显示结果
            showPrizeResult(prize);
            addToHistory(prize);

            // 转回去回到原位
            gsap.to(wheel, {
                rotation: '+=' + (-rotation),
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    btn.disabled = false;
                }
            });
        }
    });
}

function showPrizeResult(prize) {
    const modal = document.getElementById('prizeModal');
    const prizeName = document.getElementById('prizeName');
    const prizeEmoji = document.getElementById('prizeEmoji');

    prizeEmoji.textContent = '🎉';
    prizeName.textContent = prize;

    modal.classList.add('active');

    const closeBtn = modal.querySelector('.prize-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    }, { once: true });
}

function addToHistory(prize) {
    const historyList = document.getElementById('historyList');
    const emptyMsg = historyList.querySelector('.history-empty');
    if (emptyMsg) emptyMsg.remove();

    const li = document.createElement('li');
    const now = new Date();
    const timeStr = `${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    li.innerHTML = `
        <span class="history-prize">${prize}</span>
        <span class="history-time">${timeStr}</span>
    `;

    historyList.insertBefore(li, historyList.firstChild);

    // 保存到本地
    let history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
    history.unshift({ prize, time: now.toISOString() });
    history = history.slice(0, 10);
    localStorage.setItem('lotteryHistory', JSON.stringify(history));
}

// ============================================
// 留言板 (Firebase 版本)
// ============================================
function initGuestbook(db) {
    const header = document.querySelector('.guestbook-header h1');
    const headerDesc = document.querySelector('.guestbook-header p');
    const messageForm = document.querySelector('.message-form');
    const messagesContainer = document.querySelector('.messages-container');
    const backBtn = document.querySelector('.back-btn');

    if (!header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(headerDesc, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(messageForm, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(messagesContainer, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(backBtn, { opacity: 1, x: 0, duration: 0.6 }, '-=0.5');

    // 留言表单
    const form = document.getElementById('messageForm');
    const textarea = document.getElementById('messageContent');
    const charCount = document.getElementById('charCount');

    textarea.addEventListener('input', () => {
        charCount.textContent = textarea.value.length;
    });

    // 心情选择
    const moodIcons = document.querySelectorAll('.mood-icon');
    moodIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            moodIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            document.getElementById('selectedMood').value = icon.dataset.mood;
        });
    });

    // 默认选中第一个
    moodIcons[0].classList.add('active');

    // 提交留言 - 使用 Firebase
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const author = document.getElementById('authorName').value.trim();
        const content = textarea.value.trim();
        const mood = document.getElementById('selectedMood').value;

        if (!author || !content) {
            alert('请填写姓名和留言内容');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';

        try {
            await db.collection('messages').add({
                author,
                content,
                mood,
                time: firebase.firestore.FieldValue.serverTimestamp()
            });

            form.reset();
            charCount.textContent = '0';
        } catch (error) {
            console.error('发送失败:', error);
            alert('发送失败，请稍后重试');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '发送留言';
        }
    });

    // 实时监听留言变化
    loadMessagesRealtime(db);
}

function loadMessagesRealtime(db) {
    const messagesList = document.getElementById('messagesList');
    const messageCount = document.getElementById('messageCount');
    const moodEmojis = {
        happy: '😊',
        love: '😍',
        sad: '😢',
        shy: '😳',
        excited: '🤩'
    };

    // 清空现有留言
    messagesList.innerHTML = '<div class="loading-messages">加载中...</div>';

    // 实时监听 Firestore 集合
    db.collection('messages')
        .orderBy('time', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
            messagesList.innerHTML = '';

            if (snapshot.empty) {
                messagesList.innerHTML = '<div class="no-messages">还没有留言，快来写下第一句吧！</div>';
                messageCount.textContent = '0';
                return;
            }

            snapshot.forEach((doc) => {
                const msg = doc.data();
                const time = msg.time ? new Date(msg.time.seconds * 1000) : new Date();
                const timeStr = time.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

                const article = document.createElement('article');
                article.className = 'message-card';
                article.innerHTML = `
                    <div class="message-header">
                        <span class="message-author">${escapeHtml(msg.author)}</span>
                        <span class="message-mood">${moodEmojis[msg.mood] || '😍'}</span>
                        <time class="message-time">${timeStr}</time>
                    </div>
                    <p class="message-content">${escapeHtml(msg.content)}</p>
                `;
                messagesList.appendChild(article);
            });

            messageCount.textContent = snapshot.size;
        }, (error) => {
            console.error('加载失败:', error);
            messagesList.innerHTML = '<div class="error-messages">加载失败，请刷新重试</div>';
        });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 根据页面初始化不同功能
    if (document.querySelector('.home')) {
        initHomeAnimation();
        initHeartEffect();

        // 主页导航动画
        const homeNav = document.querySelector('.home-nav');
        if (homeNav) {
            gsap.to(homeNav, { opacity: 1, y: 0, duration: 0.8, delay: 1 });
        }
    }
});