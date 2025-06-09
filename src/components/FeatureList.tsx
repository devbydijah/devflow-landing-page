import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, Network, ServerCrash } from "lucide-react";
import FadeInSection from "./FadeInSection";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// Map icon names to Lucide components
const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Zap,
  ShieldCheck,
  Network,
  ServerCrash,
};

const FeatureList: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/features");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch features: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setFeatures(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch features:", err);
        setError(err.message || "Could not load features.");
        // Fallback features
        setFeatures([
          {
            id: "fallback1",
            icon: "Zap",
            title: "Feature Loading Error",
            description:
              "Could not load feature details. Please try again later.",
          },
          {
            id: "fallback2",
            icon: "ShieldCheck",
            title: "Feature Loading Error",
            description:
              "Could not load feature details. Please try again later.",
          },
          {
            id: "fallback3",
            icon: "Network",
            title: "Feature Loading Error",
            description:
              "Could not load feature details. Please try again later.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 p-8 rounded-lg animate-pulse">
            <div className="h-10 w-10 bg-gray-700 rounded mb-4"></div>
            <div className="h-6 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
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
            <h3 className="text-xl font-semibold">Error Loading Features</h3>
          </div>
          <p className="text-red-200">{error}</p>
          <p className="text-red-200 mt-2 text-sm">
            Displaying default feature information.
          </p>
        </FadeInSection>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const IconComponent = iconComponents[feature.icon] || ServerCrash;
          return (
            <FadeInSection key={feature.id} delay={index + 1}>
              <div className="bg-gray-800 p-8 rounded-lg smooth-hover hover:shadow-2xl hover:shadow-blue-500/30 h-full">
                <div className="text-blue-500 mb-4 inline-block">
                  <IconComponent className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </>
  );
};

export default FeatureList;
