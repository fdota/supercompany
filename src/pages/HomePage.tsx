// src/pages/HomePage.tsx

import { Link } from "react-router-dom";
import SplitLayout from "@/components/layout/SplitLayout";
// import Navigation from "@/components/layout/Navigation"; // <-- CANCELLATA
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useSheetData } from "@/hooks/useSheetData";

const HomePage = () => {
  // ... tutta la logica (useState, handleSubmit, etc.) rimane identica ...
  const [formData, setFormData] = useState({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { counters, loading, refreshData } = useSheetData();
  const validateForm = () => { /* ... */ return true; };
  const handleSubmit = async (e: React.FormEvent) => { /* ... */ };


  const leftContent = (
    // <> <-- NON SERVE PIÙ IL FRAGMENT
      // <Navigation /> <-- CANCELLATA
      <div className="flex flex-col justify-center h-full p-4">
        <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
          <TypewriterText text="Apriamo un'azienda Insieme?" />
        </h1>
        <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
          Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
        </h2>
        <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
          <p>Ciao a tutti, mi chiamo Fabio e sto cercando di creare una comunita' di persone che vogliano aprire un'azienda vincente assieme. E' difficile farcela da soli. I soldi e le competenze non bastano mai.</p>
          <p>Per questo ho pensato a questa Super Company, una super azienda che parte dalla coesione per diventare grande. Qui puoi indicare il tuo potenziale contributo, che sia in danaro o in lavoro (se scegli le ore, ti chiederemo anche la tua area di competenza).</p>
          <p>Unire piu' persone insieme per aprire un'azienda e' un'idea che avevo fin da bambino. Se non riusciro' potro' dire di averci almeno provato. Se invece funzionera' sara' la mia piu' grande soddisfazione!</p>
          <p className="text-magenta">Guarda i nostri progressi, e se vuoi, unisciti a noi!</p>
        </div>
      </div>
    // </> <-- NON SERVE PIÙ IL FRAGMENT
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
       {/* ... tutto il contenuto della colonna destra rimane identico ... */}
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default HomePage;