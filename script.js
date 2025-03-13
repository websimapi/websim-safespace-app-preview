document.addEventListener('DOMContentLoaded', function() {
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
    },
    {
      id: '3',
      content: 'I\'ve been journaling daily for the past month and it\'s had an amazing impact on my mental health. Would anyone be interested in a virtual journaling workshop?',
      author: 'taylor_r',
      timestamp: new Date(2023, 8, 23, 11, 20),
      upvotes: 37,
      downvotes: 0,
      tags: ['Wellness', 'Support'],
      comments: [
        {
          id: 'c3',
          content: 'I would definitely join! Been wanting to start journaling for a while.',
          author: 'sam_d',
          timestamp: new Date(2023, 8, 23, 11, 45),
          upvotes: 3,
          downvotes: 0,
        }
      ],
      saved: false,
      views: 124,
      interactions: [
        { type: 'upvote', timestamp: Date.now() - 2600000 },
        { type: 'comment', timestamp: Date.now() - 2400000 },
        { type: 'upvote', timestamp: Date.now() - 1200000 },
      ]
    }
  ];

  // Initialize the app with sample data
  renderLoginView();

  // Auth functions
  function renderLoginView() {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="auth-container">
        <div class="auth-header">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#6366F1" opacity="0.1"/>
            <path d="M40 26.5C40 33.4036 34.4036 39 27.5 39C20.5964 39 15 33.4036 15 26.5C15 19.5964 20.5964 14 27.5 14" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
            <path d="M32 14H46" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
            <path d="M39 7V21" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue to SafeSpace</p>
        </div>
        <form class="auth-form">
          <div class="input-group">
            <label class="input-label">Email</label>
            <input type="email" class="input-field" placeholder="youremail@example.com" autocomplete="email" required>
          </div>
          <div class="input-group">
            <label class="input-label">Password</label>
            <input type="password" class="input-field" placeholder="•••••••" autocomplete="current-password" required>
          </div>
          <button type="button" class="auth-button" id="login-button">
            <span>Sign In</span>
          </button>
        </form>
        <div class="auth-footer">
          <p>Don't have an account? <span class="auth-link" id="register-link">Create Account</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('login-button').addEventListener('click', () => {
      const button = document.getElementById('login-button');
      button.innerHTML = '<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(126.964 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
      
      setTimeout(() => renderFeedView(mockPosts), 1500);
    });
    document.getElementById('register-link').addEventListener('click', renderRegisterView);
  }

  function renderRegisterView() {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="auth-container">
        <div class="auth-header">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#6366F1" opacity="0.1"/>
            <path d="M40 26.5C40 33.4036 34.4036 39 27.5 39C20.5964 39 15 33.4036 15 26.5C15 19.5964 20.5964 14 27.5 14" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
            <path d="M32 14H46" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
            <path d="M39 7V21" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join the SafeSpace community</p>
        </div>
        <form class="auth-form">
          <div class="input-group">
            <label class="input-label">Username</label>
            <input type="text" class="input-field" placeholder="Choose a username" autocomplete="username" required>
          </div>
          <div class="input-group">
            <label class="input-label">Email</label>
            <input type="email" class="input-field" placeholder="youremail@example.com" autocomplete="email" required>
          </div>
          <div class="input-group">
            <label class="input-label">Password</label>
            <input type="password" class="input-field" placeholder="••••••" autocomplete="new-password" required minlength="8">
          </div>
          <button type="button" class="auth-button" id="register-button">Create Account</button>
        </form>
        <div class="auth-footer">
          <p>Already have an account? <span class="auth-link" id="login-link">Sign In</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('register-button').addEventListener('click', () => {
      const button = document.getElementById('register-button');
      button.innerHTML = '<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(126.964 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
      
      setTimeout(() => renderFeedView(mockPosts), 1500);
    });
    document.getElementById('login-link').addEventListener('click', renderLoginView);
  }

  function renderFeedView(posts) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="feed-container">
        <div class="feed-header">
          <h2 class="feed-title">Community Feed</h2>
          <div class="feed-actions">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
        
        <div class="create-post-container">
          <textarea class="create-post-input" placeholder="What's on your mind?" rows="3"></textarea>
          <div class="tag-container">
            <div class="tag">Community</div>
            <div class="tag">Support</div>
            <div class="tag">Events</div>
            <div class="tag">Question</div>
          </div>
          <div class="create-post-actions">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <button class="auth-button" style="margin-top: 0; padding: 10px 20px;">Post</button>
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
        if (e.target.closest('.action-button')) {
          return; // Don't navigate if clicking on an action button
        }
        
        const postId = post.getAttribute('data-post-id');
        const selectedPost = posts.find(p => p.id === postId);
        if (selectedPost) {
          renderPostDetail(selectedPost);
        }
      });
      
      // Add event listeners for post actions
      const postId = post.getAttribute('data-post-id');
      
      post.querySelector('.upvote-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        const countEl = btn.querySelector('span');
        const count = parseInt(countEl.textContent);
        countEl.textContent = count + 1;
        btn.classList.add('upvoted');
      });
      
      post.querySelector('.downvote-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        const countEl = btn.querySelector('span');
        const count = parseInt(countEl.textContent);
        countEl.textContent = count + 1;
        btn.classList.add('downvoted');
      });
      
      post.querySelector('.comment-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const commentsSection = post.querySelector('.comments-section');
        if (commentsSection.style.display === 'block') {
          commentsSection.style.display = 'none';
        } else {
          commentsSection.style.display = 'block';
        }
      });
      
      post.querySelector('.save-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.classList.toggle('saved');
        const icon = btn.querySelector('svg');
        if (btn.classList.contains('saved')) {
          icon.setAttribute('fill', '#6366f1');
        } else {
          icon.setAttribute('fill', 'none');
        }
      });
    });
    
    // Add event listeners for create post
    const tagElements = document.querySelectorAll('.tag');
    tagElements.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
      });
    });
    
    document.querySelector('.create-post-container button').addEventListener('click', () => {
      const textarea = document.querySelector('.create-post-input');
      const content = textarea.value.trim();
      
      if (content) {
        const selectedTags = [];
        document.querySelectorAll('.tag.selected').forEach(tag => {
          selectedTags.push(tag.textContent);
        });
        
        const newPost = {
          id: String(Date.now()),
          content: content,
          author: 'you',
          timestamp: new Date(),
          upvotes: 0,
          downvotes: 0,
          tags: selectedTags.length > 0 ? selectedTags : [],
          comments: [],
          saved: false,
          views: 1,
          interactions: []
        };
        
        mockPosts.unshift(newPost);
        const postList = document.getElementById('post-list');
        postList.innerHTML = renderPosts(mockPosts);
        textarea.value = '';
        
        // Re-add event listeners
        document.querySelectorAll('.tag.selected').forEach(tag => {
          tag.classList.remove('selected');
        });
      }
    });
  }

  function renderPosts(posts) {
    return posts.map(post => `
      <div class="post-card" data-post-id="${post.id}">
        <div class="post-header">
          <div class="author-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <div>
              <span class="post-author">${post.author}</span>
              <span class="post-time">${formatDate(post.timestamp)}</span>
            </div>
          </div>
          <div class="save-btn action-button ${post.saved ? 'saved' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${post.saved ? '#6366f1' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions">
          <div class="action-group">
            <div class="action-button upvote-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span>${post.upvotes}</span>
            </div>
            <div class="action-button downvote-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              <span>${post.downvotes}</span>
            </div>
            <div class="action-button comment-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>${post.comments.length}</span>
            </div>
          </div>
          <div class="action-button share-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>Share</span>
          </div>
        </div>
        
        <div class="comments-section" style="display: none; margin-top: 15px; border-top: 1px solid #f0f0f0; padding-top: 15px;">
          ${post.comments.map(comment => `
            <div class="comment" style="background-color: #f9fafb; padding: 12px; border-radius: 12px; margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-weight: 600; font-size: 14px;">${comment.author}</span>
                <span style="color: #6b7280; font-size: 12px;">${formatDate(comment.timestamp)}</span>
              </div>
              <p style="margin: 0; font-size: 14px;">${comment.content}</p>
            </div>
          `).join('')}
          
          <div style="display: flex; margin-top: 10px;">
            <input type="text" placeholder="Write a comment..." style="flex-grow: 1; padding: 10px; border: 1px solid #e5e7eb; border-radius: 20px; margin-right: 10px;">
            <button style="background-color: #6366f1; color: white; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

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
    
    return date.toLocaleDateString();
  }

  function renderPostDetail(post) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="post-detail-container">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background-color: #f3f4f6; border-radius: 50%; margin-right: 15px; cursor: pointer;" id="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </div>
          <h2 style="margin: 0; font-size: 20px; color: #111827;">Post Details</h2>
        </div>
        
        <div class="section">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <div style="margin-left: 12px;">
              <div style="font-weight: 600; color: #111827;">${post.author}</div>
              <div style="font-size: 14px; color: #6b7280;">${formatDate(post.timestamp)}</div>
            </div>
          </div>
          <h3 class="section-title" style="margin-top: 0; display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Post Content
          </h3>
          <p class="content">${post.content}</p>
          <div class="post-tags" style="margin-top: 15px;">
            ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
          </div>
          
          <div style="display: flex; align-items: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #f3f4f6;">
            <div class="action-button" style="margin-right: 20px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span style="margin-left: 5px; color: #6366f1; font-weight: 600;">${post.upvotes}</span>
            </div>
            <div class="action-button" style="margin-right: 20px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              <span style="margin-left: 5px;">${post.downvotes}</span>
            </div>
            <div class="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span style="margin-left: 5px;">${post.comments.length}</span>
            </div>
            <div style="margin-left: auto;">
              <button class="auth-button" style="padding: 8px 16px; margin: 0; font-size: 14px;">Reply</button>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h3 class="section-title" style="display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
            Analytics
          </h3>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span class="stat-label">Views</span>
            <span class="stat-value">${post.views}</span>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span class="stat-label">Upvote Rate</span>
            <span class="stat-value">${Math.round((post.upvotes / (post.upvotes + post.downvotes || 1)) * 100)}%</span>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span class="stat-label">Comments</span>
            <span class="stat-value">${post.comments.length}</span>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3-9H2"></path></svg>
            <span class="stat-label">Engagement Rate</span>
            <span class="stat-value">${Math.round(((post.upvotes + post.downvotes + post.comments.length) / post.views) * 100)}%</span>
          </div>
        </div>
        
        <div class="section">
          <h3 class="section-title" style="display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Interaction Timeline
          </h3>
          ${post.interactions.map((interaction, index) => `
            <div class="timeline-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${interaction.type === 'upvote' 
                  ? '<path d="M12 19V5M5 12l7-7 7 7"/>' 
                  : interaction.type === 'downvote'
                    ? '<path d="M12 5v14M5 12l7 7 7-7"/>'
                    : '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'}
              </svg>
              <span class="timeline-text">
                ${interaction.type === 'comment' ? 'New comment' : `New ${interaction.type}`}
              </span>
              <span class="timeline-time">
                ${formatDate(new Date(interaction.timestamp))}
              </span>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h3 class="section-title" style="display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Comments (${post.comments.length})
          </h3>
          ${post.comments.length > 0 
            ? post.comments.map(comment => `
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <div style="margin-left: 10px;">
                    <div style="font-weight: 600;">${comment.author}</div>
                    <div style="font-size: 12px; color: #6b7280;">${formatDate(comment.timestamp)}</div>
                  </div>
                </div>
                <p style="margin: 0; color: #374151;">${comment.content}</p>
                <div style="display: flex; margin-top: 10px; font-size: 12px; color: #6b7280;">
                  <div style="margin-right: 15px; display: flex; align-items: center; cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    <span style="margin-left: 4px;">${comment.upvotes}</span>
                  </div>
                  <div style="display: flex; align-items: center; cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    <span style="margin-left: 4px;">${comment.downvotes}</span>
                  </div>
                  <div style="margin-left: auto; cursor: pointer;">Reply</div>
                </div>
              </div>
            `).join('')
            : '<p style="color: #6b7280; text-align: center; padding: 20px;">No comments yet. Be the first to comment!</p>'
          }
          
          <div style="display: flex; margin-top: 20px;">
            <input type="text" placeholder="Write a comment..." style="flex-grow: 1; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 24px; margin-right: 10px; font-size: 14px;">
            <button class="auth-button" style="margin: 0; padding: 12px 20px; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Send
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add back button functionality
    document.getElementById('back-btn').addEventListener('click', () => {
      renderFeedView(mockPosts);
    });
  }
});