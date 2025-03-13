The updated code for script.js is:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the app
  renderLoginView();
  
  // Mock data for the app
  const mockPosts = [
    {
      id: '1',
      content: 'Just found a great resource for mental health support. It\'s helped me a lot and I thought I\'d share it with everyone here!',
      author: 'sarah_j',
      timestamp: new Date(2023, 8, 22, 13, 45),
      upvotes: 24,
      downvotes: 2,
      tags: ['Resource', 'Support'],
      comments: [
        {
          id: 'c1',
          content: 'Thank you for sharing this! I\'ve been looking for something like this.',
          author: 'mark_t',
          timestamp: new Date(2023, 8, 22, 14, 30),
          upvotes: 5,
          downvotes: 0,
        }
      ],
      saved: false,
      views: 156,
      interactions: [
        { type: 'upvote', timestamp: Date.now() - 3600000 },
        { type: 'comment', timestamp: Date.now() - 2400000 },
        { type: 'upvote', timestamp: Date.now() - 1800000 },
        { type: 'upvote', timestamp: Date.now() - 900000 },
      ]
    },
    {
      id: '2',
      content: 'There\'s a community meetup this weekend at Central Park. Everyone is welcome, we\'ll be discussing strategies for creating safe spaces in our neighborhood.',
      author: 'javier_m',
      timestamp: new Date(2023, 8, 21, 9, 15),
      upvotes: 45,
      downvotes: 1,
      tags: ['Community', 'Events'],
      comments: [
        {
          id: 'c2',
          content: 'I\'ll be there! Is it okay if I bring refreshments?',
          author: 'elena_k',
          timestamp: new Date(2023, 8, 21, 10, 30),
          upvotes: 8,
          downvotes: 0,
        }
      ],
      saved: true,
      views: 210,
      interactions: [
        { type: 'upvote', timestamp: Date.now() - 5600000 },
        { type: 'comment', timestamp: Date.now() - 4900000 },
        { type: 'upvote', timestamp: Date.now() - 3200000 },
        { type: 'comment', timestamp: Date.now() - 2100000 },
      ]
    }
  ];

  // Auth functions
  function renderLoginView() {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="auth-container">
        <div class="auth-header">
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue to SafeSpace</p>
        </div>
        <div class="auth-form">
          <div class="input-group">
            <label class="input-label">Email</label>
            <input type="email" class="input-field" placeholder="youremail@example.com">
          </div>
          <div class="input-group">
            <label class="input-label">Password</label>
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <button class="auth-button" id="login-button">Sign In</button>
        </div>
        <div class="auth-footer">
          <p>Don't have an account? <span class="auth-link" id="register-link">Create Account</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('login-button').addEventListener('click', () => renderFeedView(mockPosts));
    document.getElementById('register-link').addEventListener('click', renderRegisterView);
  }

  function renderRegisterView() {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="register-container">
        <div class="register-header">
          <h1 class="register-title">Create Account</h1>
          <p class="register-subtitle">Join the SafeSpace community</p>
        </div>
        <div class="register-form">
          <div class="input-group">
            <label class="input-label">Username</label>
            <input type="text" class="input-field" placeholder="Choose a username">
          </div>
          <div class="input-group">
            <label class="input-label">Email</label>
            <input type="email" class="input-field" placeholder="youremail@example.com">
          </div>
          <div class="input-group">
            <label class="input-label">Password</label>
            <input type="password" class="input-field" placeholder="•••••••">
          </div>
          <button class="register-button" id="register-button">Create Account</button>
        </div>
        <div class="register-footer">
          <p>Already have an account? <span class="register-link" id="login-link">Sign In</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('register-button').addEventListener('click', () => renderFeedView(mockPosts));
    document.getElementById('login-link').addEventListener('click', renderLoginView);
  }

  function renderFeedView(posts) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="feed-container">
        <div class="feed-header">
          <h2 class="feed-title">Community Feed</h2>
          <div class="feed-actions">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11-8 11-8 11-8 8-11 8-11z"></path></svg>
          </div>
          <div class="post-list" id="post-list">
            ${renderPosts(posts)}
          </div>
        </div>
      </div>
    `;

    // Add event listeners to the post elements
    document.querySelectorAll('.post-card').forEach(post => {
      post.addEventListener('click', (e) => {
        const postId = post.getAttribute('data-post-id');
        const selectedPost = posts.find(p => p.id === postId);
        if (selectedPost) {
          renderPostDetail(selectedPost);
        }
      });
    });
  }

  function renderPostDetail(post) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="post-detail-container">
        <div class="section">
          <h3 class="section-title">Post Content</h3>
          <p class="content">${post.content}</p>
          <div class="post-tags" style="margin-top: 15px;">
            ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="section">
          <h3 class="section-title">Analytics</h3>
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 0-2-2v-7a2 2 0 0 0-2-2h3"></path></svg>
          </div>
          <div class="stat">
            <span class="stat-label">Views</span>
            <span class="stat-value">${post.views}</span>
          </div>
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0-2-2v-7a2 2 0 0 0-2-2h3"></path></svg>
          </div>
          <div class="post-comments" style="margin-top: 20px;">
            <span class="stat-label">Comments</span>
            <span class="stat-value">${post.comments.length}</span>
          </div>
          <div class="section">
            <h3 class="section-title">Interaction Timeline</h3>
            ${renderPosts(posts).map((interaction, index) => `
              <div class="timeline-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0-2-2v-7a2 2 0 0 0-2-2h3"></path></svg>
            `).join('}`);
            const diffInSeconds = Math.floor((now - interaction.timestamp) / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
              return `${diffInMinutes}s ago`;
            }
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
              return `${diffInHours}h ago`;
            }
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
              return `${diffInDays}d ago`;
            }
            const now = new Date();
            const diffInSeconds = Math.floor((now - interaction.timestamp) / 1000);
            if (diffInSeconds < 60) {
              return `${diffInSeconds}s ago`;
            }
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
              return `${diffInMinutes}m ago`;
            }
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
              return `${diffInHours}h ago`;
            }
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
              return `${diffInDays}d ago`;
            }
            const now = new Date();
            const diffInSeconds = Math.floor((now - interaction.timestamp) / 1000);
            if (diffInSeconds < 60) {
              return `${diffInSeconds}s ago`;
            }
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
              return `${diffInMinutes}m ago`;
            }
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
              return `${diffInHours}h ago`;
            }
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
              return `${diffInDays}d ago`;
            }
            const now = new Date();
            const diffInSeconds = Math.floor((now - interaction.timestamp) / 1000);
            if (diffInSeconds < 60) {
              return `${diffInSeconds}s ago`;
            }
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
              return `${diffInMinutes}m ago`;
            }
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
              return `${diffInHours}h ago`;
            }
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
              return `${diffInDays}d ago`;
            }
            return `${date.toLocaleDateString()}`;
          }
        `).join('')

        // ... existing code ...

        const now = new Date();

        const diffInSeconds = Math.floor((now - interaction.timestamp) / 1000);

        if (diffInSeconds < 60) {
          return `${diffInSeconds}s ago`;
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60);

        if (diffInMinutes < 60) {
          return `${diffInMinutes}m ago`;
        }
        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {
          return `${diffInHours}h ago`;
        }
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays < 7) {
          return `${diffInDays}d ago`;
        }
        return `${date.toLocaleDateString()}`;
      }
    `).forEach(post => {
      post.addEventListener('click', (e) => {
        const postId = post.getAttribute('data-post-id');
        const selectedPost = posts.find(p => p.id === postId);
        if (selectedPost) {
          renderPostDetail(selectedPost);
        }
      });
    });
  }