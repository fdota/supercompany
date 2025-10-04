import Navigation from "@/components/layout/Navigation";
import { useNavigate } from "react-router-dom";

const ChiSonoPage = () => {
  const navigate = useNavigate();

  const scrollToForm = () => {
    navigate("/");
    setTimeout(() => {
      const formSection = document.querySelector('.section-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
                Chi sono
              </h1>
            </div>

            {/* Contenuto */}
            <div className="space-y-8 max-w-3xl mx-auto">
              
              {/* Immagine reale - PERCORSO CORRETTO */}
              <div className="flex justify-center mb-8">
                <div className="w-64 h-64 rounded-lg overflow-hidden border-2 border-supercompany-magenta shadow-lg">
                  <img 
                    src="/fabio.jpg" 
                    alt="Fabio - Fondatore di Super Company" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Testo */}
              <div className="font-mono text-base lg:text-lg text-supercompany-dark-gray leading-relaxed space-y-6">
                <p><strong>Piacere, Fabio!</strong> Sono nato a Milano quasi 40 anni fa (questione di mesi ormai) e ho fatto praticamente tutti i lavori possibili e immaginabili.</p>
                
                <p>Mi sono appena ritrasferito in Italia dopo un'esperienza di quasi 3 anni a Copenhagen dove ho lavorato nella ristorazione. In Italia ho lavorato nei traslochi, come cassiere, promoter, come data entry, come magazziniere, nel controllo documentale, come barista, barback, cameriere, nella vendita al dettaglio, nella vendita all'ingrosso, e con buona probabilita' un'altra decina di lavori non mi sovviene.</p>
                
                <p>So usare programmi di grafica per foto, montare video, ho fatto corsi di marketing, per aprire start up, corsi per gestire una campagna adv e di intelligenza artificiale.</p>
                
                <p>Mi piacerebbe aprire un'azienda con altre persone perche' riconosco quanto sia difficile farlo da soli.</p>
                
                <p>Per un semplice bar ci vogliono centinaia di migliaia di euro. Per fare un applicazione per smartphone almeno 15 mila euro. Per fare pubblicita' sui vari motori di ricerca o per strada, altre migliaia di euro al mese. E' tutto molto complesso.</p>
                
                <p>E' vero, se hai una buona idea puoi provare ad entrare in un incubatore, farti finanziare, ma io volevo fare una cosa molto diversa. <strong>Creare da zero una Comunita' e far decidere a questa cosa fare!</strong></p>
                
                <p>Non sono qui per creare un Unicorno (un'azienda che vale 1 miliardo di dollari), sarebbe sciocco anche solo pensarci, ma dare vita a qualcosa che prima non c'era, o migliorare un qualcosa di esistente, dargli un nome e vedere questa cosa crescere, respirare, vivere e interagire.</p>
                
                <div className="border-l-4 border-supercompany-magenta pl-6 py-4 bg-gray-50 rounded-r">
                  <p className="text-supercompany-magenta font-semibold italic">
                    Non ho figli e non so se ne avro', ma mi piacerebbe poter dire che sono stato il "La" di qualcosa molto piu' grande di me.
                  </p>
                </div>

                {/* Pulsante finale */}
                <div className="text-center mt-8">
                  <button
                    onClick={scrollToForm}
                    className="font-mono font-bold text-black uppercase text-lg hover:text-supercompany-green transition-colors duration-300 cursor-pointer"
                  >
                    BUON VIAGGIO A CHI SALIRÀ A BORDO!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSonoPage;