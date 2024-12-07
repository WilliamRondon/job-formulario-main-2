import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { QuotationForm } from "./QuotationForm";

const MobileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a href="#servicos" className="w-full cursor-pointer">
            Serviços
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="#trabalho" className="w-full cursor-pointer">
            Trabalhar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="#contato" className="w-full cursor-pointer">
            Contato
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full justify-start">
                Consulta Gratuita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <QuotationForm />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;