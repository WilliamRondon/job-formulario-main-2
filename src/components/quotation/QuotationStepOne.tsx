import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FormData } from "./types";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { validateEmail, validatePhone, formatPhone } from "@/services/quotationService";

interface QuotationStepOneProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  handleNext: () => void;
}

export function QuotationStepOne({ formData, updateFormData, handleNext }: QuotationStepOneProps) {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);

  const isFormFilled =
    formData.fullName?.length >= 3 &&
    formData.email?.length >= 5 &&
    formData.phone?.length >= 8;

  const checkDuplicates = async () => {
    if (!isFormFilled) return;

    setIsValidating(true);
    try {
      // Validate email format
      if (!validateEmail(formData.email!)) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Por favor, insira um email válido.",
        });
        return;
      }

      // Validate phone format
      const formattedPhone = formatPhone(formData.phone!);
      if (!validatePhone(formattedPhone)) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Por favor, insira um telefone no formato: +55 (XX) XXXXXXXXX",
        });
        return;
      }

      // Check for duplicate email
      const { data: emailData, error: emailError } = await supabase
        .from("quotations")
        .select("email")
        .eq("email", formData.email);

      if (emailError) {
        console.error("Error checking email duplicates:", emailError);
        throw emailError;
      }

      if (emailData && emailData.length > 0) {
        toast({
          variant: "destructive",
          title: "Email já cadastrado",
          description: "Este email já está cadastrado em nossa base de dados.",
        });
        return;
      }

      // Check for duplicate phone
      const { data: phoneData, error: phoneError } = await supabase
        .from("quotations")
        .select("phone")
        .eq("phone", formattedPhone);

      if (phoneError) {
        console.error("Error checking phone duplicates:", phoneError);
        throw phoneError;
      }

      if (phoneData && phoneData.length > 0) {
        toast({
          variant: "destructive",
          title: "Telefone já cadastrado",
          description: "Este telefone já está cadastrado em nossa base de dados.",
        });
        return;
      }

      // If we get here, there are no duplicates, proceed to next step
      handleNext();
    } catch (error) {
      console.error("Error validating form:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao validar seus dados. Por favor, tente novamente.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Nome Completo</Label>
          <Input
            placeholder="Seu nome completo"
            value={formData.fullName || ""}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={formData.email || ""}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Telefone/WhatsApp</Label>
          <Input
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.phone || ""}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Número de pessoas</Label>
          <Input
            type="number"
            min="1"
            value={formData.numPeople}
            onChange={(e) =>
              updateFormData({ numPeople: parseInt(e.target.value) })
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label>Número de quartos</Label>
          <Input
            type="number"
            min="1"
            value={formData.numBedrooms}
            onChange={(e) =>
              updateFormData({ numBedrooms: parseInt(e.target.value) })
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label>Configuração das camas</Label>
          <RadioGroup
            value={formData.bedConfig}
            onValueChange={(value: "separate" | "shared") =>
              updateFormData({ bedConfig: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="separate" id="separate" />
              <Label htmlFor="separate">Camas separadas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shared" id="shared" />
              <Label htmlFor="shared">Camas compartilhadas</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={checkDuplicates} 
          disabled={!isFormFilled || isValidating}
        >
          {isValidating ? "Validando..." : "Próximo"}
        </Button>
      </div>
    </div>
  );
}