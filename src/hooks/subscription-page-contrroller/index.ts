import { subscribeToEvent } from "@/http/api-fake";
import { useRouter } from "next/navigation";
import React from "react";
import z from "zod";
import { useForm } from "../useForm";

const subscriptionSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
});

type SubscriptionSchemaProps = z.infer<typeof subscriptionSchema>;

export function useSubscriptionPageController() {
  const router = useRouter();
  const subscriptionForm = useForm<SubscriptionSchemaProps>(
    {
      name: "",
      email: "",
    },
    subscriptionSchema
  );

  const handleSubmitSubscription = React.useCallback(() => {
    const { subscriberId } = subscribeToEvent();

    router.push(`/invite/${subscriberId}`);
  }, [subscriptionForm]);

  return { subscriptionForm, handleSubmitSubscription };
}
