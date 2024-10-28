"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

const updateProfileForm = z.object({
  officeName: z.string().min(1),
  oabNumber: z.number().min(0),
});

type UpdateProfileForm = z.infer<typeof updateProfileForm>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileForm),
  });

  const router = useRouter();

  const handleUpdateProfile = async (data: UpdateProfileForm) => {
    console.log(data);

    router.push("/process");
  };

  console.log(errors);

  return (
    <div className="grid grid-cols-1 bg-background text-foreground md:grid-cols-2">
      <div className="relative h-screen">
        <Image
          src="/profile.jpg"
          className="h-full w-full object-cover"
          alt="Profile picture"
          fill
        />
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="m-8 flex w-96 flex-col space-y-4"
        >
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-3xl font-bold">Adicione Informações</h1>
            <p className="mb-6 text-lg font-medium text-muted-foreground">
              Insira os detalhes abaixo para habilitar todos os recursos.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Nome do escritório *</Label>
            <Input {...register("officeName")} />
          </div>
          <div className="space-y-2">
            <Label>Número OAB *</Label>
            <Input
              {...register("oabNumber", {
                valueAsNumber: true,
              })}
            />
          </div>
          <Button variant="default" disabled={isSubmitting}>
            Adicionar
          </Button>
          <p className="text-sm">* Campo obrigatório</p>
        </form>
      </div>
    </div>
  );
}
