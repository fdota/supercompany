import Navigation from "@/components/layout/Navigation";

const PrivacyPolicy = () => {
  const privacySections = [
    {
      title: "Titolare del Trattamento",
      content: "Titolare: Fabio\nEmail: fdotautorino@gmail.com"
    },
    {
      title: "Dati Personali Raccolti",
      content: "Raccogliamo esclusivamente i dati che fornisci volontariamente:\n\n• Nome (obbligatorio)\n• Indirizzo email (obbligatorio)\n\nNon raccogliamo: numeri di telefono, indirizzi fisici, o altre informazioni sensibili."
    },
    {
      title: "Base Giuridica",
      content: "Il trattamento si basa sul tuo consenso esplicito, fornito compilando il form. Puoi revocare il consenso in qualsiasi momento."
    },
    {
      title: "Conservazione e Sicurezza",
      content: "I dati sono conservati su Google Sheets/Drive. Implementiamo misure di sicurezza come:\n\n• Accesso limitato al solo titolare\n• Account Google protetto con autenticazione forte\n• Nessuna condivisione pubblica del documento"
    },
    {
      title: "Durata Conservazione",
      content: "I dati sono conservati fino a:\n\n• Tua richiesta di cancellazione\n• Abbandono del progetto\n• Massimo 2 anni di inattività"
    },
    {
      title: "I Tuoi Diritti (GDPR)",
      content: "Hai diritto di:\n\n• Accesso\n• Modifica\n• Cancellazione\n• Portabilità\n• Revoca del consenso\n• Limitazione del trattamento\n\nPer esercitare i tuoi diritti, contattaci a: fdotautorino@gmail.com\nRisponderemo entro 30 giorni."
    }
  ];

  return (
    <div className="vertical-layout">
      {/* SEZIONE NAVIGAZIONE CON SFONDO NERO */}
      <section className="section-navigation-black">
        <Navigation />
      </section>

      {/* SEZIONE CONTENUTO */}
      <section className="section-hero-clean">
        <div className="flex flex-col justify-center h-full p-4">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Titolo principale */}
            <div className="text-center mb-12">
              <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-supercompany-dark-gray mb-8 leading-tight">
                Privacy Policy
              </h1>
              <p className="font-mono text-base text-supercompany-dark-gray opacity-70">
                Ultimo aggiornamento: 28 Settembre 2024
              </p>
            </div>

            {/* Introduzione */}
            <div className="border-l-4 border-supercompany-magenta pl-6 py-4 bg-gray-50 rounded-r mb-8">
              <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray leading-relaxed">
                Questa Privacy Policy descrive come Super Company raccoglie e utilizza i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).
              </p>
            </div>

            {/* Contenuto Privacy Policy - STILE FAQ */}
            <div className="space-y-8 max-w-3xl mx-auto">
              {privacySections.map((section, index) => (
                <div key={index} className="border-l-4 border-supercompany-magenta pl-6 py-4 bg-gray-50 rounded-r">
                  <h3 className="font-mono text-lg font-semibold text-supercompany-dark-gray mb-3">
                    {section.title}
                  </h3>
                  <div className="font-mono text-base text-supercompany-dark-gray leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;