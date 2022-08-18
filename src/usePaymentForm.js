import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const amountToCharge = 40000;

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    const response = await axios.post(
      "http://localhost:5000/stripe/charge-order",
      {
        amount: amountToCharge,
        payment_method_id: paymentMethodId,
        order_id: 13,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1OTQ5ODEwMywiZXhwIjoxNjYyMDkwMTAzfQ.6to-WISapEwVtefFhmUjo6CE1qLnOyrfyFdBHGT3lCs",
        },
      }
    );
    console.log("🚀 ~ response", response);
  };

  return {
    handleSubmit,
  };
}

export default usePaymentForm;
