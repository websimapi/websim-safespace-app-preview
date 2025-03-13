// Setting up modular structure for the web demo version of SafeSpace app
document.addEventListener('DOMContentLoaded', function() {
  // Import components from separate modules
  import('./src/components/Auth/AuthController.js').then(module => {
    const AuthController = module.default;
    import('./src/components/Feed/FeedController.js').then(feedModule => {
      const FeedController = feedModule.default;
      
      // Initialize WebSim connection
      const room = new WebsimSocket();
      
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

      // Initialize the app with Auth controller
      const authController = new AuthController(() => {
        const feedController = new FeedController();
        feedController.renderFeedView();
      });
      
      // Start with login view
      authController.renderLoginView();
      
      // View toggle functionality
      const viewToggleBtn = document.getElementById('view-toggle');
      const phoneContainer = document.getElementById('phone-container');
      const appInfo = document.querySelector('.app-info');
      
      viewToggleBtn.addEventListener('click', function() {
        phoneContainer.classList.toggle('fullscreen-mode');
        appInfo.classList.toggle('hidden');
        
        if (phoneContainer.classList.contains('fullscreen-mode')) {
          viewToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>';
          document.body.style.overflow = 'hidden';
        } else {
          viewToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
          document.body.style.overflow = '';
        }
      });
      
      // Expose controllers globally for debugging
      window.authController = authController;
    });
  });
});