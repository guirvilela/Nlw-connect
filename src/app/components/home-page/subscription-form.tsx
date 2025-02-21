"use client";

import { useSubscriptionPageController } from "@/hooks/subscription-page-contrroller";
import { ArrowRight, Mail, User } from "lucide-react";
import { Button } from "../common/buttons";
import {
  InputField,
  InputIcon,
  InputMessageError,
  InputRoot,
} from "../common/input";

export function SubscriptionForm() {
  const { subscriptionForm, handleSubmitSubscription } =
    useSubscriptionPageController();

  return (
    <form
      onSubmit={(e) =>
        subscriptionForm.handleSubmit(handleSubmitSubscription)(e)
      }
      className="bg-gray-700 border border-gray-700 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        Inscrição
      </h2>

      <div className="space-y-3">
        <InputRoot
          error={
            subscriptionForm.validationStarted &&
            !!subscriptionForm.formValid.name
          }
        >
          <InputIcon>
            <User />
          </InputIcon>
          <InputField
            type="text"
            name="name"
            placeholder="Nome completo"
            onChange={(v) => subscriptionForm.set("name")(v.target.value)}
          />
        </InputRoot>
        {subscriptionForm.validationStarted &&
          subscriptionForm.formValid.name && (
            <InputMessageError>
              {subscriptionForm.formValid.name.errorMessage}
            </InputMessageError>
          )}

        <InputRoot
          error={
            subscriptionForm.validationStarted &&
            !!subscriptionForm.formValid.email
          }
        >
          <InputIcon>
            <Mail />
          </InputIcon>
          <InputField
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={(v) => subscriptionForm.set("email")(v.target.value)}
          />
        </InputRoot>
        {subscriptionForm.validationStarted &&
          subscriptionForm.formValid.email && (
            <InputMessageError>
              {subscriptionForm.formValid.email.errorMessage}
            </InputMessageError>
          )}

        <Button type="submit">
          Confirmar
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
