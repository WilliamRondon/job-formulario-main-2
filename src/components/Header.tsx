import React from "react";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { QuotationForm } from "./QuotationForm";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white">
      <h1 className="text-xl font-bold text-primary">Sites Seguros</h1>
      
      {isMobile ? (
        <MobileMenu />
      ) : (
        <nav className="flex items-center gap-6">
          <a href="#servicos" className="text-gray-600 hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#trabalho" className="text-gray-600 hover:text-primary transition-colors">
            Trabalhar
          </a>
          <a href="#contato" className="text-gray-600 hover:text-primary transition-colors">
            Contato
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Consulta Gratuita</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <QuotationForm />
            </DialogContent>
          </Dialog>
        </nav>
      )}
    </header>
  );
};

export default Header;