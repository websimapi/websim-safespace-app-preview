export default class AuthController {
  constructor(onAuthSuccess) {
    this.onAuthSuccess = onAuthSuccess;
  }

  renderLoginView() {
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
            <label class="input-label">Username</label>
            <input type="text" class="input-field" placeholder="Enter your username" autocomplete="username" required>
          </div>
          <div class="input-group" style="opacity: 0.5;">
            <label class="input-label">Email (disabled in dev mode)</label>
            <input type="email" class="input-field" placeholder="Using WebSim authentication" disabled>
          </div>
          <div class="input-group" style="opacity: 0.5;">
            <label class="input-label">Password (disabled in dev mode)</label>
            <input type="password" class="input-field" placeholder="Using WebSim authentication" disabled>
          </div>
          <button type="button" class="auth-button" id="login-button">
            <span>Sign In with WebSim</span>
          </button>
        </form>
        <div class="auth-footer">
          <p>Don't have an account? <span class="auth-link" id="register-link">Create Account</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('login-button').addEventListener('click', () => this.handleLogin());
    document.getElementById('register-link').addEventListener('click', () => this.renderRegisterView());
  }

  renderRegisterView() {
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
          <div class="input-group" style="opacity: 0.5;">
            <label class="input-label">Email (disabled in dev mode)</label>
            <input type="email" class="input-field" placeholder="Using WebSim authentication" disabled>
          </div>
          <div class="input-group" style="opacity: 0.5;">
            <label class="input-label">Password (disabled in dev mode)</label>
            <input type="password" class="input-field" placeholder="Using WebSim authentication" disabled>
          </div>
          <button type="button" class="auth-button" id="register-button">Register with WebSim</button>
        </form>
        <div class="auth-footer">
          <p>Already have an account? <span class="auth-link" id="login-link">Sign In</span></p>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('register-button').addEventListener('click', () => this.handleRegister());
    document.getElementById('login-link').addEventListener('click', () => this.renderLoginView());
  }

  async handleLogin() {
    const button = document.getElementById('login-button');
    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(126.964 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
    
    try {
      // In a real implementation, we would integrate with WebSim's auth here
      const userInput = document.querySelector('input[autocomplete="username"]').value;
      const username = userInput || 'websim_user';
      
      // Simulate WebSim auth
      const userData = { username, id: 'websim_' + Date.now() };
      localStorage.setItem('websim_user', JSON.stringify(userData));
      
      // Call the success callback with mock posts
      setTimeout(() => this.onAuthSuccess(), 1500);
    } catch (error) {
      button.innerHTML = 'Sign In with WebSim';
      console.error('Authentication error:', error);
    }
  }

  async handleRegister() {
    const button = document.getElementById('register-button');
    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(126.964 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
    
    try {
      // In a real implementation, we would integrate with WebSim's auth here
      const username = document.querySelector('input[autocomplete="username"]').value || 'new_websim_user';
      
      // Simulate WebSim auth registration
      const userData = { username, id: 'websim_' + Date.now() };
      localStorage.setItem('websim_user', JSON.stringify(userData));
      
      setTimeout(() => this.onAuthSuccess(), 1500);
    } catch (error) {
      button.innerHTML = 'Register with WebSim';
      console.error('Registration error:', error);
    }
  }
}