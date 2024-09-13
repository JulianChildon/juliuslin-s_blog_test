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

// 假设我们有一个简单的博客帖子数组（在实际应用中，这应该是通过后端API获取的数据）
let blogPosts = [
    { id: 1, title: "Post Title 1", content: "This is the content of the first blog post." },
    { id: 2, title: "Post Title 2", content: "This is the content of the second blog post." }
];

// 加载博客帖子到页面
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts-container');
    blogContainer.innerHTML = ''; // 清空现有内容

    blogPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${post.id})">编辑</button>
            <button onclick="deletePost(${post.id})">删除</button>
        `;
        blogContainer.appendChild(postDiv);
    });
}

// 发布新博客
document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const newPost = {
        id: blogPosts.length + 1,
        title,
        content
    };

    blogPosts.push(newPost);
    loadBlogPosts();
    this.reset(); // 重置表单
});





// 页面加载时显示博客帖子
window.onload = loadBlogPosts;
// 从 localStorage 中加载博客帖子
function loadBlogPosts(page = 1) {
    const blogContainer = document.getElementById('blog-posts-container');
    blogContainer.innerHTML = ''; // 清空现有内容

    // 从 localStorage 中获取博客帖子
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // 分页逻辑：每页显示 5 篇帖子
    const postsPerPage = 5;
    const start = (page - 1) * postsPerPage;
    const end = page * postsPerPage;
    const postsToShow = blogPosts.slice(start, end);

    // 动态生成博客帖子 HTML
    postsToShow.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p> <!-- 显示前100个字符 -->
            <p><small>发布时间：${post.timestamp}</small></p>
            <button onclick="viewFullPost(${post.id})" class="view-more-button">阅读更多</button>
        `;
        blogContainer.appendChild(postDiv);
    });

    // 更新分页
    updatePagination(page, blogPosts.length);
}

// 更新分页状态
function updatePagination(currentPage, totalPosts) {
    const totalPages = Math.ceil(totalPosts / 5); // 每页5篇帖子
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// 分页按钮点击事件
document.getElementById('next-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    loadBlogPosts(currentPage + 1);
});

document.getElementById('prev-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    loadBlogPosts(currentPage - 1);
});

// 页面加载时显示博客帖子
window.onload = () => {
    loadBlogPosts();
};
