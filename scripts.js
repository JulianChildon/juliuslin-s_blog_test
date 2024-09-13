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

// 编辑博客帖子
function editPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    const title = prompt("编辑标题:", post.title);
    const content = prompt("编辑内容:", post.content);

    if (title && content) {
        post.title = title;
        post.content = content;
        loadBlogPosts();
    }
}

// 删除博客帖子
function deletePost(postId) {
    blogPosts = blogPosts.filter(p => p.id !== postId);
    loadBlogPosts();
}

// 页面加载时显示博客帖子
window.onload = loadBlogPosts;