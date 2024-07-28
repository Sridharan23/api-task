async function getPosts() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network was not ok');
        }
        let posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}
let btn = document.querySelector(".btn")

btn.addEventListener("click", () => {
    let searchInput = document.getElementById('search-input').value.toLowerCase();
    getPosts().then(posts => {
        let filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchInput));
        displayPosts(filteredPosts);
    })
})

function displayPosts(posts) {
    let postList = document.getElementById('post-list');
    postList.innerHTML = '';
    if (posts.length === 0) {
        postList.innerHTML = '<p>No posts found</p>';
        return;
    }
    posts.forEach(post => {
        let postElement = document.createElement('div');
        postElement.className = 'content';
        postElement.innerHTML = `
            <div class="title">${post.title}</div>
            <div class="body">${post.body}</div>
        `;
        postList.appendChild(postElement);
    });
}