// Основной JavaScript для социальной сети SnapShare

class SnapShare {
    constructor() {
        this.currentUser = users[0]; // Alex Chen как текущий пользователь
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadContent();
        this.initAnimations();
        this.setupInfiniteScroll();
    }

    setupEventListeners() {
        // Лайки
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-button')) {
                this.handleLike(e);
            }
            
            if (e.target.closest('.save-button')) {
                this.handleSave(e);
            }
            
            if (e.target.closest('.comment-button')) {
                this.handleComment(e);
            }
            
            if (e.target.closest('.follow-button')) {
                this.handleFollow(e);
            }
            
            if (e.target.closest('.share-button')) {
                this.handleShare(e);
            }
        });

        // Двойной клик для лайка
        document.addEventListener('dblclick', (e) => {
            if (e.target.closest('.post-image')) {
                this.handleDoubleClickLike(e);
            }
        });

        // Навигация
        this.setupNavigation();
        
        // Поиск
        this.setupSearch();
        
        // Модальные окна
        this.setupModals();
    }

    handleLike(e) {
        e.preventDefault();
        const button = e.target.closest('.like-button');
        const postId = parseInt(button.dataset.postId);
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            const liked = toggleLike(postId);
            
            // Анимация сердца
            const heartIcon = button.querySelector('.heart-icon');
            if (liked) {
                heartIcon.classList.add('liked');
                this.animateHeart(button);
            } else {
                heartIcon.classList.remove('liked');
            }
            
            // Обновить счетчик
            const likeCount = button.querySelector('.like-count');
            if (likeCount) {
                likeCount.textContent = post.likes;
            }
        }
    }

    handleDoubleClickLike(e) {
        const postElement = e.target.closest('.post-card');
        const postId = parseInt(postElement.dataset.postId);
        const post = posts.find(p => p.id === postId);
        
        if (post && !post.liked) {
            toggleLike(postId);
            
            // Показать большое сердце
            this.showBigHeart(postElement);
            
            // Обновить кнопку лайка
            const likeButton = postElement.querySelector('.like-button');
            const heartIcon = likeButton.querySelector('.heart-icon');
            const likeCount = likeButton.querySelector('.like-count');
            
            heartIcon.classList.add('liked');
            likeCount.textContent = post.likes;
        }
    }

    handleSave(e) {
        e.preventDefault();
        const button = e.target.closest('.save-button');
        const postId = parseInt(button.dataset.postId);
        const saved = toggleSave(postId);
        
        const saveIcon = button.querySelector('.save-icon');
        if (saved) {
            saveIcon.classList.add('saved');
        } else {
            saveIcon.classList.remove('saved');
        }
    }

    handleComment(e) {
        e.preventDefault();
        const button = e.target.closest('.comment-button');
        const postId = parseInt(button.dataset.postId);
        
        this.showCommentsModal(postId);
    }

    handleFollow(e) {
        e.preventDefault();
        const button = e.target.closest('.follow-button');
        const userId = parseInt(button.dataset.userId);
        
        if (button.classList.contains('following')) {
            button.classList.remove('following');
            button.textContent = 'Follow';
        } else {
            button.classList.add('following');
            button.textContent = 'Following';
        }
    }

    handleShare(e) {
        e.preventDefault();
        const button = e.target.closest('.share-button');
        
        // Показать уведомление о копировании ссылки
        this.showToast('Link copied to clipboard!');
    }

    animateHeart(button) {
        const heart = button.querySelector('.heart-icon');
        
        anime({
            targets: heart,
            scale: [1, 1.3, 1],
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
        });
    }

    showBigHeart(postElement) {
        const heart = document.createElement('div');
        heart.className = 'big-heart';
        heart.innerHTML = '❤️';
        
        const image = postElement.querySelector('.post-image');
        image.style.position = 'relative';
        image.appendChild(heart);
        
        anime({
            targets: heart,
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)',
            complete: () => {
                heart.remove();
            }
        });
    }

    showCommentsModal(postId) {
        const post = posts.find(p => p.id === postId);
        const postComments = getCommentsByPostId(postId);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal comments-modal">
                <div class="modal-header">
                    <h3>Comments</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="comments-list">
                    ${postComments.map(comment => `
                        <div class="comment">
                            <img src="${comment.avatar}" alt="${comment.username}" class="comment-avatar">
                            <div class="comment-content">
                                <div class="comment-user">${comment.username}</div>
                                <div class="comment-text">${comment.text}</div>
                                <div class="comment-time">${this.formatTime(comment.timestamp)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input">
                    <button class="post-comment-btn" data-post-id="${postId}">Post</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики для модального окна
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.post-comment-btn').addEventListener('click', () => {
            this.postComment(postId, modal);
        });
        
        modal.querySelector('.comment-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.postComment(postId, modal);
            }
        });
        
        // Закрытие по клику вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    postComment(postId, modal) {
        const input = modal.querySelector('.comment-input');
        const text = input.value.trim();
        
        if (text) {
            const newComment = addComment(postId, this.currentUser.username, this.currentUser.avatar, text);
            
            // Добавить новый комментарий в список
            const commentsList = modal.querySelector('.comments-list');
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <img src="${newComment.avatar}" alt="${newComment.username}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-user">${newComment.username}</div>
                    <div class="comment-text">${newComment.text}</div>
                    <div class="comment-time">${this.formatTime(newComment.timestamp)}</div>
                </div>
            `;
            
            commentsList.appendChild(commentElement);
            input.value = '';
            
            // Обновить счетчик комментариев
            const postElement = document.querySelector(`[data-post-id="${postId}"]`);
            const commentCount = postElement.querySelector('.comment-count');
            if (commentCount) {
                const post = posts.find(p => p.id === postId);
                commentCount.textContent = post.comments;
            }
        }
    }

    setupNavigation() {
        // Навигация между страницами
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filterContent(query);
            });
        }
    }

    filterContent(query) {
        const posts = document.querySelectorAll('.post-card');
        posts.forEach(post => {
            const caption = post.querySelector('.post-caption')?.textContent.toLowerCase() || '';
            const username = post.querySelector('.post-username')?.textContent.toLowerCase() || '';
            
            if (caption.includes(query) || username.includes(query)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    setupModals() {
        // Общая функция для закрытия модальных окон
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.remove();
            }
        });
    }

    setupInfiniteScroll() {
        let loading = false;
        
        window.addEventListener('scroll', () => {
            if (loading) return;
            
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            
            if (scrollTop + windowHeight >= docHeight - 1000) {
                loading = true;
                this.loadMorePosts().then(() => {
                    loading = false;
                });
            }
        });
    }

    async loadMorePosts() {
        // Имитация загрузки новых постов
        return new Promise((resolve) => {
            setTimeout(() => {
                // Здесь можно добавить логику загрузки новых постов
                resolve();
            }, 1000);
        });
    }

    loadContent() {
        // Загрузка контента в зависимости от страницы
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch (currentPage) {
            case 'index.html':
            case '':
                this.loadFeed();
                break;
            case 'profile.html':
                this.loadProfile();
                break;
            case 'upload.html':
                this.loadUpload();
                break;
            case 'messages.html':
                this.loadMessages();
                break;
        }
    }

    loadFeed() {
        const feedContainer = document.querySelector('.feed-container');
        if (!feedContainer) return;
        
        // Очистить контейнер
        feedContainer.innerHTML = '';
        
        // Добавить истории
        this.loadStories();
        
        // Добавить посты
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    }

    loadStories() {
        const storiesContainer = document.querySelector('.stories-container');
        if (!storiesContainer) return;
        
        storiesContainer.innerHTML = `
            <div class="stories-wrapper">
                ${stories.map(story => `
                    <div class="story-item ${story.viewed ? 'viewed' : ''}" data-story-id="${story.id}">
                        <div class="story-avatar">
                            <img src="${story.avatar}" alt="${story.username}" class="story-image">
                        </div>
                        <span class="story-username">${story.username}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-card';
        postDiv.dataset.postId = post.id;
        
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.username}" class="post-avatar">
                    <div class="post-user-info">
                        <span class="post-username">${post.username}</span>
                        <span class="post-time">${this.formatTime(post.timestamp)}</span>
                    </div>
                </div>
                <button class="post-options">⋯</button>
            </div>
            
            <div class="post-image-container">
                <img src="${post.image}" alt="Post image" class="post-image">
            </div>
            
            <div class="post-actions">
                <div class="post-actions-left">
                    <button class="action-button like-button" data-post-id="${post.id}">
                        <span class="heart-icon ${post.liked ? 'liked' : ''}">❤️</span>
                    </button>
                    <button class="action-button comment-button" data-post-id="${post.id}">
                        <span class="comment-icon">💬</span>
                    </button>
                    <button class="action-button share-button">
                        <span class="share-icon">📤</span>
                    </button>
                </div>
                <button class="action-button save-button" data-post-id="${post.id}">
                    <span class="save-icon ${post.saved ? 'saved' : ''}">🔖</span>
                </button>
            </div>
            
            <div class="post-info">
                <div class="likes-count">${post.likes} likes</div>
                <div class="post-caption">
                    <span class="post-username">${post.username}</span> ${post.caption}
                </div>
                <div class="comments-count">View all ${post.comments} comments</div>
            </div>
        `;
        
        return postDiv;
    }

    loadProfile() {
        // Загрузка профиля пользователя
        const profileContainer = document.querySelector('.profile-container');
        if (!profileContainer) return;
        
        const user = this.currentUser;
        const userPosts = getPostsByUserId(user.id);
        
        profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-info">
                    <img src="${user.avatar}" alt="${user.displayName}" class="profile-avatar">
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-number">${user.posts}</span>
                            <span class="stat-label">posts</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${user.followers}</span>
                            <span class="stat-label">followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${user.following}</span>
                            <span class="stat-label">following</span>
                        </div>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="profile-name">
                        <h2>${user.displayName}</h2>
                        ${user.verified ? '<span class="verified-badge">✓</span>' : ''}
                    </div>
                    <p class="profile-bio">${user.bio}</p>
                    <button class="edit-profile-btn">Edit Profile</button>
                </div>
            </div>
            
            <div class="profile-content">
                <div class="content-tabs">
                    <button class="tab-button active" data-tab="posts">Posts</button>
                    <button class="tab-button" data-tab="saved">Saved</button>
                    <button class="tab-button" data-tab="tagged">Tagged</button>
                </div>
                
                <div class="content-grid" id="posts-grid">
                    ${userPosts.map(post => `
                        <div class="grid-item" data-post-id="${post.id}">
                            <img src="${post.image}" alt="Post" class="grid-image">
                            <div class="grid-overlay">
                                <span class="overlay-likes">${post.likes} ❤️</span>
                                <span class="overlay-comments">${post.comments} 💬</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    loadUpload() {
        const uploadContainer = document.querySelector('.upload-container');
        if (!uploadContainer) return;
        
        uploadContainer.innerHTML = `
            <div class="upload-area">
                <div class="upload-zone" id="upload-zone">
                    <div class="upload-content">
                        <div class="upload-icon">📷</div>
                        <h3>Drag photos and videos here</h3>
                        <p>or click to select from your computer</p>
                        <input type="file" id="file-input" accept="image/*,video/*" multiple hidden>
                        <button class="select-files-btn">Select files</button>
                    </div>
                </div>
            </div>
            
            <div class="upload-form" style="display: none;">
                <div class="preview-section">
                    <div class="preview-container">
                        <img id="preview-image" class="preview-image" style="display: none;">
                        <video id="preview-video" class="preview-video" controls style="display: none;"></video>
                    </div>
                </div>
                
                <div class="form-section">
                    <div class="form-header">
                        <img src="${this.currentUser.avatar}" alt="${this.currentUser.displayName}" class="form-avatar">
                        <span class="form-username">${this.currentUser.username}</span>
                    </div>
                    
                    <div class="form-content">
                        <textarea class="caption-input" placeholder="Write a caption..."></textarea>
                        
                        <div class="form-options">
                            <div class="option-item">
                                <label>Location</label>
                                <input type="text" class="location-input" placeholder="Add location">
                            </div>
                            
                            <div class="option-item">
                                <label>Tags</label>
                                <input type="text" class="tags-input" placeholder="Add tags (separated by spaces)">
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button class="share-button">Share</button>
                            <button class="save-draft-button">Save Draft</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupUploadHandlers();
    }

    setupUploadHandlers() {
        const uploadZone = document.getElementById('upload-zone');
        const fileInput = document.getElementById('file-input');
        const selectFilesBtn = document.querySelector('.select-files-btn');
        
        selectFilesBtn.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files);
        });
        
        // Drag & Drop
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('drag-over');
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            this.handleFileSelect(e.dataTransfer.files);
        });
    }

    handleFileSelect(files) {
        const file = files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadZone = document.querySelector('.upload-area');
            const uploadForm = document.querySelector('.upload-form');
            
            uploadZone.style.display = 'none';
            uploadForm.style.display = 'flex';
            
            if (file.type.startsWith('image/')) {
                const previewImage = document.getElementById('preview-image');
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            } else if (file.type.startsWith('video/')) {
                const previewVideo = document.getElementById('preview-video');
                previewVideo.src = e.target.result;
                previewVideo.style.display = 'block';
            }
        };
        
        reader.readAsDataURL(file);
    }

    loadMessages() {
        const messagesContainer = document.querySelector('.messages-container');
        if (!messagesContainer) return;
        
        const userMessages = getMessagesForUser(this.currentUser.id);
        
        messagesContainer.innerHTML = `
            <div class="messages-sidebar">
                <div class="messages-header">
                    <h2>Messages</h2>
                    <button class="new-message-btn">+</button>
                </div>
                
                <div class="conversations-list">
                    ${users.filter(user => user.id !== this.currentUser.id).map(user => {
                        const lastMessage = userMessages.find(m => 
                            m.senderId === user.id || m.receiverId === user.id
                        );
                        
                        return `
                            <div class="conversation-item" data-user-id="${user.id}">
                                <img src="${user.avatar}" alt="${user.displayName}" class="conversation-avatar">
                                <div class="conversation-info">
                                    <div class="conversation-name">${user.displayName}</div>
                                    <div class="conversation-preview">
                                        ${lastMessage ? lastMessage.text : 'Start a conversation'}
                                    </div>
                                </div>
                                ${lastMessage && !lastMessage.read ? '<div class="unread-dot"></div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="chat-area">
                <div class="chat-placeholder">
                    <div class="placeholder-icon">💬</div>
                    <h3>Select a conversation</h3>
                    <p>Choose a friend to start chatting</p>
                </div>
            </div>
        `;
        
        this.setupMessageHandlers();
    }

    setupMessageHandlers() {
        const conversationItems = document.querySelectorAll('.conversation-item');
        
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.dataset.userId);
                const user = getUserById(userId);
                this.openChat(user);
                
                // Удалить индикатор непрочитанных сообщений
                const unreadDot = item.querySelector('.unread-dot');
                if (unreadDot) {
                    unreadDot.remove();
                }
            });
        });
    }

    openChat(user) {
        const chatArea = document.querySelector('.chat-area');
        const userMessages = getMessagesForUser(this.currentUser.id)
            .filter(m => m.senderId === user.id || m.receiverId === user.id);
        
        chatArea.innerHTML = `
            <div class="chat-header">
                <div class="chat-user">
                    <img src="${user.avatar}" alt="${user.displayName}" class="chat-avatar">
                    <div class="chat-user-info">
                        <h3>${user.displayName}</h3>
                        <span class="chat-status">Active now</span>
                    </div>
                </div>
                <div class="chat-actions">
                    <button class="chat-action-btn">📞</button>
                    <button class="chat-action-btn">📹</button>
                    <button class="chat-action-btn">ℹ️</button>
                </div>
            </div>
            
            <div class="chat-messages">
                ${userMessages.map(message => `
                    <div class="message ${message.senderId === this.currentUser.id ? 'sent' : 'received'}">
                        <div class="message-content">
                            ${message.text}
                        </div>
                        <div class="message-time">${this.formatTime(message.timestamp)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="chat-input-area">
                <input type="text" class="chat-input" placeholder="Type a message...">
                <button class="send-button">Send</button>
            </div>
        `;
        
        // Прокрутка к последнему сообщению
        const messagesContainer = chatArea.querySelector('.chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Обработчики для чата
        const input = chatArea.querySelector('.chat-input');
        const sendBtn = chatArea.querySelector('.send-button');
        
        const sendMessage = () => {
            const text = input.value.trim();
            if (text) {
                this.sendMessage(user.id, text);
                input.value = '';
            }
        };
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    sendMessage(userId, text) {
        const newMessage = {
            id: messages.length + 1,
            senderId: this.currentUser.id,
            receiverId: userId,
            text: text,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        messages.push(newMessage);
        
        // Добавить сообщение в чат
        const chatMessages = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${this.formatTime(newMessage.timestamp)}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    initAnimations() {
        // Анимации при загрузке страницы
        anime({
            targets: '.post-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
        
        // Анимация историй
        anime({
            targets: '.story-item',
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: anime.stagger(50),
            duration: 400,
            easing: 'easeOutBack'
        });
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        
        return date.toLocaleDateString();
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        anime({
            targets: toast,
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        setTimeout(() => {
            anime({
                targets: toast,
                translateY: [0, -50],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    toast.remove();
                }
            });
        }, 3000);
    }
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.snapShare = new SnapShare();
});

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SnapShare;
}