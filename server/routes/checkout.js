const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Log environment variables for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('Client URL:', process.env.CLIENT_URL);

/**
 * @route POST /api/checkout/create-checkout-session
 * @desc Create a Stripe checkout session
 * @access Public
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { coffeeType } = req.body;
    
    // Define coffee options with prices in cents
    const coffeeOptions = {
      kucuk: {
        name: 'Küçük Kahve',
        price: 300, // $3.00
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      orta: {
        name: 'Orta Kahve',
        price: 500, // $5.00
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      buyuk: {
        name: 'Büyük Kahve',
        price: 700, // $7.00
        image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      }
    };
    
    // Validate coffee type
    if (!coffeeOptions[coffeeType]) {
      return res.status(400).json({ error: 'Invalid coffee type selected' });
    }
    
    // Get the selected coffee option
    const selectedCoffee = coffeeOptions[coffeeType];
    
    // Determine the client URL for redirects
    const clientUrl = process.env.CLIENT_URL || 
                     (process.env.NODE_ENV === 'production' ? 
                      'https://toygara-kahve.onrender.com' : 
                      'http://localhost:3000');
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: selectedCoffee.name,
              images: [selectedCoffee.image],
              description: `Thank you for buying me a ${selectedCoffee.name.toLowerCase()}!`,
            },
            unit_amount: selectedCoffee.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cancel`,
    });
    
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
  }
});

/**
 * @route GET /api/checkout/session/:sessionId
 * @desc Get session details (for verification on success page)
 * @access Public
 */
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    res.json({
      status: session.status,
      customer_email: session.customer_details?.email || 'Anonymous',
      amount_total: session.amount_total,
      currency: session.currency
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session details' });
  }
});

module.exports = router; 