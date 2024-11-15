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
    window.location.href = 'index.html#blog';
});

let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

function loadBlogPosts(page = 1) {
    const blogContainer = document.getElementById('blog-posts-container');
    blogContainer.innerHTML = '';
    const postsPerPage = 5;
    const start = (page - 1) * postsPerPage;
    const end = page * postsPerPage;
    const postsToShow = blogPosts.slice(start, end);

    postsToShow.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p>
            <button onclick="viewFullPost(${post.id})" class="view-more-button">阅读更多</button>
        `;
        blogContainer.appendChild(postDiv);
    });

    updatePagination(page);
}

function saveBlogPosts() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

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
    saveBlogPosts();
    alert("博客发布成功！");
    window.location.href = 'index.html#blog';
});

window.onload = () => {
    loadBlogPosts();
};

function updatePagination(currentPage) {
    const totalPages = Math.ceil(blogPosts.length / 5);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

document.getElementById('next-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    if (currentPage < Math.ceil(blogPosts.length / 5)) {
        loadBlogPosts(currentPage + 1);
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    if (currentPage > 1) {
        loadBlogPosts(currentPage - 1);
    }
});

document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    const newPost = {
        id: blogPosts.length + 1,
        title,
        content,
        timestamp: new Date().toLocaleString()
    };

    blogPosts.push(newPost);

    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    alert("博客发布成功！");
    window.location.href = 'index.html';
});

document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = "login.html";
});

document.getElementById('create-post-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const post = {
        id: Date.now(),
        title: title,
        content: content
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'index.html';
});
