import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";
import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface QuotationStepTwoProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export function QuotationStepTwo({
  formData,
  updateFormData,
  handleNext,
  handleBack,
}: QuotationStepTwoProps) {
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const getDurationInDays = () => {
    if (formData.checkIn && formData.checkOut) {
      const days = differenceInDays(formData.checkOut, formData.checkIn);
      return days > 0 ? days : 0;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Data de check-in</Label>
            <div className="relative">
              <Input
                type="text"
                value={formData.checkIn ? format(formData.checkIn, "dd/MM/yyyy", { locale: ptBR }) : ""}
                onClick={() => setShowCheckInCalendar(true)}
                readOnly
                placeholder="Selecione a data"
              />
              {showCheckInCalendar && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.checkIn}
                    onSelect={(date) => {
                      updateFormData({ checkIn: date });
                      setShowCheckInCalendar(false);
                    }}
                    disabled={(date) =>
                      date < new Date() || (formData.checkOut ? date >= formData.checkOut : false)
                    }
                  />
                </div>
              )}
            </div>
            <Input
              type="time"
              value={formData.checkInTime || ""}
              onChange={(e) => updateFormData({ checkInTime: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <Label>Data de check-out</Label>
            <div className="relative">
              <Input
                type="text"
                value={formData.checkOut ? format(formData.checkOut, "dd/MM/yyyy", { locale: ptBR }) : ""}
                onClick={() => setShowCheckOutCalendar(true)}
                readOnly
                placeholder="Selecione a data"
              />
              {showCheckOutCalendar && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.checkOut}
                    onSelect={(date) => {
                      updateFormData({ checkOut: date });
                      setShowCheckOutCalendar(false);
                    }}
                    disabled={(date) =>
                      formData.checkIn ? date <= formData.checkIn : date <= new Date()
                    }
                  />
                </div>
              )}
            </div>
            <Input
              type="time"
              value={formData.checkOutTime || ""}
              onChange={(e) => updateFormData({ checkOutTime: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        {formData.checkIn && formData.checkOut && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">
              Duração da estadia: {getDurationInDays()} dias
            </p>
          </div>
        )}

        <div>
          <Label>Localização</Label>
          <RadioGroup
            value={formData.location}
            onValueChange={(value: "urban" | "rural") =>
              updateFormData({ location: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urban" id="urban" />
              <Label htmlFor="urban">Área urbana</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rural" id="rural" />
              <Label htmlFor="rural">Área rural</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Quintal</Label>
          <RadioGroup
            value={formData.hasYard}
            onValueChange={(value: "none" | "small" | "large") =>
              updateFormData({ hasYard: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="no-yard" />
              <Label htmlFor="no-yard">Sem quintal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small-yard" />
              <Label htmlFor="small-yard">Quintal pequeno</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large-yard" />
              <Label htmlFor="large-yard">Quintal grande</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Área de serviço</Label>
          <RadioGroup
            value={formData.hasLaundry}
            onValueChange={(value: "none" | "compact" | "spacious") =>
              updateFormData({ hasLaundry: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="no-laundry" />
              <Label htmlFor="no-laundry">Sem área de serviço</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="compact-laundry" />
              <Label htmlFor="compact-laundry">Área compacta</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spacious" id="spacious-laundry" />
              <Label htmlFor="spacious-laundry">Área espaçosa</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Próximo</Button>
      </div>
    </div>
  );
}