import BASE_URL from "./Config";

console.log(BASE_URL);

const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

console.log(BASE_URL);

// STUDENT FUNCTIONS
export const fetchPayments = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListPayment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch payments");
  return await response.json();
};

export const fetchPaymentEnrollmentRequest = async (paginationDetail) => {
  const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListPaymentEnrollment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(paginationDetail),
  });
  if (!response.ok) throw new Error("Failed to fetch payment enrollment requests");
  return await response.json();
};

export const addPayment = async (PaymentData) => {
  const response = await fetch(`${BASE_URL}/PaymentDetail/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(PaymentData),
  });
  if (!response.ok) throw new Error("Failed to add payment");
  console.log(response);
  return await response.json();
};

export const editPayment = async (PaymentData) => {
  const response = await fetch(`${BASE_URL}/PaymentDetail/Update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(PaymentData),
  });
  if (!response.ok) throw new Error("Failed to edit payment");
  return await response.json();
};

export const getPayment = async (paymentId) => {
  const response = await fetch(`${BASE_URL}/PaymentDetail/GetUserById?UserId=${paymentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch payment data");
  return await response.json();
};

export const deletePayment = async (paymentId) => {
  const response = await fetch(`${BASE_URL}/PaymentDetail/Delete/${paymentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete payment");
  return await response.json();
};

