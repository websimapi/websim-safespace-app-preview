document.addEventListener('DOMContentLoaded', function() {
  // Mock data for project structure visualization
  const projectStructure = [
    {
      id: '1',
      content: 'SafeSpace is organized with a clear component structure following React Native best practices.',
      author: 'Project Overview',
      timestamp: new Date(2023, 8, 22, 13, 45),
      tags: ['Structure', 'Organization'],
      saved: false
    },
    {
      id: '2',
      content: 'Components are separated by functionality:\n\n- Feed/\n  - CreatePost.tsx\n  - FeedHeader.tsx\n  - FeedScreen.tsx\n  - ImagePicker.tsx\n  - PostDetail.tsx\n  - PostList.tsx\n  - ShareModal.tsx',
      author: 'Component Structure',
      timestamp: new Date(2023, 8, 21, 9, 15),
      tags: ['Components', 'Organization'],
      saved: true
    },
    {
      id: '3',
      content: 'All components use TypeScript interfaces for props:\n\ninterface PostListProps {\n  posts: Post[];\n  onUpvote: (postId: string) => void;\n  onDownvote: (postId: string) => void;\n  onSave: (postId: string) => void;\n  onComment: (postId: string, content: string) => void;\n}',
      author: 'TypeScript Integration',
      timestamp: new Date(2023, 8, 23, 11, 20),
      tags: ['TypeScript', 'Interfaces'],
      saved: false
    }
  ];

  // Initialize the app with project structure visualization
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
          <h1 class="auth-title">SafeSpace Mobile</h1>
          <p class="auth-subtitle">React Native Project Structure</p>
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
            <span>View Project Structure</span>
          </button>
        </form>
        <div class="auth-footer">
          <p>Explore our organized React Native codebase</p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('login-button').addEventListener('click', () => {
      const button = document.getElementById('login-button');
      button.innerHTML = '<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(126.964 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
      
      setTimeout(() => renderProjectView(projectStructure), 1500);
    });
  }

  function renderProjectView(posts) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="feed-container">
        <div class="feed-header">
          <h2 class="feed-title">Project Structure</h2>
          <div class="feed-actions">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
        
        <div class="create-post-container">
          <div style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
            <h3 style="margin-bottom: 10px; color: #4b5563; font-size: 16px;">Project: SafeSpace Mobile App</h3>
            <div style="display: flex; gap: 10px;">
              <div style="background-color: #EEF2FF; color: #4F46E5; padding: 5px 10px; border-radius: 15px; font-size: 12px;">React Native</div>
              <div style="background-color: #EEF2FF; color: #4F46E5; padding: 5px 10px; border-radius: 15px; font-size: 12px;">TypeScript</div>
              <div style="background-color: #EEF2FF; color: #4F46E5; padding: 5px 10px; border-radius: 15px; font-size: 12px;">Expo</div>
            </div>
          </div>
          
          <div style="padding: 15px;">
            <div style="font-size: 14px; line-height: 1.5; font-family: monospace; color: #374151;">
              <div style="margin-bottom: 8px;">📁 src/</div>
              <div style="margin-left: 20px; margin-bottom: 8px;">📁 components/</div>
              <div style="margin-left: 40px; margin-bottom: 8px;">📁 Feed/</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 CreatePost.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 FeedHeader.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 FeedScreen.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 ImagePicker.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 PostDetail.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 PostList.tsx</div>
              <div style="margin-left: 60px; color: #6366f1;">📄 ShareModal.tsx</div>
              <div style="margin-left: 40px; margin-bottom: 8px;">📁 Auth/</div>
              <div style="margin-left: 20px; margin-bottom: 8px;">📁 navigation/</div>
              <div style="margin-left: 20px; margin-bottom: 8px;">📁 types/</div>
              <div style="margin-left: 40px; color: #6366f1;">📄 post.ts</div>
            </div>
          </div>
        </div>
        
        <div class="post-list" id="post-list">
          ${renderPosts(posts)}
        </div>
      </div>
    `;
  }

  function renderPosts(posts) {
    return posts.map(post => `
      <div class="post-card" data-post-id="${post.id}">
        <div class="post-header">
          <div class="author-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <div>
              <span class="post-author">${post.author}</span>
            </div>
          </div>
        </div>
        <div class="post-content" style="white-space: pre-line">${post.content}</div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
});