// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// 添加退出功能
document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn'); // 清除登录状态
    window.location.href = "login.html"; // 重定向回登录页面
});
// 为每个博客文章的 "Read More" 链接添加点击事件
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // 阻止默认行为（页面跳转）

        // 获取当前点击的博客文章内容区域
        const moreContent = this.previousElementSibling;

        // 切换展开和收起效果
        if (moreContent.classList.contains('show')) {
            moreContent.classList.remove('show');
            this.textContent = 'Read More'; // 切换为 'Read More'
        } else {
            moreContent.classList.add('show');
            this.textContent = 'Read Less'; // 切换为 'Read Less'
        }
    });
});
