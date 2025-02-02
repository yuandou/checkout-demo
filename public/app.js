/* global CheckoutWebComponents */
(async () => {
  // Insert your public key here
  const PUBLIC_KEY = "pk_sbox_2yd4vdadiior4e7jwcueijjddyd";

  const response = await fetch("/create-payment-sessions", { method: "POST" }); // Order
  const paymentSession = await response.json();
  // alert("paymentSession:"+paymentSession);

  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  // 设置外观
  const appearance = {
    colorAction: '#5E48FC',
    colorBackground: '#0A0A0C',
    colorBorder: '#68686C',
    colorDisabled: '#64646E',
    colorError: '#FF3300',
    colorFormBackground: '#1F1F1F',
    colorFormBorder: '#1F1F1F',
    colorInverse: '#F9F9FB',
    colorOutline: '#ADA4EC',
    colorPrimary: '#F9F9FB',
    colorSecondary: '#828388',
    colorSuccess: '#2ECC71',
    button: {
      fontFamily: '"Roboto Mono", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: '24px',
    },
    footnote: {
      fontFamily: '"PT Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: '20px',
    },
    label: {
      fontFamily: '"Roboto Mono", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: '20px',
    },
    subheading: {
      fontFamily: '"Roboto Mono", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: '24px',
    },
    borderRadius: ['8px', '8px'],
  };

  const componentOptions = {
    componentOptions: {
      card: {
        data: {
          cardholderName: 'Victor'
        },
        displayCardholderName: 'top'
      }
    }
  }

  const checkout = await CheckoutWebComponents({
    publicKey: PUBLIC_KEY,
    environment: "sandbox",
    // locale: "en-GB",
    locale: "zh-HK",
    // locale: "nl-NL",
    appearance,
    // componentOptions,
    paymentSession,
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      // console.log("Create Payment with PaymentId: ", paymentResponse.id);
      alert("Create Payment with PaymentId: "+paymentResponse.id);
    },
    onChange: (component) => {
      console.log(
        `onChange() -> isValid: "${component.isValid()}" for "${
          component.type
        }"`,
      );
    },
    onError: (component, error) => {
      console.log("onError", error, "Component", component.type);
      alert("onError: "+error);
    },
  });


  const flowComponent = checkout.create("flow");

  flowComponent.mount(document.getElementById("flow-container"));
})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

if (paymentStatus === "succeeded") {
  // alert("paymentStatus: "+paymentStatus);
  triggerToast("successToast");
}

if (paymentStatus === "failed") {
  // alert("paymentStatus: "+paymentStatus);
  triggerToast("failedToast");
}

if (paymentId) {
  // alert("paymentId: "+paymentId);
  console.log("Create Payment with PaymentId: ", paymentId);
}