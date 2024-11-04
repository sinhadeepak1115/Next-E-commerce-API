"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Payment {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  userId: string;
}

export default function PaymentPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/payment");
        const data = await response.json();
        console.log(data);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <h2>
        {status === "loading"
          ? "Loading session..."
          : session
            ? `Logged in as: ${session.user?.email}`
            : "Not logged in"}
      </h2>
      {payments.map((payment) => (
        <div key={payment.id}>
          <p>{payment.amount}</p>
          <p>{payment.status}</p>
          <p>{payment.userId}</p>
        </div>
      ))}
    </div>
  );
}
