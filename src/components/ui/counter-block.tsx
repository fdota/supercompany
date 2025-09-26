interface CounterBlockProps {
  title: string;
  value: string;
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
  const valueClasses = variant === "large" ? "text-6xl" : "text-4xl";
  
  return (
    <div className={`${sizeClasses} border-supercompany-dark-gray bg-muted/30 rounded-sm`}>
      <div className="text-center">
        <h3 className="font-pixel text-sm text-right-color mb-4 uppercase tracking-wide">
          {title}
        </h3>
        <div className={`font-pixel ${valueClasses} ${variant === "large" ? 'text-green' : 'text-magenta'} mb-4`}>
          {value}
        </div>
        <p className="text-sm font-mono text-right-color" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
};

export default CounterBlock;