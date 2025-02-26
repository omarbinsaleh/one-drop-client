# Blood Donation Application

## Overview
The One Drop is a user-friendly platform designed to facilitate blood donation activities by connecting donors with those in need. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this application ensures a seamless and efficient donation process.

## Live Website
[Live Site URL](#) (https://one-drop.netlify.app)

## Features
1. **Role-based Access Control**: Admin, Donor, and Volunteer roles with specific permissions.
2. **Donor Registration**: Users can register with details such as name, email, blood group, and location.
3. **Authentication System**: Secure login and user management.
4. **Donation Requests**: Users can create and manage blood donation requests.
5. **Volunteer Functionality**: Volunteers can manage donation requests.
6. **Admin Dashboard**: Full control over users, donation requests, and content management.
7. **Profile Management**: Users can update their profiles.
8. **Search for Donors**: Filter donors based on blood group and location.
9. **Content Management**: Admins and volunteers can add, edit, and manage blog posts.
10. **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: TanStack Query (React Query), Context API
- **Authentication**: Firebase Authentication (email/password login)
- **Image Hosting**: ImageBB API

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/omarbinsaleh/one-drop-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd one-drop-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root directory and add the following environment variables:
   ```plaintext
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id

   VITE_API_UR=your_backend_api_base_url
   VITE_IMGBB_API_KEY=your_imagebb_api_key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Challenges Implemented
- [x] CRUD operations with notifications (SweetAlert/Toast)
- [x] Firebase authentication integration
- [x] Secure user authentication
- [x] Dynamic user role management
- [x] Role-based access control
- [x] Blog content management with Jodit React
- [x] Admin dashboard with analytics
- [x] Volunteer access with limited permissions
- [x] Mobile responsiveness for all pages

## Future Enhancements
- Implementing email verification and password reset functionality.
- Introducing social login options.
- Add real-time chat for donor-recipient communication.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any queries, reach out to:
- **Email**: omarbinsaleh44@gmail.com
- **GitHub**: [My GitHub Profile](https://github.com/omarbinsaleh)

