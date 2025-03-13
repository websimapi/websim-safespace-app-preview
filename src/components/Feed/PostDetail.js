export default class PostDetail {
  static formatDate(date) {
    // Ensure date is a Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
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

  static render(post) {
    return `
      <div class="post-detail">
        <div class="section">
          <h3 class="section-title">Post Content</h3>
          <p class="content">${post.content}</p>
        </div>

        <div class="section">
          <h3 class="section-title">Analytics</h3>
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            </svg>
            <div class="stat-label">Views</div>
            <div class="stat-value">${post.views || 1}</div>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15 12 15 18 9 18 9 15 21 9 3 6 15"></polyline>
            </svg>
            <div class="stat-label">Upvote Rate</div>
            <div class="stat-value">${post.upvotes ? ((post.upvotes || 0) + (post.downvotes || 0)) / (post.views || 1) * 100).toFixed(1) : 0}%</div>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <div class="stat-label">Comments</div>
            <div class="stat-value">${post.comments ? post.comments.length : 0}</div>
          </div>
          
          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 15"></polyline>
            </svg>
            <div class="stat-label">Engagement Rate</div>
            <div class="stat-value">${
              post.views ? (((post.upvotes || 0) + (post.downvotes || 0) + (post.comments ? post.comments.length : 0)) / post.views * 100).toFixed(1) : 0
            }%</div>
          </div>
        </div>
        
        <div class="section">
          <h3 class="section-title">Interaction Timeline</h3>
          ${post.interactions && post.interactions.length > 0 ? 
            post.interactions.map(interaction => `
              <div class="timeline-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${interaction.type === 'upvote' ? 
                    '<polyline points="18 15 12 9 6 15"></polyline>' :
                    interaction.type === 'downvote' ?
                    '<polyline points="6 9 12 15 18 9"></polyline>' :
                    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  }
                </svg>
                <div class="timeline-text">
                  ${PostDetail.formatDate(new Date(interaction.timestamp))}
                </div>
              </div>
            `).join('') :
            '<div class="empty-state">No interactions recorded.</div>'
          }
        </div>
      </div>
    `;
  }
}