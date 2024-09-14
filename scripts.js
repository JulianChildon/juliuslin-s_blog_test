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

window.addEventListener('DOMContentLoaded', (event) => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${post.id})">编辑</button>
            <button onclick="deletePost(${post.id})">删除</button>
        `;
        blogPostsContainer.appendChild(postElement);
    });
});

function editPost(postId) {
    // 实现编辑功能
    let posts = JSON.parse(localStorage.getItem('posts'));
    let postToEdit = posts.find(post => post.id === postId);
    if (postToEdit) {
        const newTitle = prompt('输入新的标题', postToEdit.title);
        const newContent = prompt('输入新的内容', postToEdit.content);
        postToEdit.title = newTitle;
        postToEdit.content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts));
        location.reload();  // 刷新页面以显示更新后的帖子
    }
}

function deletePost(postId) {
    // 实现删除功能
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    location.reload();  // 刷新页面以删除该帖子
}
