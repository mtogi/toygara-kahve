# Buy Me a Coffee App

A personal "Buy Me a Coffee" application with Stripe integration that allows visitors to support you by purchasing virtual coffee.

## Features

- Display coffee purchase options (Small $3, Medium $5, Large $7)
- Process payments through Stripe Checkout
- Show success/cancel pages after payment attempt
- No authentication required
- Mobile responsive design

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Stripe Checkout JS

### Backend
- Node.js
- Express
- Stripe Node SDK
- dotenv for environment variables

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/buy-me-coffee.git
cd buy-me-coffee
```

2. Install dependencies for both client and server
```
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. Set up environment variables
   - Create a `.env` file in the server directory based on the example
   - Create a `.env` file in the client directory based on the example

4. Start the development servers
```
# Start both client and server concurrently
npm run dev
```

## Switching from Test Mode to Live Mode

The application is initially configured to use Stripe's test mode. To process real payments, follow these steps:

1. **Create a Stripe Account**
   - If you don't have one already, sign up at [stripe.com](https://stripe.com)
   - Complete the account verification process

2. **Get Your Live API Keys**
   - Log in to your Stripe Dashboard
   - Navigate to Developers > API keys
   - Note your Publishable key and Secret key (keep the Secret key secure!)

3. **Update Server Environment Variables**
   - Open `server/.env`
   - Comment out the test keys and uncomment the live keys
   - Replace the placeholder values with your actual live keys:
   ```
   # STRIPE_SECRET_KEY=sk_test_...
   # STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   ```
   - Set `NODE_ENV=production`

4. **Update Client Environment Variables**
   - Open `client/.env`
   - Comment out the test key and uncomment the live key
   - Replace the placeholder value with your actual live publishable key:
   ```
   # REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   ```

5. **Rebuild and Deploy**
   - Rebuild your client application:
   ```
   cd client
   npm run build
   cd ..
   ```
   - Restart your server or redeploy your application

6. **Test a Live Payment**
   - Make a small test purchase to ensure everything is working correctly
   - Check your Stripe Dashboard to confirm the payment was processed

## Testing Stripe Payments

### Test Mode
In test mode, you can use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Requires Authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 0002

Use any future expiration date, any 3-digit CVC, and any postal code.

### Live Mode
In live mode, real cards will be charged. Make sure your application is properly secured before accepting live payments.

## Troubleshooting

### Blank Success Page
If you encounter a blank success page after payment:
1. Check browser console for errors
2. Verify that your server is running and accessible
3. Ensure the `REACT_APP_API_URL` is correctly set in client/.env
4. Check that the session ID is being properly passed in the URL

## License

[MIT](LICENSE)

## Author

Your Name 