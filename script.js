document.addEventListener('DOMContentLoaded', function() {
  // Initialize the app
  renderLoginView();
  
  // Mock data for the app
  const mockPosts = [
    {
      id: '1',
      content: 'Just found a great resource for mental health support. It's helped me a lot and I thought I'd share it with everyone here!',
      author: 'sarah_j',
      timestamp: new Date(2023, 8, 22, 13, 45),
      upvotes: 24,
      downvotes: 2,
      tags: ['Resource', 'Support'],
      comments: [
        {
          id: 'c1',
          content: 'Thank you for sharing this! I've been looking for something like this.',
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
          content: 'I'll be there! Is it okay if I bring refreshments?',
          author: 'elena_k',
          timestamp: new Date(2023, 8, 21, 10, 30),
          upvotes: 8,
          downvotes: 0,
        },
        {
          id: 'c3',
          content: 'What time does it start?',
          author: 'david_w',
          timestamp: new Date(2023, 8, 21, 12, 45),
          upvotes: 2,
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
      <div class="auth-container">
        <div class="auth-header">
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join the SafeSpace community</p>
        </div>
        <div class="auth-form">
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
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <div class="input-group">
            <label class="input-label">Confirm Password</label>
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <button class="auth-button" id="register-button">Create Account</button>
        </div>
        <div class="auth-footer">
          <p>Already have an account? <span class="auth-link" id="login-link">Sign In</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('register-button').addEventListener('click', () => renderFeedView(mockPosts));
    document.getElementById('login-link').addEventListener('click', renderLoginView);
  }

  // Feed functions
  function renderFeedView(posts) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="feed-container">
        <div class="feed-header">
          <h2 class="feed-title">Community Feed</h2>
          <div class="feed-actions">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        </div>
        <div class="post-list" id="post-list">
          ${renderPosts(posts)}
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

  function renderPosts(posts) {
    return posts.map(post => `
      <div class="post-card" data-post-id="${post.id}">
        <div class="post-header">
          <div class="post-author">${post.author}</div>
          <div class="post-time">${formatDate(post.timestamp)}</div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions">
          <div class="action-group">
            <div class="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              ${post.upvotes}
            </div>
            <div class="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
              ${post.downvotes}
            </div>
            <div class="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              ${post.comments.length}
            </div>
          </div>
          <div class="action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${post.saved ? '#6366f1' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
      </div>
    `).join('');
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span class="stat-label">Views</span>
            <span class="stat-value">${post.views}</span>
          </div>

          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            <span class="stat-label">Upvote Rate</span>
            <span class="stat-value">
              ${((post.upvotes / (post.upvotes + post.downvotes)) * 100).toFixed(1)}%
            </span>
          </div>

          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span class="stat-label">Comments</span>
            <span class="stat-value">${post.comments.length}</span>
          </div>

          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <span class="stat-label">Engagement Rate</span>
            <span class="stat-value">
              ${(((post.upvotes + post.downvotes + post.comments.length) / post.views) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Interaction Timeline</h3>
          ${post.interactions.map((interaction, index) => `
            <div class="timeline-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${interaction.type === 'upvote' 
                  ? '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>' 
                  : interaction.type === 'downvote'
                  ? '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>'
                  : '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>'}
              </svg>
              <span class="timeline-text">
                ${interaction.type === 'comment' ? 'New comment' : `${interaction.type}`}
              </span>
              <span class="timeline-time">
                ${new Date(interaction.timestamp).toLocaleTimeString()}
              </span>
            </div>
          `).join('')}
        </div>

        <button class="auth-button" id="back-button" style="margin-bottom: 20px;">Back to Feed</button>
      </div>
    `;

    // Add event listener for back button
    document.getElementById('back-button').addEventListener('click', () => renderFeedView(mockPosts));
  }

  // Helper functions
  function formatDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
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
});

