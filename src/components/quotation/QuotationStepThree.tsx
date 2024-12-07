import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "./types";

interface QuotationStepThreeProps {
  formData: FormData;
  price: number;
  updateFormData: (updates: Partial<FormData>) => void;
  handleBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function QuotationStepThree({
  formData,
  price,
  updateFormData,
  handleBack,
  onSubmit,
  isSubmitting,
}: QuotationStepThreeProps) {
  const isValid = formData.additionalInfo?.length >= 10;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Valor da Cotação</h2>
        <p className="text-4xl font-bold text-primary">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Informações Adicionais</Label>
          <Textarea
            placeholder="Digite aqui informações adicionais..."
            value={formData.additionalInfo || ""}
            onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Preferência de Contato</Label>
          <RadioGroup
            value={formData.contactPreference}
            onValueChange={(value: "email" | "whatsapp") =>
              updateFormData({ contactPreference: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="whatsapp" />
              <Label htmlFor="whatsapp">WhatsApp</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
          Voltar
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Finalizar"}
        </Button>
      </div>
    </div>
  );
}