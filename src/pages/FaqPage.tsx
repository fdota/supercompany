import Navigation from "@/components/layout/Navigation";

const FAQPage = () => {
  const faqItems = [
    {
      question: "Cos'è Super Company?",
      answer: "Super Company è un progetto che mira a creare una comunità di persone interessate ad aprire un'azienda insieme. L'idea è unire competenze e risorse per realizzare qualcosa di più grande di quanto si potrebbe fare da soli."
    },
    {
      question: "Come funziona?",
      answer: "Le persone manifestano interesse indicando il tipo di contributo che potrebbero offrire: economico, in competenze/tempo, o entrambi. Quando raggiungeremo una massa critica, valuteremo insieme le migliori opportunità di business."
    },
    {
      question: "Devo investire soldi subito?",
      answer: "No, al momento stiamo solo raccogliendo manifestazioni d'interesse non vincolanti. Eventuali investimenti economici verranno discussi e decisi collettivamente solo quando il progetto sarà più definito."
    },
    {
      question: "Quali competenze sono più richieste?",
      answer: "Cerchiamo persone con competenze in sviluppo software, design, marketing, finanza, operazioni, risorse umane e legale. Ma ogni competenza può essere preziosa per un'azienda."
    },
    {
      question: "Come vengono gestiti i dati personali?",
      answer: "I dati vengono conservati in modo sicuro su Google Sheets e utilizzati esclusivamente per contattarti riguardo al progetto. Puoi consultare la nostra Privacy Policy per maggiori dettagli."
    },
    {
      question: "Posso partecipare se non ho competenze specifiche?",
      answer: "Assolutamente sì! Anche l'entusiasmo, la voglia di imparare e contribuire con il proprio tempo sono risorse preziose. L'importante è la volontà di fare parte di un progetto collettivo."
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
                FAQ
              </h1>
            </div>

            {/* FAQ con stile citazione */}
            <div className="space-y-8 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="border-l-4 border-supercompany-magenta pl-6 py-4 bg-gray-50 rounded-r">
                  <h3 className="font-mono text-lg font-semibold text-supercompany-dark-gray mb-3">
                    {item.question}
                  </h3>
                  <p className="font-mono text-base text-supercompany-dark-gray leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;