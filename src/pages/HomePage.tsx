import { Link } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import { useState } from "react";
import { useSheetData } from "@/hooks/useSheetData";

const HomePage = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    contributionType: "",
    amount: "",
    hours: "",
    expertise: "",
    altraCompetenza: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { counters, loading } = useSheetData();

  const scrollToCounters = () => {
    const countersSection = document.querySelector('.section-counters');
    if (countersSection) {
      countersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.name) errors.push("Il nome è obbligatorio");
    if (!formData.email) errors.push("L'email è obbligatoria");
    if (!formData.contributionType) errors.push("Seleziona il tipo di contributo");
    
    // Validazioni condizionali
    if (formData.contributionType === 'interesse economico' && !formData.amount) {
      errors.push("Inserisci l'importo potenziale");
    }
    
    if (formData.contributionType === 'competenze') {
      if (!formData.hours) errors.push("Inserisci le ore disponibili");
      if (!formData.expertise) errors.push("Seleziona l'area di competenza");
      if (formData.expertise === 'altro' && !formData.altraCompetenza) {
        errors.push("Specifica la tua competenza");
      }
    }
    
    if (formData.contributionType === 'entrambi') {
      if (!formData.amount) errors.push("Inserisci l'importo potenziale");
      if (!formData.hours) errors.push("Inserisci le ore disponibili");
      if (!formData.expertise) errors.push("Seleziona l'area di competenza");
      if (formData.expertise === 'altro' && !formData.altraCompetenza) {
        errors.push("Specifica la tua competenza");
      }
    }
    
    if (!privacyConsent) errors.push("Devi accettare la privacy policy");
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Grazie per il tuo interesse! Ti contatteremo presto.');
        // Reset form
        setFormData({ 
          name: "", 
          email: "", 
          contributionType: "",
          amount: "",
          hours: "",
          expertise: "",
          altraCompetenza: ""
        });
        setPrivacyConsent(false);
      } else {
        alert('Errore: ' + result.error);
      }
    } catch (error) {
      alert('Errore di connessione');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="vertical-layout">
      {/* SEZIONE 1: NAVIGAZIONE CON SFONDO NERO */}
      <section className="section-navigation-black">
        <Navigation />
      </section>

      {/* SEZIONE 2: HERO - DESIGN PULITO E PROFESSIONALE */}
      <section className="section-hero-clean">
        <div className="flex flex-col justify-center h-full p-4">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Titolo principale - DESIGN PULITO */}
            <div className="text-center mb-12">
              <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-supercompany-dark-gray mb-4 leading-tight hover:text-supercompany-magenta transition-colors duration-300 cursor-pointer">
                Apriamo un'azienda
                <br />
                insieme?
              </h1>
              
              <h2 className="font-mono text-lg md:text-xl lg:text-2xl text-supercompany-dark-gray leading-relaxed">
  Se da solo non riesci, insieme si <span className="text-supercompany-green font-semibold">può</span>.
</h2>            </div>

            {/* Contenuto testuale - STILE PULITO COME I CONTATORI */}
            <div className="space-y-8 max-w-3xl mx-auto">
              
              {/* Introduzione */}
              <div className="text-center">
                <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray leading-relaxed font-medium">
                  Ciao a tutti, mi chiamo Fabio e sto cercando di creare una comunità di persone che vogliano aprire un'azienda vincente assieme.
                </p>
              </div>

              {/* Punti chiave */}
              <div className="space-y-4 font-mono text-base text-supercompany-dark-gray leading-relaxed">
                <div className="flex items-start">
                  <span className="text-supercompany-magenta mr-3 font-bold">-</span>
                  <p>È difficile farcela da soli. I soldi e le competenze non bastano mai.</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-supercompany-magenta mr-3 font-bold">-</span>
                  <p>Per questo ho pensato a questa Super Company, una super azienda che parte dalla coesione per diventare grande.</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-supercompany-magenta mr-3 font-bold">-</span>
                  <p>Qui puoi indicare il tuo potenziale contributo, che sia in denaro o in lavoro.</p>
                </div>
              </div>

              {/* Citazione */}
              <div className="border-l-4 border-supercompany-magenta pl-6 py-4 bg-gray-50 rounded-r">
                <p className="font-mono text-base text-supercompany-dark-gray italic leading-relaxed">
                  "Unire più persone insieme per aprire un'azienda è un'idea che avevo fin da bambino. Se non riuscirò potrò dire di averci almeno provato. Se invece funzionerà sarà la mia più grande soddisfazione!"
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6">
                <button 
                  onClick={scrollToCounters}
                  className="inline-block bg-supercompany-dark-gray text-supercompany-white px-8 py-4 rounded font-mono font-bold text-lg hover:bg-supercompany-magenta transition-colors duration-300 cursor-pointer"
                >
                  Guarda i nostri progressi, e se vuoi, unisciti a noi!
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 3: CONTATORI - MANTENUTA COSÌ COM'È (BIANCA) */}
      <section className="section-counters">
        <div className="flex flex-col justify-center h-full p-4">
          <div className="space-y-12 max-w-4xl mx-auto w-full">
            
            {/* CONTATORE 1: POTENZIALE CAPITALE RACCOLTO */}
            <div className="counter-simple">
              <h3 className="counter-title">POTENZIALE CAPITALE RACCOLTO</h3>
              <div className="counter-value">
                {loading ? "..." : counters.totalMoney} €
              </div>
              <p className="counter-subtitle">
                Stima indicativa basata su manifestazioni d'interesse non vincolanti. 
                Non costituisce impegno di raccolta effettiva né garanzia di risultato.
              </p>
            </div>

            {/* CONTATORE 2: ORE DI COMPETENZE OFFERTE */}
            <div className="counter-simple">
              <h3 className="counter-title">ORE DI COMPETENZE OFFERTE</h3>
              <div className="counter-value">
                {loading ? "..." : counters.totalValueOre} €
              </div>
              <p className="counter-subtitle">
                Valore convenzionale delle competenze messe a disposizione dalla community.
                Le ore indicate rappresentano disponibilità espresse senza obbligo di prestazione.
              </p>
            </div>

            {/* CONTATORE 3: TOTALE COMPLESSIVO */}
            <div className="counter-simple">
              <h3 className="counter-title">TOTALE COMPLESSIVO</h3>
              <div className="counter-value">
                {loading ? "..." : counters.totalValue} €
              </div>
              <p className="counter-subtitle">
                Somma delle manifestazioni d'interesse non vincolanti. 
                Le cifre sono indicative e non costituiscono impegno contrattuale.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEZIONE 4: FORM - 50% DELLA LARGHEZZA */}
      <section className="section-form">
        <div className="flex flex-col justify-center h-full p-4">
          <div className="form-half-width">
            <h2 className="form-title">MANIFESTA INTERESSE</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* RIGA NOME E EMAIL AFFIANCATI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="form-label">
                    Nome +
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email +
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Tipo Contributo */}
              <div>
                <label htmlFor="contributionType" className="form-label">
                  Tipo di contributo *
                </label>
                <select 
                  id="contributionType"
                  value={formData.contributionType} 
                  onChange={(e) => handleInputChange('contributionType', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Seleziona ...</option>
                  <option value="interesse economico">Interesse economico futuro</option>
                  <option value="competenze">Competenze e tempo</option>
                  <option value="entrambi">Entrambi</option>
                </select>
              </div>

              {/* CAMPI CONDIZIONALI - INTERESSE ECONOMICO */}
              {(formData.contributionType === 'interesse economico' || formData.contributionType === 'entrambi') && (
                <div>
                  <label htmlFor="amount" className="form-label">
                    Importo potenziale (€) *
                  </label>
                  <input
                    id="amount"
                    type="number"
                    placeholder="Es: 5000"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="form-input remove-number-arrows"
                    required={formData.contributionType === 'interesse economico' || formData.contributionType === 'entrambi'}
                  />
                </div>
              )}

              {/* CAMPI CONDIZIONALI - COMPETENZE */}
              {(formData.contributionType === 'competenze' || formData.contributionType === 'entrambi') && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="hours" className="form-label">
                      Ore totali di disponibilità *
                    </label>
                    <input
                      id="hours"
                      type="number"
                      placeholder="Es: 100 ore totali"
                      value={formData.hours}
                      onChange={(e) => handleInputChange('hours', e.target.value)}
                      className="form-input remove-number-arrows"
                      required={formData.contributionType === 'competenze' || formData.contributionType === 'entrambi'}
                    />
                  </div>
                  <div>
                    <label htmlFor="expertise" className="form-label">
                      Area di competenza *
                    </label>
                    <select 
                      id="expertise"
                      value={formData.expertise} 
                      onChange={(e) => handleInputChange('expertise', e.target.value)}
                      className="form-select"
                      required={formData.contributionType === 'competenze' || formData.contributionType === 'entrambi'}
                    >
                      <option value="">Seleziona competenza...</option>
                      <option value="sviluppo software">Sviluppo Software</option>
                      <option value="design">Design e UX/UI</option>
                      <option value="marketing">Marketing e Vendite</option>
                      <option value="finanza">Finanza e Amministrazione</option>
                      <option value="operazioni">Operazioni e Logistica</option>
                      <option value="risorse umane">Risorse Umane</option>
                      <option value="legale">Legale e Compliance</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>

                  {/* CAMPO LIBERO PER "ALTRO" */}
                  {formData.expertise === 'altro' && (
                    <div>
                      <label htmlFor="altraCompetenza" className="form-label">
                        Specifica la tua competenza *
                      </label>
                      <input
                        id="altraCompetenza"
                        type="text"
                        placeholder="Descrivi la tua competenza ..."
                        value={formData.altraCompetenza || ''}
                        onChange={(e) => handleInputChange('altraCompetenza', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Privacy */}
              <div className="flex items-start space-x-3 ml-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="form-checkbox mt-1"
                  required
                />
                <label htmlFor="privacy" className="form-label !mb-0 text-sm leading-relaxed">
                  Acconsento al trattamento dei dati personali secondo la{" "}
                  <Link to="/privacy" className="font-bold underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Errori */}
              {formErrors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <ul className="list-disc list-inside text-sm">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottone Submit */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="form-button"
              >
                {isSubmitting ? "Invio in corso..." : "Manifesta interesse"}
              </button>
            </form>

            {/* Separatore e testo finale */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="help-text text-center">
                Aiutaci a crescere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 5: SOCIAL (NERA) - CON WHATSAPP PRIMO */}
      <section className="section-social">
        <div className="flex flex-col justify-center h-full p-4">
          <h3 className="social-title">Condividi sui tuoi social il progetto</h3>
          
          <div className="social-links">
            <a href="#" className="social-link">WhatsApp</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Instagram</a>
          </div>

          <p className="help-text">
            Condividi il Progetto con altre persone!
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;