import Navigation from "@/components/layout/Navigation";

const PrivacyPolicy = () => {
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
              <p className="font-mono text-base text-supercompany-dark-gray">
                Ultimo aggiornamento: 28 Settembre 2025
              </p>
            </div>

            {/* Contenuto Privacy Policy */}
            <div className="space-y-8 max-w-3xl mx-auto">
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray leading-relaxed">
                  Questa Privacy Policy descrive come Super Company raccoglie e utilizza i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).
                </p>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">TITOLARE DEL TRATTAMENTO</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray">
                    <strong className="text-supercompany-magenta">Titolare:</strong> Fabio<br/>
                    <strong className="text-supercompany-magenta">Email:</strong> fdotautorino@gmail.com
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">DATI PERSONALI RACCOLTI</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mb-4">
                    Raccogliamo esclusivamente i dati che fornisci volontariamente:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Nome (obbligatorio)</li>
                    <li>Indirizzo email (obbligatorio)</li>
                  </ul>
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mt-4">
                    <strong>Non raccogliamo:</strong> numeri di telefono, indirizzi fisici, o altre informazioni sensibili.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">BASE GIURIDICA</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray">
                    Il trattamento si basa sul tuo <strong className="text-supercompany-magenta">consenso esplicito</strong>, fornito compilando il form. Puoi revocare il consenso in qualsiasi momento.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">CONSERVAZIONE E SICUREZZA</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mb-4">
                    I dati sono conservati su <strong className="text-supercompany-magenta">Google Sheets/Drive</strong>. Implementiamo misure di sicurezza come:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Accesso limitato al solo titolare.</li>
                    <li>Account Google protetto con autenticazione forte.</li>
                    <li>Nessuna condivisione pubblica del documento.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">DURATA CONSERVAZIONE</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mb-4">
                    I dati sono conservati fino a:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Tua richiesta di cancellazione.</li>
                    <li>Abbandono del progetto.</li>
                    <li>Massimo <strong className="text-supercompany-magenta">2 anni di inattività</strong>.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-xl font-semibold text-supercompany-green mb-4">I TUOI DIRITTI (GDPR)</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray">
                    Hai diritto di <strong className="text-supercompany-magenta">Accesso, Modifica, Cancellazione, Portabilità, Revoca del consenso</strong> e <strong className="text-supercompany-magenta">Limitazione del trattamento</strong> dei tuoi dati.
                  </p>
                  <p className="font-mono text-base lg:text-lg text-supercompany-dark-gray mt-4">
                    Per esercitare i tuoi diritti, contattaci a: <strong className="text-supercompany-magenta">fdotautorino@gmail.com</strong>. Risponderemo entro 30 giorni.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;