interface CounterBlockProps {
  title: string;
  value: number;
  subtitle: string;
  variant?: "default" | "large";
}

const CounterBlock = ({  
  title,  
  value,  
  subtitle,  
  variant = "default"
}: CounterBlockProps) => {
  const sizeClasses = variant === "large" ? "p-8 border-2" : "p-6 border";
  const valueClasses = variant === "large" ? "counter-large" : "counter-medium";
  
  // 🎯 CLASSI OMBRA CORRETTE
  const shadowClass = variant === "large" ? "text-shadow-green" : "text-shadow-none";
  const textColorClass = variant === "large" ? "text-green" : "text-magenta";
  
  // FORMATTAZIONE EURO ITALIANA
  const formattedValue = new Intl.NumberFormat('it-IT', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
  
  return (
    <div className={`${sizeClasses} border-supercompany-dark-gray bg-muted/30 rounded-sm`}>
      <div className="text-center">
        <h3 className="font-pixel text-sm text-right-color mb-4 uppercase tracking-wide">
          {title}
        </h3>
        {/* 🎯 APPLICA LE CLASSI CORRETTE */}
        <div className={`${valueClasses} ${shadowClass} ${textColorClass} mb-4`}>
          {formattedValue}
        </div>
        <p className="text-sm font-mono text-right-color" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
};

export default CounterBlock;