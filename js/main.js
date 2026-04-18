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

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

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
        duration: 0.8
    }, '-=0.3')
    .to(sinceText, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to(entryBtn, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5');
}

// ============================================
// 时间轴动画
// ============================================
function initTimeline() {
    const header = document.querySelector('.timeline-header h1');
    const headerDesc = document.querySelector('.timeline-header p');
    const backBtn = document.querySelector('.back-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!header) return;

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
            delay: 0.3 + index * 0.15,
            ease: 'power2.out'
        });
    });

    // 滚动视差效果
    if (window.innerWidth > 768) {
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
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

    chart.setOption(option);

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

    // 动态加载省级地图
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/npm/echarts/map/js/province/${mapFile}.js`;
    script.onload = function() {
        // 获取该省份去过的地方
        const visitedCities = Object.keys(cityData)
            .filter(key => key.includes(provinceName + '-'))
            .map(key => key.replace(provinceName + '-', ''));

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const fullName = provinceName + '-' + params.name;
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
                data: visitedCities.map(name => ({
                    name: name,
                    itemStyle: {
                        areaColor: '#DB7093'
                    }
                }))
            }]
        };

        chart.setOption(option);

        // 点击地级市
        chart.off('click');
        chart.on('click', function(params) {
            if (!params.name) return;

            const fullName = provinceName + '-' + params.name;
            if (cityData[fullName]) {
                showCityDetail(fullName);
            } else {
                alert('这个城市还没有添加旅行记录哦～');
            }
        });
    };
    script.onerror = function() {
        alert('加载地图失败，请稍后重试');
    };
    document.body.appendChild(script);
}

// 城市数据（修改这里添加旅行记录）
// 格式：'省份' 或 '省份-城市'
const cityData = {
    // 省级记录
    '四川': {
        date: '2023年7月',
        title: '🏔️ 四川之旅',
        text: '一起去了成都，吃了火锅，看了熊猫基地。那几天的时光真的很美好，每天都在一起探索这座城市。',
        image: 'https://picsum.photos/700/400?random=10'
    },
    '北京': {
        date: '2023年10月1日',
        title: '🏯 北京之旅',
        text: '国庆节一起去北京，看了升旗仪式，爬了长城。故宫的红墙绿瓦真的很美，你穿汉服的样子让我心动不已。',
        image: 'https://picsum.photos/700/400?random=11'
    },
    '上海': {
        date: '2024年1月',
        title: '🌆 上海之旅',
        text: '外滩的夜景真美，我们手牵手走在江边。虽然很冷，但你靠在我身边的温度现在还记得。',
        image: 'https://picsum.photos/700/400?random=12'
    },
    '云南': {
        date: '2024年3月',
        title: '🌸 云南之旅',
        text: '丽江古城好美，我们一起骑自行车环洱海，看日出日落。那里的星空是我见过最美的。',
        image: 'https://picsum.photos/700/400?random=13'
    },
    '浙江': {
        date: '2024年清明',
        title: '🏞️ 浙江之旅',
        text: '西湖边散步，断桥残雪，你说是我们爱情的象征。雷峰塔下的誓言我永远不会忘记。',
        image: 'https://picsum.photos/700/400?random=14'
    },
    '广东': {
        date: '2024年6月',
        title: '🌴 广东之旅',
        text: '广州早茶太好吃了！深圳的霓虹灯真漂亮，我们一起逛了世界之窗。',
        image: 'https://picsum.photos/700/400?random=15'
    },
    '湖北': {
        date: '2023年9月',
        title: '🏔️ 湖北之旅',
        text: '武汉的热干面真的很香，黄鹤楼很壮观。长江边的晚风吹得很舒服。',
        image: 'https://picsum.photos/700/400?random=16'
    },
    '湖南': {
        date: '2024年劳动节',
        title: '🌊 湖南之旅',
        text: '张家界的天门山太美了！凤凰古城夜景很浪漫，我们一起看了篝火晚会。',
        image: 'https://picsum.photos/700/400?random=17'
    },
    '重庆': {
        date: '2024年2月',
        title: '🏙️ 重庆之旅',
        text: '洪崖洞夜景太美了！火锅辣得很过瘾，轻轨穿楼而过真的很神奇。',
        image: 'https://picsum.photos/700/400?random=18'
    },
    '陕西': {
        date: '2023年11月',
        title: '🏯 陕西之旅',
        text: '西安的城墙好长，兵马俑很震撼。回民街的小吃吃到停不下来。',
        image: 'https://picsum.photos/700/400?random=19'
    },

    // 地级市记录（格式：省份-城市）
    '四川-成都': {
        date: '2023年7月15日',
        title: '🍲 成都',
        text: '宽窄巷子、锦里、武侯祠...火锅、串串、兔头，吃货的天堂！',
        image: 'https://picsum.photos/700/400?random=20'
    },
    '四川-绵阳': {
        date: '2023年7月18日',
        title: '🏔️ 绵阳',
        text: '去了药王山，空气特别好。还吃了绵阳的米粉，很香！',
        image: 'https://picsum.photos/700/400?random=21'
    },
    '北京-北京': {
        date: '2023年10月1日',
        title: '🏯 北京',
        text: '天安门、故宫、长城、颐和园...满满的首都记忆。',
        image: 'https://picsum.photos/700/400?random=22'
    },
    '上海-上海': {
        date: '2024年1月10日',
        title: '🌆 上海',
        text: '外滩、豫园、田子坊、上海塔...国际化大都市的浪漫。',
        image: 'https://picsum.photos/700/400?random=23'
    },
    '云南-丽江': {
        date: '2024年3月5日',
        title: '🌸 丽江',
        text: '古城四方街、木府、黑龙潭。夜晚的酒吧街很热闹。',
        image: 'https://picsum.photos/700/400?random=24'
    },
    '云南-大理': {
        date: '2024年3月8日',
        title: '🏔️ 大理',
        text: '洱海骑行、苍山索道、双廊古镇。日出美得让人窒息。',
        image: 'https://picsum.photos/700/400?random=25'
    },
    '浙江-杭州': {
        date: '2024年4月4日',
        title: '🏞️ 杭州',
        text: '西湖十景走了一遍，断桥残雪真的很美。',
        image: 'https://picsum.photos/700/400?random=26'
    },
    '浙江-宁波': {
        date: '2024年4月6日',
        title: '🌊 宁波',
        text: '天一广场、老外滩，吃了正宗的宁波汤圆。',
        image: 'https://picsum.photos/700/400?random=27'
    },
    '广东-广州': {
        date: '2024年6月1日',
        title: '🌴 广州',
        text: '早茶文化太棒了！小蛮腰的夜景绝了。',
        image: 'https://picsum.photos/700/400?random=28'
    },
    '广东-深圳': {
        date: '2024年6月3日',
        title: '🏙️ 深圳',
        text: '世界之窗、欢乐谷，年轻的城市充满活力。',
        image: 'https://picsum.photos/700/400?random=29'
    },
    '湖北-武汉': {
        date: '2023年9月15日',
        title: '🏔️ 武汉',
        text: '黄鹤楼、户部巷、武汉大学。热干面真的很香！',
        image: 'https://picsum.photos/700/400?random=30'
    },
    '湖南-长沙': {
        date: '2024年5月1日',
        title: '🌊 长沙',
        text: '橘子洲头、岳麓山、太平街。茶颜悦色太好喝了！',
        image: 'https://picsum.photos/700/400?random=31'
    },
    '湖南-张家界': {
        date: '2024年5月3日',
        title: '🏔️ 张家界',
        text: '天门山玻璃栈道太刺激了！大峡谷的玻璃桥很震撼。',
        image: 'https://picsum.photos/700/400?random=32'
    },
    '重庆-重庆': {
        date: '2024年2月14日',
        title: '🏙️ 重庆',
        text: '情人节去的！洪崖洞、解放碑、长江索道，浪漫满分。',
        image: 'https://picsum.photos/700/400?random=33'
    },
    '陕西-西安': {
        date: '2023年11月10日',
        title: '🏯 西安',
        text: '城墙骑行、兵马俑、华清池。历史感满满的城市。',
        image: 'https://picsum.photos/700/400?random=34'
    }
};

function showCityDetail(city) {
    const data = cityData[city];
    if (!data) {
        alert('这个地方还没有添加旅行记录哦～');
        return;
    }

    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalText').textContent = data.text;

    const modal = document.getElementById('cityModal');
    openModal(modal);
}

function initMapModals() {
    const modal = document.getElementById('cityModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
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