const initialState = { payments: [], loading: false, error: null };

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PAYMENTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PAYMENTS_SUCCESS":
      return { ...state, loading: false, payments: action.payload };
    case "FETCH_PAYMENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_PAYMENT_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PAYMENT_SUCCESS":
      return { ...state, loading: false, selectedPayment: action.payload };
    case "FETCH_PAYMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PAYMENT_REQUEST":
      return { ...state, loading: true, };
    case "ADD_PAYMENT_SUCCESS": 
      return { ...state, loading: false, payments: [ action.payload ,...state.payments], };
    case "ADD_PAYMENT_FAILURE":
      return { ...state, loading: false, error: action.payload, };
    case "EDIT_PAYMENT_REQUEST":
      return { ...state, loading: true };
    case "EDIT_PAYMENT_SUCCESS":
      return { ...state, loading: false, payments: state.payments.map((Payment) => Payment.PaymentId === action.payload.PaymentId ? action.payload : Payment), };
    case "EDIT_PAYMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_PAYMENT_REQUEST":
      return { ...state, loading: true }
    case "DELETE_PAYMENT_SUCCESS":
      return { ...state, loading: false, deletedPayment: action.payload }
    case "DELETE_PAYMENT_FAILURE":
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};

export default PaymentReducer;
