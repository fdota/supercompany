import Navigation from "@/components/layout/Navigation";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="vertical-layout">
      {/* SEZIONE NAVIGAZIONE CON SFONDO NERO */}
      <section className="section-navigation-black">
        <Navigation />
      </section>

      {/* SEZIONE CONTENUTO */}
      <section className="section-hero-clean">
        <div className="flex flex-col justify-center h-full p-4">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            <h1 className="font-mono text-6xl md:text-8xl font-bold text-supercompany-magenta mb-8">
              404
            </h1>
            
            <h2 className="font-mono text-2xl md:text-3xl text-supercompany-dark-gray mb-8">
              Pagina non trovata
            </h2>
            
            <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mb-8 max-w-md mx-auto">
              Ops! La pagina che cerchi non esiste o è stata spostata.
            </p>
            
            <Link 
              to="/" 
              className="inline-block bg-supercompany-dark-gray text-supercompany-white px-8 py-4 rounded font-mono font-bold text-lg hover:bg-supercompany-magenta transition-colors duration-300"
            >
              Torna alla Home
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;