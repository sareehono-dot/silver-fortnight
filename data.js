// Мок-данные для социальной сети SnapShare

const users = [
    {
        id: 1,
        username: 'alex_photography',
        displayName: 'Alex Chen',
        avatar: '/resources/images/avatars/avatar1.png',
        bio: 'Photographer 📸 | Travel enthusiast ✈️ | Coffee lover ☕',
        followers: 1250,
        following: 890,
        posts: 234,
        verified: true
    },
    {
        id: 2,
        username: 'mike_travels',
        displayName: 'Mike Johnson',
        avatar: '/resources/images/avatars/avatar2.png',
        bio: 'Digital nomad | Exploring the world one photo at a time',
        followers: 3400,
        following: 1200,
        posts: 567,
        verified: false
    },
    {
        id: 3,
        username: 'sarah_creates',
        displayName: 'Sarah Kim',
        avatar: '/resources/images/avatars/avatar3.png',
        bio: 'Creative designer | Art lover | NYC based 🗽',
        followers: 890,
        following: 450,
        posts: 123,
        verified: true
    },
    {
        id: 4,
        username: 'jay_street',
        displayName: 'Jay Williams',
        avatar: '/resources/images/avatars/avatar4.png',
        bio: 'Street photographer | Urban explorer | Life in the city',
        followers: 2100,
        following: 780,
        posts: 445,
        verified: false
    },
    {
        id: 5,
        username: 'maria_lifestyle',
        displayName: 'Maria Rodriguez',
        avatar: '/resources/images/avatars/avatar5.png',
        bio: 'Lifestyle blogger | Fashion enthusiast | Positive vibes only ✨',
        followers: 1670,
        following: 920,
        posts: 289,
        verified: true
    }
];

const posts = [
    {
        id: 1,
        userId: 1,
        username: 'alex_photography',
        avatar: '/resources/images/avatars/avatar1.png',
        image: 'https://kimi-web-img.moonshot.cn/img/j5u8f2v8.rocketcdn.me/25a5f019143859a83b071602f4600f4ff8d0e290.jpeg',
        caption: 'Amazing architecture in the heart of the city 🏢 #architecture #city #photography',
        likes: 234,
        comments: 12,
        timestamp: '2024-01-15T10:30:00',
        liked: false,
        saved: false
    },
    {
        id: 2,
        userId: 2,
        username: 'mike_travels',
        avatar: '/resources/images/avatars/avatar2.png',
        image: 'https://kimi-web-img.moonshot.cn/img/store.bandccamera.com/3891025da4ae69856929701bf26087afa0b266f8.jpg',
        caption: 'Golden hour magic ✨ Nothing beats this view! #sunset #travel #nature',
        likes: 456,
        comments: 23,
        timestamp: '2024-01-15T08:15:00',
        liked: true,
        saved: false
    },
    {
        id: 3,
        userId: 3,
        username: 'sarah_creates',
        avatar: '/resources/images/avatars/avatar3.png',
        image: 'https://kimi-web-img.moonshot.cn/img/j5u8f2v8.rocketcdn.me/3720765067ee2c812802d3c0f7a40876bb0283e3.jpeg',
        caption: 'Modern architecture at its finest 🏛️ #design #architecture #minimalism',
        likes: 189,
        comments: 8,
        timestamp: '2024-01-14T16:45:00',
        liked: false,
        saved: true
    },
    {
        id: 4,
        userId: 4,
        username: 'jay_street',
        avatar: '/resources/images/avatars/avatar4.png',
        image: 'https://kimi-web-img.moonshot.cn/img/momentsmirror.com/91580344467a3f0076aaa2dea2b005ad55a8cb7f.jpg',
        caption: 'Life is beautiful, capture every moment 📸 #lifestyle #moments #photography',
        likes: 312,
        comments: 15,
        timestamp: '2024-01-14T14:20:00',
        liked: true,
        saved: false
    },
    {
        id: 5,
        userId: 5,
        username: 'maria_lifestyle',
        avatar: '/resources/images/avatars/avatar5.png',
        image: 'https://kimi-web-img.moonshot.cn/img/img.andrewprokos.com/19a99215642551af3d3ed32cc1a8f04eacdbdeae.jpg',
        caption: 'Stunning architecture that takes your breath away 🌟 #architecture #design',
        likes: 278,
        comments: 19,
        timestamp: '2024-01-13T12:10:00',
        liked: false,
        saved: true
    },
    {
        id: 6,
        userId: 1,
        username: 'alex_photography',
        avatar: '/resources/images/avatars/avatar1.png',
        image: 'https://kimi-web-img.moonshot.cn/img/illustrarch.com/c9ba1b7e62154a95d4326fbff1be49914bbdef2b.jpg',
        caption: 'When design meets functionality 🏢 #modern #architecture #innovation',
        likes: 167,
        comments: 11,
        timestamp: '2024-01-13T09:30:00',
        liked: true,
        saved: false
    },
    {
        id: 7,
        userId: 2,
        username: 'mike_travels',
        avatar: '/resources/images/avatars/avatar2.png',
        image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/34ffa146d9b52e4b095950297de9982c15509536.jpg',
        caption: 'Street life captured in a moment 🚶‍♂️ #streetphotography #urban #life',
        likes: 398,
        comments: 28,
        timestamp: '2024-01-12T18:45:00',
        liked: false,
        saved: false
    },
    {
        id: 8,
        userId: 3,
        username: 'sarah_creates',
        avatar: '/resources/images/avatars/avatar3.png',
        image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/f0a31326138c62463d15eb39bb60eb1acfc1750a.jpg',
        caption: 'City vibes and urban dreams 🏙️ #citylife #urban #creative',
        likes: 223,
        comments: 14,
        timestamp: '2024-01-12T15:20:00',
        liked: true,
        saved: true
    },
    {
        id: 9,
        userId: 4,
        username: 'jay_street',
        avatar: '/resources/images/avatars/avatar4.png',
        image: 'https://kimi-web-img.moonshot.cn/img/custom-images.strikinglycdn.com/bb6fb99e40e8eeb393cc8e49cc72b66b40d554ed.png',
        caption: 'Urban exploration at its finest 🌆 #urban #exploration #photography',
        likes: 445,
        comments: 31,
        timestamp: '2024-01-11T11:15:00',
        liked: false,
        saved: false
    },
    {
        id: 10,
        userId: 5,
        username: 'maria_lifestyle',
        avatar: '/resources/images/avatars/avatar5.png',
        image: 'https://kimi-web-img.moonshot.cn/img/cdn.hswstatic.com/d4b07a19a0e6846e664b08bf3305481335a26305.jpg',
        caption: 'My furry friend is the best model 🐾 #pets #animals #cute',
        likes: 567,
        comments: 42,
        timestamp: '2024-01-10T16:30:00',
        liked: true,
        saved: false
    }
];

const stories = [
    {
        id: 1,
        userId: 1,
        username: 'alex_photography',
        avatar: '/resources/images/avatars/avatar1.png',
        image: 'https://kimi-web-img.moonshot.cn/img/blog.architizer.com/f48b74feb3af825ae0a4a53d4897a3fc25565bc9.jpg',
        viewed: false
    },
    {
        id: 2,
        userId: 2,
        username: 'mike_travels',
        avatar: '/resources/images/avatars/avatar2.png',
        image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/66974488ff5b6bbf27c43a48372ec614d170df55.jpg',
        viewed: false
    },
    {
        id: 3,
        userId: 3,
        username: 'sarah_creates',
        avatar: '/resources/images/avatars/avatar3.png',
        image: 'https://kimi-web-img.moonshot.cn/img/images.unsplash.com/e2db30c7f4db41f69a496a9f2d365b6a47a3f9ee',
        viewed: true
    },
    {
        id: 4,
        userId: 4,
        username: 'jay_street',
        avatar: '/resources/images/avatars/avatar4.png',
        image: 'https://kimi-web-img.moonshot.cn/img/i0.wp.com/83c30fc55d7a2dbb5695f6fea8de8b8f6dd37faf.jpg',
        viewed: false
    },
    {
        id: 5,
        userId: 5,
        username: 'maria_lifestyle',
        avatar: '/resources/images/avatars/avatar5.png',
        image: 'https://kimi-web-img.moonshot.cn/img/i.pinimg.com/b13ad7c3d62c045edab55b9cdce063719b8a63e0.jpg',
        viewed: false
    }
];

const comments = [
    {
        id: 1,
        postId: 1,
        username: 'mike_travels',
        avatar: '/resources/images/avatars/avatar2.png',
        text: 'Amazing shot! The composition is perfect 👏',
        timestamp: '2024-01-15T10:35:00'
    },
    {
        id: 2,
        postId: 1,
        username: 'sarah_creates',
        avatar: '/resources/images/avatars/avatar3.png',
        text: 'Love the lighting in this photo! ✨',
        timestamp: '2024-01-15T10:40:00'
    },
    {
        id: 3,
        postId: 2,
        username: 'maria_lifestyle',
        avatar: '/resources/images/avatars/avatar5.png',
        text: 'This is absolutely breathtaking! 😍',
        timestamp: '2024-01-15T08:20:00'
    }
];

const messages = [
    {
        id: 1,
        senderId: 2,
        receiverId: 1,
        text: 'Hey! Love your recent photos 📸',
        timestamp: '2024-01-15T09:30:00',
        read: false
    },
    {
        id: 2,
        senderId: 3,
        receiverId: 1,
        text: 'Want to collaborate on a project?',
        timestamp: '2024-01-14T14:30:00',
        read: true
    },
    {
        id: 3,
        senderId: 4,
        receiverId: 1,
        text: 'Great work on that architecture shot!',
        timestamp: '2024-01-13T11:20:00',
        read: true
    }
];

// Функции для работы с данными
function getUserById(id) {
    return users.find(user => user.id === id);
}

function getPostsByUserId(userId) {
    return posts.filter(post => post.userId === userId);
}

function getCommentsByPostId(postId) {
    return comments.filter(comment => comment.postId === postId);
}

function getMessagesForUser(userId) {
    return messages.filter(message => 
        message.senderId === userId || message.receiverId === userId
    );
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        return post.liked;
    }
    return false;
}

function toggleSave(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.saved = !post.saved;
        return post.saved;
    }
    return false;
}

function addComment(postId, username, avatar, text) {
    const newComment = {
        id: comments.length + 1,
        postId: postId,
        username: username,
        avatar: avatar,
        text: text,
        timestamp: new Date().toISOString()
    };
    comments.push(newComment);
    return newComment;
}

// Экспорт данных
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        users,
        posts,
        stories,
        comments,
        messages,
        getUserById,
        getPostsByUserId,
        getCommentsByPostId,
        getMessagesForUser,
        toggleLike,
        toggleSave,
        addComment
    };
}