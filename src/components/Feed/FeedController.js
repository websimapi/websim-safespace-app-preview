import { formatDate } from '../../utils/dateFormatter.js';
import PostDetail from './PostDetail.js';

export default class FeedController {
  constructor() {
    this.posts = [];
    this.room = new WebsimSocket();
    this.setupDatabase();
  }

  setupDatabase() {
    // Subscribe to posts in the WebSim database
    this.room.collection('post').subscribe((posts) => {
      this.posts = posts;
      if (document.getElementById('post-list')) {
        document.getElementById('post-list').innerHTML = this.renderPosts();
        this.addEventListeners();
      }
    });
  }

  async createPost(content, tags = []) {
    try {
      const user = JSON.parse(localStorage.getItem('websim_user'));
      await this.room.collection('post').create({
        content: content,
        author: user?.username || this.room.party.client.username,
        timestamp: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        tags: tags,
        comments: [],
        saved: false,
        views: 1,
        interactions: []
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async updatePost(postId, data) {
    try {
      await this.room.collection('post').update(postId, data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  renderFeedView() {
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
          ${this.renderPosts()}
        </div>
      </div>
    `;
    
    this.addEventListeners();
  }

  renderPosts() {
    if (!this.posts || this.posts.length === 0) {
      return '<div class="empty-state">No posts yet. Be the first to post!</div>';
    }
    
    return this.posts.map(post => `
      <div class="post-card" data-post-id="${post.id}">
        <div class="post-header">
          <div class="author-container">
            <img src="https://images.websim.ai/avatar/${post.author}" alt="${post.author}" class="author-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${post.author}'">
            <div>
              <span class="post-author">${post.author}</span>
              <span class="post-time">${formatDate(new Date(post.timestamp))}</span>
            </div>
          </div>
          <div class="save-btn action-button ${post.saved ? 'saved' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${post.saved ? '#6366f1' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-tags">
          ${post.tags ? post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('') : ''}
        </div>
        <div class="post-actions">
          <div class="action-group">
            <div class="action-button upvote-btn" data-post-id="${post.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span>${post.upvotes || 0}</span>
            </div>
            <div class="action-button downvote-btn" data-post-id="${post.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              <span>${post.downvotes || 0}</span>
            </div>
            <div class="action-button comment-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>${post.comments ? post.comments.length : 0}</span>
            </div>
          </div>
          <div class="action-button share-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>Share</span>
          </div>
        </div>
        
        <div class="comments-section" style="display: none; margin-top: 15px; border-top: 1px solid #f0f0f0; padding-top: 15px;">
          ${post.comments && post.comments.length > 0 ? post.comments.map(comment => `
            <div class="comment" style="background-color: #f9fafb; padding: 12px; border-radius: 12px; margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-weight: 600; font-size: 14px;">${comment.author}</span>
                <span style="color: #6b7280; font-size: 12px;">${formatDate(new Date(comment.timestamp))}</span>
              </div>
              <p style="margin: 0; font-size: 14px;">${comment.content}</p>
            </div>
          `).join('') : '<p style="text-align: center; color: #6b7280;">No comments yet. Be the first to comment!</p>'}
          
          <div style="display: flex; margin-top: 10px;">
            <input type="text" class="comment-input" data-post-id="${post.id}" placeholder="Write a comment..." style="flex-grow: 1; padding: 10px; border: 1px solid #e5e7eb; border-radius: 20px; margin-right: 10px;">
            <button class="send-comment-btn" data-post-id="${post.id}" style="background-color: #6366f1; color: white; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  addEventListeners() {
    // Add event listeners to the post elements
    document.querySelectorAll('.post-card').forEach(post => {
      const postId = post.getAttribute('data-post-id');
      
      post.addEventListener('click', (e) => {
        if (e.target.closest('.action-button') || e.target.closest('.comment-input') || e.target.closest('.send-comment-btn')) {
          return; // Don't navigate if clicking on an action button or comment input
        }
        
        const selectedPost = this.posts.find(p => p.id === postId);
        if (selectedPost) {
          this.renderPostDetail(selectedPost);
        }
      });
      
      // Attach post action listeners
      this.attachPostActionListeners(post, postId);
    });
    
    // Add event listeners for create post
    this.setupCreatePostListeners();
  }

  attachPostActionListeners(postEl, postId) {
    // Upvote button
    postEl.querySelector('.upvote-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const countEl = btn.querySelector('span');
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        const updatedCount = (post.upvotes || 0) + 1;
        countEl.textContent = updatedCount;
        btn.classList.add('upvoted');
        await this.updatePost(postId, { upvotes: updatedCount });
      }
    });
    
    // Downvote button
    postEl.querySelector('.downvote-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const countEl = btn.querySelector('span');
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        const updatedCount = (post.downvotes || 0) + 1;
        countEl.textContent = updatedCount;
        btn.classList.add('downvoted');
        await this.updatePost(postId, { downvotes: updatedCount });
      }
    });
    
    // Comment button
    postEl.querySelector('.comment-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const commentsSection = postEl.querySelector('.comments-section');
      commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
    });
    
    // Save button
    postEl.querySelector('.save-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        const newSavedState = !post.saved;
        btn.classList.toggle('saved');
        const icon = btn.querySelector('svg');
        icon.setAttribute('fill', newSavedState ? '#6366f1' : 'none');
        await this.updatePost(postId, { saved: newSavedState });
      }
    });

    // Send comment button
    const sendCommentBtn = postEl.querySelector('.send-comment-btn');
    if (sendCommentBtn) {
      sendCommentBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const commentInput = postEl.querySelector('.comment-input');
        const content = commentInput.value.trim();
        
        if (content) {
          const post = this.posts.find(p => p.id === postId);
          if (post) {
            const user = JSON.parse(localStorage.getItem('websim_user'));
            const newComment = {
              id: Date.now().toString(),
              content: content,
              author: user?.username || this.room.party.client.username,
              timestamp: new Date().toISOString(),
              upvotes: 0,
              downvotes: 0
            };
            
            const comments = post.comments || [];
            await this.updatePost(postId, { 
              comments: [...comments, newComment]
            });
            
            commentInput.value = '';
          }
        }
      });
    }
  }

  setupCreatePostListeners() {
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
        
        this.createPost(content, selectedTags);
        textarea.value = '';
        
        // Reset tags
        document.querySelectorAll('.tag.selected').forEach(tag => {
          tag.classList.remove('selected');
        });
      }
    });
  }

  renderPostDetail(post) {
    const currentView = document.getElementById('current-view');
    currentView.innerHTML = `
      <div class="post-detail-container">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background-color: #f3f4f6; border-radius: 50%; margin-right: 15px; cursor: pointer;" id="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </div>
          <h2 style="margin: 0; font-size: 20px; color: #111827;">Post Details</h2>
        </div>
        
        ${PostDetail.render(post)}
      </div>
    `;
    
    // Add back button functionality
    document.getElementById('back-btn').addEventListener('click', () => {
      this.renderFeedView();
    });
  }
}