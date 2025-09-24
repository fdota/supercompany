import SplitLayout from "@/components/layout/SplitLayout";
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contributionType: "",
    amount: "",
    hours: "",
    expertise: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counters, setCounters] = useState({ totalMoney: 0, totalHours: 0, totalPeople: 0, totalValue: 0 });

  useEffect(() => {
    // Questa funzione caricherà i dati reali in futuro
    const loadExistingData = async () => {
      console.log("Caricamento dati dal Sheet...");
    };
    loadExistingData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/save-to-sheet', { // Corretto per usare la regola /api/*
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('✅ Grazie! La tua adesione è stata registrata con successo.');
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" }); // Reset form
      } else {
        alert('⚠️ Si è verificato un errore nel salvataggio. Riprova. Errore: ' + result.error);
      }
    } catch (error) {
      alert('⚠️ Si è verificato un errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <div className="flex flex-col justify-center h-full">
      <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
        <TypewriterText text="Apriamo un'azienda Insieme?" />
      </h1>
      <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
        Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
      </h2>
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
        <p>Ciao a tutti, mi chiamo Fabio...</p>
        {/* ... Il resto del tuo testo ... */}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full">
      <div className="mb-12">
        {/* ... Contatori ... */}
      </div>
      <div>
        <h3 className="font-pixel text-xl text-right-color mb-6">Ora tocca a te.</h3>
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          <div style={{ display: 'none' }}><Label>Don’t fill this out if you’re human: <Input name="bot-field" /></Label></div>
          {/* ... Tutti i campi del form ... */}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-supercompany-magenta hover:bg-supercompany-magenta/90 text-white font-mono">
            {isSubmitting ? 'Invio in corso...' : '> Unisciti Ora'}
          </Button>
        </form>
        <div className="mt-12 text-center">
            {/* ... Social links ... */}
        </div>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};
export default HomePage;