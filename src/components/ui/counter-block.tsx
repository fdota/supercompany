interface CounterBlockProps {
  title: string;
  value: string;
  subtitle: string;
  variant?: "default" | "large";
  colorScheme?: "magenta" | "green";
}

const CounterBlock = ({ 
  title, 
  value, 
  subtitle, 
  variant = "default",
  colorScheme = "magenta" 
}: CounterBlockProps) => {
  const sizeClasses = variant === "large" 
    ? "p-8 border-2" 
    : "p-6 border";
    
  const valueClasses = variant === "large" 
    ? "text-6xl font-pixel" 
    : "text-4xl font-pixel";
    
  const colorClasses = colorScheme === "green" 
    ? "text-green" 
    : "text-magenta";

  return (
    <div className={`${sizeClasses} border-supercompany-dark-gray bg-muted/30 rounded-sm`}>
      <div className="text-center">
        <h3 className="text-sm font-mono text-right-color mb-4 uppercase tracking-wide">
          {title}
        </h3>
        <div className={`${valueClasses} ${colorClasses} mb-4`}>
          {value}
        </div>
        <p className="text-sm font-mono text-right-color" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
};

export default CounterBlock;