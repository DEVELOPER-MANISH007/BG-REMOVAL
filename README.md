# Background Removal App 🖼️

A full-stack web application that removes backgrounds from images using AI. Users can sign up, purchase credits, and process images to remove backgrounds instantly.

## 🚀 Features

- **User Authentication** - Secure login/signup using Clerk
- **Credit System** - Purchase credits to process images
- **Background Removal** - AI-powered background removal using Clipdrop API
- **Payment Gateway** - Integrated Razorpay for credit purchases
- **Real-time Processing** - Instant image processing with loading states
- **Responsive Design** - Modern UI with Tailwind CSS
- **Webhook Integration** - Automatic user sync with Clerk webhooks

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Multer** - File upload handling
- **JWT** - Token-based authentication
- **Razorpay** - Payment gateway integration
- **Svix** - Webhook verification (Clerk)
- **Clipdrop API** - Background removal service

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "@clerk/clerk-react": "^5.54.0",
  "axios": "^1.13.2",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5",
  "react-toastify": "^11.0.5",
  "tailwindcss": "^4.1.17"
}
```

### Backend Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^2.0.2",
  "razorpay": "^2.9.6",
  "svix": "^1.81.0",
  "form-data": "^4.0.4"
}
```

## 🔌 APIs & Services Used

1. **Clerk** - User authentication and management
   - User signup/login
   - JWT token generation
   - Webhook events (user.created, user.updated, user.deleted)

2. **Clipdrop API** - Background removal
   - Endpoint: `https://clipdrop-api.co/remove-background/v1`
   - Requires API key
   - Returns processed image

3. **Razorpay** - Payment processing
   - Order creation
   - Payment verification
   - Transaction management

## 📁 Project Structure

```
NEW PROJECT/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── Components/     # Reusable components
│   │   │   ├── Bgslide.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Steps.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   └── Upload.jsx
│   │   ├── Context/         # React Context
│   │   │   └── AppContext.jsx
│   │   ├── Pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Result.jsx
│   │   │   └── BuyCredit.jsx
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Public assets
│   └── package.json
│
├── server/                  # Backend Node.js application
│   ├── Config/
│   │   └── db.js            # MongoDB connection
│   ├── Controllers/
│   │   ├── UserController.js
│   │   └── ImageController.js
│   ├── Middlewares/
│   │   ├── Auth.js          # JWT authentication
│   │   └── Multer.js        # File upload
│   ├── Models/
│   │   ├── UserModel.js
│   │   └── TransactionModel.js
│   ├── Routes/
│   │   ├── userRoutes.js
│   │   └── ImageRoutes.js
│   ├── server.js            # Express server
│   └── package.json
│
└── README.md
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017

# Clerk
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=USD

# Clipdrop API
CLIPDROP_API=your_clipdrop_api_key

# Server
PORT=5000
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Clerk account
- Razorpay account
- Clipdrop API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "NEW PROJECT"
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

4. **Set up Environment Variables**
   - Create `.env` file in `client/` directory
   - Create `.env` file in `server/` directory
   - Add all required environment variables (see above)

5. **Start MongoDB**
   - Make sure MongoDB is running locally or use MongoDB Atlas

### Running the Application

1. **Start Backend Server**
```bash
cd server
npm start
# or for development with nodemon
nodemon server.js
```
Server will run on `http://localhost:5000`

2. **Start Frontend Development Server**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### User Routes (`/api/user`)
- `POST /webhooks` - Clerk webhook handler
- `GET /credits` - Get user credit balance (Protected)
- `POST /payment-razorpay` - Create Razorpay order (Protected)
- `POST /verify-razorpay-payment` - Verify payment (Protected)

### Image Routes (`/api/image`)
- `POST /remove-bg` - Remove background from image (Protected)

## 💳 Payment Plans

- **Basic Plan**: $10 - 100 credits
- **Advanced Plan**: $50 - 500 credits
- **Business Plan**: $250 - 5000 credits

## 🔄 How It Works

1. **User Registration/Login**
   - User signs up/logs in using Clerk
   - Webhook creates user in database with 5 free credits

2. **Image Processing**
   - User uploads an image
   - Image is sent to Clipdrop API
   - Background is removed
   - 1 credit is deducted per image

3. **Credit Purchase**
   - User selects a plan
   - Razorpay payment gateway opens
   - After successful payment, credits are added to account

4. **Result Display**
   - Processed image is displayed
   - User can download or try another image

## 🛡️ Security Features

- JWT token-based authentication
- Webhook signature verification (Svix)
- Protected API routes
- User authorization checks
- Secure payment processing

## 📝 Database Models

### User Model
```javascript
{
  clerkId: String (unique, required),
  email: String (unique, required),
  firstName: String,
  lastName: String,
  photo: String,
  creditBalance: Number (default: 5)
}
```

### Transaction Model
```javascript
{
  clerkId: String (required),
  plan: String (required),
  amount: Number (required),
  credits: Number (required),
  payment: Boolean (default: false),
  date: Date (default: Date.now)
}
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Vercel/Railway/Heroku)
1. Set all environment variables
2. Deploy server code
3. Configure webhook URL in Clerk dashboard
4. Update frontend `VITE_BACKEND_URL` to production URL

## 📄 License

ISC

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- Clerk for authentication
- Clipdrop for background removal API
- Razorpay for payment processing
- All open-source contributors

---

**Note**: Make sure to keep your API keys and secrets secure. Never commit `.env` files to version control.

