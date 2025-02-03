import React from "react";
import AnimatedCard from "../../components/AnimateCard";
import PaymentCard from "../../components/PaymentCard";

const LandingPage = () => {
  return (
    <div className="container bg-gray-900 text-white min-h-screen main-bg">
      <header className="p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Tenant Management</h1>
        <p className="text-lg mt-4">
          Effortlessly manage your properties and payments
        </p>
      </header>
      <section
        id="plots"
        className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatedCard title="Plot A" description="3 Rooms Available" />
        <AnimatedCard title="Plot B" description="Fully Occupied" />
        <AnimatedCard title="Plot C" description="2 Rooms Available" />
      </section>
      <section
        id="payments"
        className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <PaymentCard tenantName="John Doe" amountDue="$200" />
        <PaymentCard tenantName="Jane Smith" amountDue="$150" />
      </section>
    </div>
  );
};

export default LandingPage;
