import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const MONTHLY_MAINTENANCE = 2500;

function loadPayments() {
  return JSON.parse(localStorage.getItem("payments")) || [];
}

function getCurrentMonthLabel() {
  return new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function Payment() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [payments, setPayments] = useState(loadPayments());
  const [successMsg, setSuccessMsg] = useState("");

  const myPayments = payments.filter(
    (p) => p.paidBy === user?.email
  );

  const currentMonth = getCurrentMonthLabel();

  const alreadyPaidThisMonth = myPayments.some(
    (p) => p.month === currentMonth
  );

  const handlePayment = () => {
    if (alreadyPaidThisMonth) return;

    const newPayment = {
      id: Date.now(),
      paidBy: user?.email,
      paidByName: user?.name,
      flatNumber: user?.flatNumber,
      amount: MONTHLY_MAINTENANCE,
      month: currentMonth,
      method: paymentMethod,
      paidOn: new Date().toISOString(),
    };

    const updated = [newPayment, ...payments];
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));

    setSuccessMsg(
      `Payment of ₹${MONTHLY_MAINTENANCE} successful for ${currentMonth}.`
    );
  };

  return (
    <div className="payment-container">
      <div className="payment-box">

        <h2>Pay Maintenance</h2>

        <div className="payment-summary">

          <div className="payment-summary-row">
            <span>Flat</span>
            <strong>{user?.flatNumber || "—"} (Block {user?.block || "—"})</strong>
          </div>

          <div className="payment-summary-row">
            <span>Billing Month</span>
            <strong>{currentMonth}</strong>
          </div>

          <div className="payment-summary-row">
            <span>Maintenance Amount</span>
            <strong>₹{MONTHLY_MAINTENANCE}</strong>
          </div>

        </div>

        {alreadyPaidThisMonth ? (
          <p className="payment-already-paid">
            ✅ You have already paid the maintenance for {currentMonth}.
          </p>
        ) : (
          <>
            <div className="payment-method-group">
              <label>Payment Method</label>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="UPI">UPI</option>
                <option value="Credit / Debit Card">Credit / Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {successMsg && (
              <p className="payment-success">{successMsg}</p>
            )}

            <button
              className="make-payment-button"
              onClick={handlePayment}
            >
              Pay ₹{MONTHLY_MAINTENANCE} Now
            </button>
          </>
        )}

        <button
          className="back-dashboard-button"
          onClick={() => navigate("/member-dashboard")}
        >
          Back to Dashboard
        </button>

        {/* Payment History */}
        <h3>Payment History</h3>

        {myPayments.length === 0 ? (
          <p className="payment-empty-text">
            No payments made yet.
          </p>
        ) : (
          <div className="payment-history-list">
            {myPayments.map((p) => (
              <div className="payment-history-item" key={p.id}>

                <div>
                  <h4>{p.month}</h4>
                  <p>{p.method} · {new Date(p.paidOn).toLocaleDateString()}</p>
                </div>

                <strong>₹{p.amount}</strong>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Payment;
