// src/pages/HomePage.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- IMPORTANTE
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useSheetData } from "@/hooks/useSheetData";

const HomePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const { counters, loading, refreshData } = useSheetData();

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Il nome è obbligatorio");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.push("Inserisci un'email valida");
    if (!formData.contributionType) errors.push("Seleziona il tipo di contributo");
    if (!privacyConsent) errors.push("Devi accettare la Privacy Policy");
    if ((formData.contributionType === "money" || formData.contributionType === "both") && (!formData.amount || parseInt(formData.amount) <= 0)) {
        errors.push("Inserisci una stima dell'interesse economico");
    }
    if ((formData.contributionType === "time" || formData.contributionType === "both") && (!formData.hours || parseInt(formData.hours) <= 0)) {
        errors.push("Inserisci una stima delle ore");
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormErrors([]);
    
    try {
      const response = await fetch('/.netlify/functions/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        alert('✅ Grazie! La tua adesione è stata registrata con successo.');
        await refreshData();
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
        setPrivacyConsent(false);
      } else {
        alert(`⚠️ Errore nel salvataggio: ${result.error || 'Riprova.'}`);
      }
    } catch (error) {
      alert('⚠️ Errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <>
      <Navigation />
      <div className="flex flex-col justify-center h-full p-4">
        <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
          <TypewriterText text="Apriamo un'azienda Insieme?" />
        </h1>
        <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
          Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
        </h2>
        <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
          <p>Ciao, mi chiamo Fabio e sto creando una community per avviare un progetto imprenditoriale collaborativo. Da soli è difficile, le risorse non bastano mai.</p>
          <p>Qui puoi manifestare il tuo interesse a partecipare, con competenze o con una stima di supporto economico futuro. Ogni contributo è un mattone per costruire qualcosa di grande.</p>
          <p className="text-magenta">Guarda i nostri progressi e, se vuoi, unisciti alla discussione!</p>
        </div>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CounterBlock 
            title="Interesse Economico Manifestato" 
            value={loading ? 0 : counters.totalMoney} 
            subtitle="Stima non vincolante basata sulle indicazioni della community." 
            isCurrency={true}
          />
          <CounterBlock 
            title="Ore di Competenze Offerte" 
            value={loading ? 0 : counters.totalHours} 
            subtitle="Tempo e skill messi a disposizione per il progetto."
            isCurrency={false}
          />
        </div>
        <CounterBlock 
          title="Valore Totale Potenziale" 
          value={loading ? 0 : counters.totalValue} 
          subtitle={`Un potenziale aggregato da <strong class='text-green'>${loading ? 0 : counters.totalPeople}</strong> persone. <strong class='text-magenta'>Non costituisce un impegno finanziario.</strong>`} 
          variant="large" 
          isCurrency={true}
        />
      </div>

      <div className="relative z-10">
        <h3 className="font-pixel text-xl text-right-color mb-6">Unisciti alla Discussione</h3>
        {formErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded text-left">
            <ul className="list-disc list-inside text-sm text-red-300">
              {formErrors.map((error, index) => <li key={index}>{error}</li>)}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ...tutti i campi del form (Input, Select, ecc.) rimangono uguali ... */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="required-field">Nome</Label>
              <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="email" className="required-field">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
            </div>
          </div>
          <div>
            <Label htmlFor="contributionType" className="required-field">Tipo di contributo</Label>
            <Select name="contributionType" value={formData.contributionType} onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}>
              <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="money">Interesse economico futuro</SelectItem>
                <SelectItem value="time">Competenze e tempo</SelectItem>
                <SelectItem value="both">Entrambi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(formData.contributionType === "money" || formData.contributionType === "both") && (
            <div>
              <Label htmlFor="amount" className="required-field">Stima interesse economico (€)</Label>
              <Input id="amount" name="amount" type="number" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} min="1" placeholder="Solo a scopo indicativo" required />
            </div>
          )}
          {(formData.contributionType === "time" || formData.contributionType === "both") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hours" className="required-field">Ore stimate</Label>
                <Input id="hours" name="hours" type="number" value={formData.hours} onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))} min="1" placeholder="Ore settimanali" required />
              </div>
              <div>
                <Label htmlFor="expertise">Competenze</Label>
                <Input id="expertise" name="expertise" value={formData.expertise} onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))} placeholder="es. Marketing..." />
              </div>
            </div>
          )}
          <div className="flex items-start space-x-2 p-4 bg-gray-100 rounded border">
            <input type="checkbox" id="privacy-consent" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} required className="mt-1" />
            <label htmlFor="privacy-consent" className="text-sm text-gray-700">
              Acconsento al trattamento dei dati secondo la{' '}
              <Link to="/privacy" className="text-magenta hover:underline font-bold">Privacy Policy</Link>
            </label>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-magenta hover:bg-magenta/90 text-white font-mono border-2 border-magenta hover:border-green transition-colors">
            {isSubmitting ? 'Invio in corso...' : '> Manifesta Interesse'}
          </Button>
        </form>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default HomePage;