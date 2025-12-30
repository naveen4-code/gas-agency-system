Gas Agency Management System
A web-based Gas Agency Management System built using HTML, CSS, JavaScript, and Firebase.
This project provides a complete solution for managing gas cylinder bookings, inventory, payments, and user administration with role-based access control.
Project Overview
The Gas Agency Management System digitalizes the traditional gas booking process by allowing users to register, book cylinders, make payments, and view notices, while administrators manage inventory, approve bookings, and monitor payments.
The system is designed with real-world workflow logic and secure Firebase authentication and authorization.
Features
User Features
User registration with name, email, and address
Secure login and logout
View and edit personal profile details
View global cylinder availability
Request gas cylinder booking
Make payment after admin approval
View booking and payment history
View notices posted by admin with date and time
Admin Features
Secure admin login
View all user booking requests
Approve booking requests
Automatic reduction of global cylinder stock on approval
Manually update total available cylinder stock
View payment status in a separate table with user details
Post notices visible to all users
Centralized inventory management
System Architecture
Frontend: HTML, CSS, JavaScript
Backend: Firebase Firestore
Authentication: Firebase Authentication
Database: Firebase Firestore
Hosting: Vercel
Database Structure (Firestore)
Users/
  userId/
    name
    email
    address
    role
bookings/
  bookingId/
    userId
    status
    requestedAt
    approvedAt
    paidAt
    amount
settings/
  global/
    cylindersAvailable
notices/
  noticeId/
    text
    createdAt
Role-Based Access Control
Users
Can read global stock
Can edit their own profile
Cannot modify stock or approve bookings
Admin
Can update global cylinder stock
Can approve bookings
Can view all user data
Can post notices
Can view payment details
Firestore Security Rules
Only authenticated users can access data
Users can read and update only their own profile
Admin has full access to inventory, bookings, and notices
Only admin can update global cylinder stock
Installation and Setup
1. Clone the Repository
git clone https://github.com/your-username/gas-agency-system.git
cd gas-agency-system
2. Firebase Configuration
Create a Firebase project
Enable Authentication (Email/Password)
Create Firestore Database
Add your Firebase configuration in js/firebase.js
3. Create Initial Stock Document
In Firestore:
Collection: settings
Document ID: global
Field:
  cylindersAvailable: 100
4. Run the Project
Open index.html in the browser or deploy using Vercel.
Deployment (Vercel)
Push the project to GitHub
Go to https://vercel.com
Import the GitHub repository
Set framework preset as Other
Deploy
Future Enhancements
Real-time updates using Firestore listeners
Invoice generation for payments
Admin analytics dashboard
Payment gateway integration
Stock refill history tracking
Project Status
Completed and fully functional
Ready for deployment, evaluation, and interviews
Author
Naveen Raj
Frontend Developer Intern
Project Lead
