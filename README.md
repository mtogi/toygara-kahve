# Buy Me a Coffee App

A simple web application that allows friends and family to support your work by buying you a virtual coffee. This project integrates with Stripe for payment processing.

## Features

- Clean, responsive UI built with React and Tailwind CSS
- Three coffee purchase options (Small $3, Medium $5, Large $7)
- Secure payment processing with Stripe Checkout
- Success and cancel pages for payment feedback
- Mobile-friendly design

## Project Structure

```
buy-me-coffee/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # UI components
│   │   ├── pages/          # Main pages
│   │   ├── assets/         # Images and icons
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── routes/             # API routes
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
├── package.json            # Root package.json for running both client and server
└── README.md               # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stripe account (for API keys)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd buy-me-coffee
```

### 2. Install dependencies (Option 1 - All at once)

You can install all dependencies at once using the root package.json:

```bash
npm run install-all
```

### 3. Install dependencies (Option 2 - Separately)

Alternatively, you can install dependencies for each part separately:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Set up environment variables

Create .env files for both client and server:

```bash
# Server .env file
cd server
cp .env.example .env

# Client .env file
cd ../client
cp .env.example .env
```

Edit both .env files to add your Stripe API keys:
- In server/.env, add your Stripe secret key
- In client/.env, add your Stripe publishable key

### 5. Start the development servers

#### Option 1: Start both servers at once

From the root directory:

```bash
npm start
```

#### Option 2: Start servers separately

In one terminal, start the backend server:

```bash
cd server
npm run dev
```

In another terminal, start the frontend development server:

```bash
cd client
npm start
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Testing Payments

Since this is using Stripe in test mode, you can use the following test card numbers:

- Successful payment: 4242 4242 4242 4242
- Failed payment: 4000 0000 0000 9995

Use any future expiration date, any 3-digit CVC, and any postal code.

## Deployment

For production deployment:

1. Set up environment variables for production
2. Build the React frontend: `npm run build` (from root directory)
3. Deploy the backend to a Node.js hosting service
4. Deploy the frontend build to a static hosting service

## License

This project is for personal learning purposes.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Express](https://expressjs.com/) 