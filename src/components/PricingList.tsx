import React, { useState, useEffect } from "react";
import { Check, ServerCrash } from "lucide-react";
import FadeInSection from "./FadeInSection";

interface Plan {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  features: string[];
  buttonText: string;
  ctaLink: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  borderColor: string;
  recommended: boolean;
}

const PricingList: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pricing");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch pricing plans: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setPlans(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch pricing plans:", err);
        setError(err.message || "Could not load pricing plans.");
        // Fallback plans
        setPlans([
          {
            id: "starter_fb",
            name: "Starter (Error)",
            price: "$0",
            priceSuffix: "/month",
            features: ["Data unavailable"],
            buttonText: "Try Again Later",
            ctaLink: "#",
            bgColor: "bg-gray-800",
            textColor: "text-white",
            buttonColor: "bg-gray-700",
            borderColor: "border-gray-700",
            recommended: false,
          },
          {
            id: "pro_fb",
            name: "Pro (Error)",
            price: "$XX",
            priceSuffix: "/month",
            features: ["Data unavailable"],
            buttonText: "Try Again Later",
            ctaLink: "#",
            bgColor: "bg-gray-800",
            textColor: "text-white",
            buttonColor: "bg-gray-700",
            borderColor: "border-gray-700",
            recommended: true,
          },
          {
            id: "enterprise_fb",
            name: "Enterprise (Error)",
            price: "$YY",
            priceSuffix: "/month",
            features: ["Data unavailable"],
            buttonText: "Try Again Later",
            ctaLink: "#",
            bgColor: "bg-gray-800",
            textColor: "text-white",
            buttonColor: "bg-gray-700",
            borderColor: "border-gray-700",
            recommended: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700 rounded-lg p-8 animate-pulse"
          >
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="h-8 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded mt-6"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {error && (
        <FadeInSection className="bg-red-800 border border-red-700 text-white p-6 rounded-lg mb-8 max-w-md mx-auto">
          <div className="flex items-center mb-2">
            <ServerCrash className="h-8 w-8 mr-3 text-red-300" />
            <h3 className="text-xl font-semibold">Error Loading Pricing</h3>
          </div>
          <p className="text-red-200">{error}</p>
          <p className="text-red-200 mt-2 text-sm">
            Displaying default pricing information.
          </p>
        </FadeInSection>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <FadeInSection key={plan.id} delay={index + 1}>
            <div
              className={`${plan.bgColor} ${plan.textColor} border-2 ${
                plan.borderColor
              } rounded-lg p-8 relative smooth-hover h-full flex flex-col ${
                plan.recommended ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.priceSuffix}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={`w-full ${plan.buttonColor} text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 text-center block`}
              >
                {plan.buttonText}
              </a>
            </div>
          </FadeInSection>
        ))}
      </div>
    </>
  );
};

export default PricingList;
