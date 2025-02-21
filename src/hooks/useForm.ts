import React from "react";
import { ZodSchema } from "zod";

// 🔹 Função para comparar objetos (não mutável)
export function isEqual<T extends object>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// 🔹 Tipagem do resultado da validação
export interface ValidationResult<T> {
  name: keyof T;
  isValid: boolean;
  message: string;
}

// 🔹 Tipagem do formulário
export interface Form<T> {
  value: T;
  set: (f: keyof T, options?: FormSetterOptions) => (v: T[keyof T]) => void;
  setAll: (v: Partial<T>, options?: FormSetterOptions) => void;
  reset: (ignores?: (keyof T)[], value?: Partial<T>) => void;
  formValid: Record<keyof T, { isValid: boolean; errorMessage: string | null }>; // Atualizado aqui
  isValid: boolean;
  hasChanges: boolean;
  count(compare?: (key: keyof T) => boolean): number;
  pristine(key?: keyof T | (keyof T)[] | ((a: T, b: T) => boolean)): boolean;
  markNoChanges(): void;
  validationStarted: boolean;
  handleSubmit: (
    callback: (data: T) => void
  ) => (event: React.FormEvent) => void;
}

// 🔹 Opções para `set`
interface FormSetterOptions {
  noMarkChange?: boolean;
}

// 🔹 Hook `useForm` atualizado com Zod
export function useForm<T extends object>(
  initial: T,
  schema?: ZodSchema<T>
): Form<T> {
  const [form, setForm] = React.useState<T>(initial);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [formValid, setFormValid] = React.useState<
    Record<keyof T, { isValid: boolean; errorMessage: string | null }>
  >({} as Record<keyof T, { isValid: boolean; errorMessage: string | null }>);
  const [validationStarted, setValidationStarted] = React.useState(false); // Adicionando o estado para controle da validação

  // 🔹 Validação automática ao modificar o `form`
  React.useEffect(() => {
    if (schema) {
      const result = schema.safeParse(form);
      if (!result.success) {
        const errors: Record<
          keyof T,
          { isValid: boolean; errorMessage: string | null }
        > = {} as Record<
          keyof T,
          { isValid: boolean; errorMessage: string | null }
        >;
        result.error.issues.forEach((issue) => {
          errors[issue.path[0] as keyof T] = {
            isValid: false,
            errorMessage: issue.message,
          };
        });
        setFormValid(errors);
      } else {
        // Se for válido, limpa a mensagem de erro
        setFormValid(
          {} as Record<
            keyof T,
            { isValid: boolean; errorMessage: string | null }
          >
        );
      }
    }
  }, [form, schema]);

  // 🔹 Verifica se o formulário é válido
  const isValid = React.useMemo(
    () => Object.values(formValid).every((error) => !error),
    [formValid]
  );

  // 🔹 Atualiza um campo do formulário
  function set(field: keyof T, options?: FormSetterOptions) {
    return (value: T[keyof T]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (!options?.noMarkChange) {
        setHasChanges(true);
      }
    };
  }

  // 🔹 Atualiza múltiplos campos do formulário
  function setAll(value: Partial<T>, options?: FormSetterOptions) {
    setForm((prev) => ({ ...prev, ...value }));
    if (!options?.noMarkChange) {
      setHasChanges(true);
    }
  }

  // 🔹 Reseta o formulário (com opção de ignorar campos)
  function reset(ignores?: (keyof T)[], value?: Partial<T>) {
    setForm((prev) => {
      const newForm = { ...initial, ...value };
      if (ignores) {
        ignores.forEach((key) => {
          newForm[key] = prev[key];
        });
      }
      return newForm;
    });
    setHasChanges(false);
  }

  // 🔹 Conta quantos campos foram alterados
  function count(compare?: (key: keyof T) => boolean) {
    return (Object.keys(form) as (keyof T)[]).filter((key) =>
      compare ? compare(key) : form[key] !== initial[key]
    ).length;
  }

  // 🔹 Verifica se o formulário está sem alterações
  function pristine(key?: keyof T | (keyof T)[] | ((a: T, b: T) => boolean)) {
    if (Array.isArray(key)) {
      return key.every((k) => form[k] === initial[k]);
    }
    if (typeof key === "function") {
      return key(initial, form);
    }
    if (key) {
      return form[key] === initial[key];
    }
    return isEqual(form, initial);
  }

  function markNoChanges() {
    setHasChanges(false);
  }

  function handleSubmit(callback: (data: T) => void) {
    return (event: React.FormEvent) => {
      setValidationStarted(true);
      event.preventDefault();
      if (isValid) {
        setValidationStarted(false);

        callback(form);
      } else {
        console.log("Formulário inválido!");
      }
    };
  }

  return {
    value: form,
    set,
    setAll,
    reset,
    formValid,
    isValid,
    hasChanges,
    count,
    pristine,
    markNoChanges,
    validationStarted,
    handleSubmit,
  };
}
