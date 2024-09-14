document.getElementById('create-post-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const newPost = {
        id: blogPosts.length + 1,
        title,
        content
    };

    blogPosts.push(newPost);
    alert("博客发布成功！");
    window.location.href = 'index.html#blog'; // 发布成功后返回博客列表页
});
// 检查 localStorage 中是否有保存的博客帖子数据
let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// 加载博客帖子到页面
function loadBlogPosts(page = 1) {
    const blogContainer = document.getElementById('blog-posts-container');
    blogContainer.innerHTML = ''; // 清空现有内容

    // 计算显示的博客帖子范围
    const postsPerPage = 5; // 每页显示的帖子数量
    const start = (page - 1) * postsPerPage;
    const end = page * postsPerPage;
    const postsToShow = blogPosts.slice(start, end);

    // 动态生成博客帖子
    postsToShow.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p> <!-- 只显示前100个字符 -->
            <button onclick="viewFullPost(${post.id})" class="view-more-button">阅读更多</button>
        `;
        blogContainer.appendChild(postDiv);
    });

    // 更新分页
    updatePagination(page);
}

// 保存博客帖子到 localStorage
function saveBlogPosts() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// 发布新博客
document.getElementById('create-post-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const newPost = {
        id: blogPosts.length + 1,
        title,
        content
    };

    blogPosts.push(newPost);
    saveBlogPosts(); // 保存到 localStorage
    alert("博客发布成功！");
    window.location.href = 'index.html#blog'; // 发布成功后跳转回博客页面
});

// 页面加载时显示博客帖子
window.onload = () => {
    loadBlogPosts();
};
function updatePagination(currentPage) {
    const totalPages = Math.ceil(blogPosts.length / 5); // 每页5篇帖子
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// 下一页
document.getElementById('next-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    if (currentPage < Math.ceil(blogPosts.length / 5)) {
        loadBlogPosts(currentPage + 1);
    }
});

// 上一页
document.getElementById('prev-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    if (currentPage > 1) {
        loadBlogPosts(currentPage - 1);
    }
});
document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // 获取用户输入的标题和内容
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // 获取当前存储的博客帖子数据
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // 创建新博客帖子对象
    const newPost = {
        id: blogPosts.length + 1,
        title,
        content,
        timestamp: new Date().toLocaleString() // 添加时间戳
    };

    // 将新帖子添加到数组
    blogPosts.push(newPost);

    // 保存更新后的博客帖子数组到 localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    // 发布成功后显示提示并重定向到首页
    alert("博客发布成功！");
    window.location.href = 'index.html';
});
document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn'); // 清除登录状态
    window.location.href = "login.html"; // 重定向回登录页面
});
// 将发布的博客保存在 localStorage 或发送到服务器
document.getElementById('create-post-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // 创建博客对象
    const post = {
        id: Date.now(),
        title: title,
        content: content
    };

    // 保存到 localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // 重定向到主页
    window.location.href = 'index.html';
});
