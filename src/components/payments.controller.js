import Stripe from "stripe";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { plan, billing } = req.body;
        const userId = req.user.id;

        const priceMap = {
            esencial: {
                monthly: "price_123",
                yearly: "price_456"
            },
            avanzado: {
                monthly: "price_789",
                yearly: "price_101"
            },
            profesional: {
                monthly: "price_112",
                yearly: "price_131"
            }
        };

        const priceId = priceMap[plan][billing];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            customer_email: req.user.email
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando sesión" });
    }
};
