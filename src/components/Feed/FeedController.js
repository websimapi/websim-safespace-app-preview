import { formatDate } from '../../utils/dateFormatter.js';
import PostDetail from './PostDetail.js';

export default class FeedController {
  constructor(posts) {
    this.posts = posts;
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
    return this.posts.map(post => `
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

  addEventListeners() {
    // Add event listeners to the post elements
    document.querySelectorAll('.post-card').forEach(post => {
      post.addEventListener('click', (e) => {
        if (e.target.closest('.action-button')) {
          return; // Don't navigate if clicking on an action button
        }
        
        const postId = post.getAttribute('data-post-id');
        const selectedPost = this.posts.find(p => p.id === postId);
        if (selectedPost) {
          this.renderPostDetail(selectedPost);
        }
      });
      
      // Post actions
      const postId = post.getAttribute('data-post-id');
      this.attachPostActionListeners(post, postId);
    });
    
    // Add event listeners for create post
    this.setupCreatePostListeners();
  }

  attachPostActionListeners(postEl, postId) {
    postEl.querySelector('.upvote-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const countEl = btn.querySelector('span');
      const count = parseInt(countEl.textContent);
      countEl.textContent = count + 1;
      btn.classList.add('upvoted');
    });
    
    postEl.querySelector('.downvote-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const countEl = btn.querySelector('span');
      const count = parseInt(countEl.textContent);
      countEl.textContent = count + 1;
      btn.classList.add('downvoted');
    });
    
    postEl.querySelector('.comment-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const commentsSection = postEl.querySelector('.comments-section');
      commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
    });
    
    postEl.querySelector('.save-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.classList.toggle('saved');
      const icon = btn.querySelector('svg');
      icon.setAttribute('fill', btn.classList.contains('saved') ? '#6366f1' : 'none');
    });
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
        this.handleCreatePost(content);
      }
    });
  }

  handleCreatePost(content) {
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
    
    this.posts.unshift(newPost);
    const postList = document.getElementById('post-list');
    postList.innerHTML = this.renderPosts();
    document.querySelector('.create-post-input').value = '';
    
    // Reset tags
    document.querySelectorAll('.tag.selected').forEach(tag => {
      tag.classList.remove('selected');
    });
    
    // Re-attach event listeners
    this.addEventListeners();
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