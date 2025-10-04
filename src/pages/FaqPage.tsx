import Navigation from "@/components/layout/Navigation";

const faqData = [
  {
    question: "Cosa succede ai miei soldi una volta che aderisco?",
    answer: "La cifra che inserisci è un impegno, non un pagamento. Nessun denaro verrà raccolto fino a quando non avremo definito insieme il progetto d'impresa e le modalità legali per la costituzione della società.",
  },
  {
    question: "Come verrà scelta l'idea di business?",
    answer: "Tutti i partecipanti verranno invitati su una piattaforma privata (es. Discord) dove le idee verranno presentate, discusse e votate. Il processo sarà democratico e trasparente.",
  },
  {
    question: "Che ruolo avrò nell'azienda?",
    answer: "Aderendo, diventi un potenziale co-fondatore. Il tuo ruolo dipenderà dalla natura del progetto scelto e dalle tue competenze, oltre che dal tuo impegno. Tutti i dettagli verranno definiti insieme.",
  },
  {
    question: "Come funziona l'impegno di tempo e come viene valutato?",
    answer: "Crediamo che il tempo e il talento siano preziosi quanto il denaro. Per questo, abbiamo introdotto un valore convenzionale di co-fondazione di 10 €/ora. Questo ci permette di quantificare la forza totale del progetto e di valorizzare ogni tipo di contributo in modo equo in questa fase iniziale.",
  },
];

const FaqPage = () => {
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

            {/* Contenuto FAQ */}
            <div className="space-y-8 max-w-3xl mx-auto">
              {faqData.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                  <h3 className="font-mono text-xl font-semibold text-supercompany-magenta mb-4">
                    {item.question}
                  </h3>
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray leading-relaxed">
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

export default FaqPage;