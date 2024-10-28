import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProcesses: { process_id: string; title: string }[];
}

import { Badge } from "@/components/ui/badge";

export default function SyncModal({
  isOpen,
  onClose,
  selectedProcesses,
}: SyncModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sincronizando Processos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">
              Processos sendo sincronizados:
            </h3>
            <ul className="list-inside list-disc">
              {selectedProcesses.map((process, index) => (
                <li key={index} className="">
                  <span className="font-medium">{process.title}</span>
                  <Badge variant="secondary" className="ml-2">
                    {process.process_id}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
