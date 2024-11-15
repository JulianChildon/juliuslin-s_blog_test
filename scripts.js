document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = "login.html";
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
    let posts = JSON.parse(localStorage.getItem('posts'));
    let postToEdit = posts.find(post => post.id === postId);
    if (postToEdit) {
        const newTitle = prompt('输入新的标题', postToEdit.title);
        const newContent = prompt('输入新的内容', postToEdit.content);
        postToEdit.title = newTitle;
        postToEdit.content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts));
        location.reload();
    }
}

function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    location.reload();
}
