export default class PostDetail {
  static render(post) {
    return `
      <div class="section">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <div style="margin-left: 12px;">
            <div style="font-weight: 600; color: #111827;">${post.author}</div>
            <div style="font-size: 14px; color: #6b7280;">${this.formatDate(post.timestamp)}</div>
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
      
      ${this.renderAnalytics(post)}
      ${this.renderTimeline(post)}
      ${this.renderComments(post)}
    `;
  }

  static renderAnalytics(post) {
    return `
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
    `;
  }

  static renderTimeline(post) {
    return `
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
              ${this.formatDate(new Date(interaction.timestamp))}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }

  static renderComments(post) {
    return `
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
                  <div style="font-size: 12px; color: #6b7280;">${this.formatDate(comment.timestamp)}</div>
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
    `;
  }

  static formatDate(date) {
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
}