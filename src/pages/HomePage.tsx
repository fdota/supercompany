import SplitLayout from "@/components/layout/SplitLayout";
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contributionType: "",
    amount: "",
    hours: "",
    expertise: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const leftContent = (
    <div className="flex flex-col justify-center h-full">
      <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
        <TypewriterText text="Apriamo un'azienda Insieme?" />
      </h1>
      <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
        Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
      </h2>
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
        <p>Ciao a tutti, mi chiamo Fabio...</p>
        {/* ... Il resto del tuo testo rimane qui ... */}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full">
      {/* Contatori */}
      <div className="mb-12">
        {/* ... Il codice dei contatori rimane qui ... */}
      </div>

      {/* Form