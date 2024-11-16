## Project goal
Building a social networking site, similar to Twitter, where users can post short messages, like, retweet, and comment on others' posts. The focus is on providing a real-time, interactive platform for users to engage with each other by sharing content and following other users. The goal is to implement essential social media features such as user authentication, dynamic timelines, and user interactions (likes, retweets, and comments) while ensuring the site is responsive

## User Stories
* As a user, I can:
    * Sign up for an account by providing an email, username, and password.
    * Log in and log out securely with my account credentials.
    * Update my profile information, including my bio and profile picture.
    * View my own posts, retweets, and comments on my profile page.
    * Follow or unfollow other users to customize my timeline feed.
    * View a list of users I am following or who are following me on my profile.
* As a logged-in user, I can:
    * Post a new message (tweet) with a character limit (e.g., 280 characters).
    * View a list of posts (tweets) from users I follow, sorted by most recent.
    * Like a post, which updates the like count.
    * Retweet a post, which shares it on my profile and timeline.
    * Comment on any post, and view a list of comments on posts.
    * Edit or delete my own posts or comments.
    * Search for other users or posts using keywords or hashtags.
    * Follow or unfollow other users by visiting their profiles and clicking the follow/unfollow button.
    * View posts from users I follow on my timeline feed.
* As a user, I can:
    * View any user's profile to see their posts, likes, and retweets.
    * See trending hashtags or topics based on popular posts.
    * Receive notifications for new likes, retweets, or comments on my posts.

### Current progress
- Backend routes and database setup (done).
- Front end pages basic design (in progress). 
- Connecting backend and frontend (to be done). 

### Backend Setup

- Clone repo
- Install the dependencies
    npm install
- Create a .env file in the backend directory and add your MongoDB connection string
    MONGODB_URL=your_mongodb_connection_string
- Start the backend server
    npm run dev

### Frontend Setup

- Navigate to the frontend directory: 
    cd frontend\user-interface
- Install the dependencies
    npm install
- Start the frontend server
    npm run dev