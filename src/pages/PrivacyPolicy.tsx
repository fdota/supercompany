// src/pages/PrivacyPolicy.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- Importa Navigation

const PrivacyPolicy = () => {
  const leftContent = (
    <>
      <Navigation /> {/* <-- Navigation va qui dentro */}
      <div className="flex flex-col justify-center h-full p-4">
        <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
          🔒 Privacy Policy
        </h1>
        <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-6 max-w-md mx-auto">
          {/* ... (Contenuto della colonna sinistra come da versione precedente) ... */}
        </div>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="font-mono text-sm lg:text-base text-right-color leading-relaxed space-y-6 max-w-md mx-auto">
        {/* ... (Contenuto della colonna destra come da versione precedente) ... */}
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default PrivacyPolicy;