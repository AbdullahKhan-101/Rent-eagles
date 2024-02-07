import { useEffect, useState } from "react";
import BookingForm from "../BookingForm";
import { Button, useDisclosure } from "@nextui-org/react";
import Success from "../Modals/Success";

const {
  useStripe,
  useElements,
  PaymentElement,
} = require("@stripe/react-stripe-js");
const StripeComponent = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      elements.getElement(PaymentElement).clear();
      setPaymentSuccess(true);
    }
  };

  useEffect(() => {
    onOpen();
  }, [paymentSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="py-3">
        <Button
          className="bg-red-700 text-white max-w-[150px] w-full"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </Button>
      </div>
      {paymentSuccess && (
        <Success isOpen={isOpen} onOpenChange={onOpenChange} />
      )}

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default StripeComponent;
