"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JoinDiscussionForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    contributionType: "",
    privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.contributionType || !formData.privacy) {
      alert("Per favore, compila tutti i campi obbligatori e accetta la privacy policy.");
      return;
    }
    
    alert("Grazie per il tuo interesse! I tuoi dati sono stati registrati.");
    
    setFormData({
      name: "",
      email: "",
      contributionType: "",
      privacy: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contributionType: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg border">
      <h1 className="text-2xl font-bold text-center">UNISCITI ALLA DISCUSSIONE</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">
              Nome *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contributionType" className="font-semibold">
            Tipo di contributo *
          </Label>
          <Select value={formData.contributionType} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleziona ..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interesse-economico">Interesse economico futuro</SelectItem>
              <SelectItem value="competenze-tempo">Competenze e tempo</SelectItem>
              <SelectItem value="entrambi">Entrambi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            checked={formData.privacy}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300"
            required
          />
          <Label htmlFor="privacy" className="text-sm">
            Acconsento al trattamento dei dati personali secondo la Privacy Policy
          </Label>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Manifesta interesse
        </Button>
      </form>
    </div>
  );
}