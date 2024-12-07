import { useState } from "react";
import { FormData, QuotationData, ValidationError } from "@/types/quotation";
import { calculatePrice } from "@/utils/calculatePrice";
import { saveQuotation, sendQuotationEmail } from "@/services/quotationService";
import { useToast } from "@/hooks/use-toast";

export const useQuotationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    numPeople: 1,
    numBedrooms: 1,
    hasYard: "none",
    hasLaundry: "none",
    location: "urban",
    bedConfig: "shared",
    contactPreference: "email",
    fullName: "",
    email: "",
    phone: "",
    checkInTime: "",
    checkOutTime: "",
    additionalInfo: "",
  });

  const [price, setPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const updateFormData = (updates: Partial<FormData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    setPrice(calculatePrice(newData));
    
    // Clear validation errors when user updates the form
    setValidationErrors([]);
  };

  const handleNext = () => {
    if (formData.step < 3) {
      updateFormData({ step: formData.step + 1 });
    }
  };

  const handleBack = () => {
    if (formData.step > 1) {
      updateFormData({ step: formData.step - 1 });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setValidationErrors([]);
      
      const quotationData: QuotationData = {
        additional_info: formData.additionalInfo,
        bed_config: formData.bedConfig,
        check_in_date: formData.checkIn?.toISOString(),
        check_in_time: formData.checkInTime,
        check_out_date: formData.checkOut?.toISOString(),
        check_out_time: formData.checkOutTime,
        contact_preference: formData.contactPreference,
        email: formData.email!,
        full_name: formData.fullName!,
        has_laundry: formData.hasLaundry,
        has_yard: formData.hasYard,
        location: formData.location,
        num_bedrooms: formData.numBedrooms,
        num_people: formData.numPeople,
        phone: formData.phone!,
        quoted_price: price,
      };

      const savedQuotations = await saveQuotation(quotationData);
      if (!savedQuotations || savedQuotations.length === 0) {
        throw new Error("Failed to save quotation");
      }

      const savedQuotation = savedQuotations[0];
      await sendQuotationEmail(savedQuotation.id);

      toast({
        title: "Cotação enviada!",
        description: "Entraremos em contato em breve.",
      });

      // Reset form
      setFormData({
        step: 1,
        numPeople: 1,
        numBedrooms: 1,
        hasYard: "none",
        hasLaundry: "none",
        location: "urban",
        bedConfig: "shared",
        contactPreference: "email",
        fullName: "",
        email: "",
        phone: "",
        checkInTime: "",
        checkOutTime: "",
        additionalInfo: "",
      });
      setPrice(0);
    } catch (error: any) {
      console.error("Error submitting quotation:", error);
      
      if (error.errors) {
        setValidationErrors(error.errors);
        error.errors.forEach((err: ValidationError) => {
          toast({
            title: "Erro de validação",
            description: err.message,
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: "Erro ao enviar cotação",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    price,
    isSubmitting,
    validationErrors,
    updateFormData,
    handleNext,
    handleBack,
    handleSubmit,
  };
};