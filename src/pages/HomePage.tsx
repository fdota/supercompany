import SplitLayout from "@/components/layout/SplitLayout";
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useSheetData } from "@/hooks/useSheetData";

const HomePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]); // 👈 NUOVO per errori
  
  const { counters, loading, refreshData } = useSheetData();

  // 👈 NUOVO: Funzione di validazione
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push("Il nome è obbligatorio");
    if (!formData.email.trim()) errors.push("L'email è obbligatoria");
    if (!formData.contributionType) errors.push("Seleziona il tipo di contributo");
    if (!privacyConsent) errors.push("Devi accettare la Privacy Policy");
    
    // Validazione campi condizionali
    if (formData.contributionType === "money" || formData.contributionType === "both") {
      if (!formData.amount || parseInt(formData.amount) <= 0) {
        errors.push("Inserisci una stima dell'interesse economico");
      }
    }
    
    if (formData.contributionType === "time" || formData.contributionType === "both") {
      if (!formData.hours || parseInt(formData.hours) <= 0) {
        errors.push("Inserisci una stima della disponibilità oraria");
      }
      if (!formData.expertise.trim()) {
        errors.push("Indica le tue competenze principali");
      }
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 👈 NUOVO: Validazione prima di inviare
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors([]); // Reset errori
    
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
        
        // Reset form
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
        setPrivacyConsent(false);
        
      } else {
        const errorMessage = result.error || 'Errore sconosciuto dal server.';
        alert(`⚠️ Si è verificato un errore nel salvataggio. Riprova.\n\nDettagli: ${errorMessage}`);
      }
    } catch (error) {
      alert('⚠️ Si è verificato un errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const leftContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
        <TypewriterText text="Apriamo un'azienda Insieme?" />
      </h1>
      <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
        Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
      </h2>
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
        <p>Ciao a tutti, mi chiamo Fabio e sto cercando di creare una community di persone che vogliano collaborare per un progetto imprenditoriale. È difficile farcela da soli. Le competenze e le risorse non bastano mai.</p>
        <p>Per questo ho pensato a questa iniziativa collaborativa, un progetto che parte dalla coesione per diventare grande. Qui puoi indicare il tuo potenziale interesse a partecipare, che sia in termini di competenze o di eventuale supporto futuro.</p>
        <p>Collaborare insieme per sviluppare un'idea imprenditoriale è un sogno che avevo fin da bambino. Se non riuscirò potrò dire di averci almeno provato. Se invece funzionerà sarà la mia più grande soddisfazione!</p>
        <p className="text-magenta">Guarda i nostri progressi, e se vuoi, unisciti alla discussione!</p>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CounterBlock 
            title="Futuri Possibili Investitori" 
            value={loading ? 0 : counters.totalPeople} 
            subtitle={`Persone interessate a valutare un investimento futuro.`} 
          />
          <CounterBlock 
            title="Ore di Competenze Offerte" 
            value={loading ? 0 : counters.totalValueOre} 
            subtitle={`Tempo e skill messi a disposizione dalla community.`} 
          />
        </div>
        <CounterBlock 
          title="Interesse di Investimento Potenziale" 
          value={loading ? 0 : counters.totalValue} 
          subtitle={`Stima aggregata e non vincolante. <strong class='text-green'>Non costituisce un impegno finanziario.</strong>`} 
          variant="large" 
        />
      </div>
      <div className="relative z-10">
        <h3 className="font-pixel text-xl text-right-color mb-6">Unisciti alla Discussione</h3>
        
        {/* 👈 NUOVO: Mostra errori di validazione */}
        {formErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded">
            <h4 className="font-pixel text-red-600 mb-2">Correggi i seguenti errori:</h4>
            <ul className="list-disc list-inside text-sm">
              {formErrors.map((error, index) => (
                <li key={index} className="text-red-600">{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="required-field">Nome</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="email" className="required-field">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                required 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contributionType" className="required-field">Tipo di contributo</Label>
            <Select 
              name="contributionType" 
              value={formData.contributionType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona..." />
              </SelectTrigger>
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
              <Input 
                id="amount" 
                name="amount" 
                type="number" 
                value={formData.amount} 
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} 
                min="1" 
                placeholder="Inserisci una stima approssimativa"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Anche una stima approssimativa ci aiuta a valutare il progetto
              </p>
            </div>
          )}
          
          {(formData.contributionType === "time" || formData.contributionType === "both") && (
            <>
              <div>
                <Label htmlFor="hours" className="required-field">Stima disponibilità oraria</Label>
                <Input 
                  id="hours" 
                  name="hours" 
                  type="number" 
                  value={formData.hours} 
                  onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))} 
                  min="1" 
                  placeholder="Ore settimanali stimate"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  ⏱️ Indicativo per organizzare le risorse
                </p>
              </div>
              <div>
                <Label htmlFor="expertise" className="required-field">Competenze principali</Label>
                <Input 
                  id="expertise" 
                  name="expertise" 
                  value={formData.expertise} 
                  onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))} 
                  placeholder="es. Marketing, Sviluppo, Design, Vendite..." 
                  required
                />
              </div>
            </>
          )}
          
          {/* CHECKBOX PRIVACY POLICY */}
          <div className="flex items-start space-x-2 p-4 bg-gray-100 rounded border">
            <input 
              type="checkbox" 
              id="privacy-consent"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              required
              className="mt-1"
            />
            <label htmlFor="privacy-consent" className="text-sm text-gray-700">
              Acconsento al trattamento dei dati personali secondo la{' '}
              <a href="/privacy-policy.html" target="_blank" className="text-magenta hover:underline font-bold">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-magenta hover:bg-magenta/90 text-white font-mono border-2 border-magenta hover:border-green transition-colors"
          >
            {isSubmitting ? 'Invio in corso...' : '> Manifesta Interesse'}
          </Button>
        </form>
        
        <div className="mt-12 text-center">
          <h4 className="font-pixel text-md mb-4">Aiutaci a crescere.</h4>
          <div className="flex justify-center space-x-4">
            <a href="https://wa.me/?text=Ehi,%20dai%20un'occhiata%20a%20questo%20progetto%20collaborativo!%20Un%20iniziativa%20per%20creare%20un%20progetto%20imprenditoriale%20tutti%20insieme.%20Il%20sito%20%C3%A8%20supercompany.it" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-green hover:text-magenta transition-colors"
            >
              WHATSAPP
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://supercompany.it" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-green hover:text-magenta transition-colors"
            >
              LINKEDIN
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://supercompany.it" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-green hover:text-magenta transition-colors"
            >
              FACEBOOK
            </a>
            <a href="https://twitter.com/intent/tweet?url=https://supercompany.it&text=Ehi,%20scopri%20questo%20progetto%20collaborativo!%20Un%20iniziativa%20per%20creare%20un%20progetto%20imprenditoriale%20tutti%20insieme." 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-green hover:text-magenta transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default HomePage;