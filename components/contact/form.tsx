"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const serviceOptions = ["Application", "Website", "Ecommerce"] as const;
type ServiceOption = (typeof serviceOptions)[number];

const budgetOptions = [
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-20000", label: "$10,000 - $20,000" },
  { value: "20000+", label: "$20,000+" },
] as const;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  project: z.string().min(1, "Please tell me about your project"),
  services: z
    .array(z.enum(serviceOptions))
    .min(1, "Please select at least one service"),
  budget: z.string().min(1, "Please select your budget"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceOption[]>([]);

  const submitForm = useMutation(api.contactForm.submit);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      services: [],
      budget: "",
    },
  });

  const toggleService = (service: ServiceOption) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(newServices);
    setValue("services", newServices, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    try {
      await submitForm({
        name: data.name,
        email: data.email,
        project: data.project,
        services: data.services,
        budget: data.budget,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-xl font-medium mb-2">Thank you for your interest</h1>
        <p className="text-gray-400 text-sm">
          I will review your inquiry and respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Row 1: Name and Email side by side */}
      <div className="grid grid-cols-2 gap-3">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>
      </div>

      {/* Row 2: Project description */}
      <Field data-invalid={!!errors.project}>
        <FieldLabel htmlFor="project">Tell me about your project</FieldLabel>
        <Textarea
          id="project"
          placeholder="Describe your project, goals, and any specific requirements..."
          rows={4}
          {...register("project")}
          aria-invalid={!!errors.project}
        />
        <FieldError>{errors.project?.message}</FieldError>
      </Field>

      {/* Row 3: Services multi-select */}
      <FieldGroup>
        <Field data-invalid={!!errors.services}>
          <FieldLabel>How can I help you?</FieldLabel>
          <div className="flex gap-2">
            {serviceOptions.map((service) => (
              <Button
                key={service}
                type="button"
                variant={selectedServices.includes(service) ? "labs" : "outline"}
                className={cn(
                  "flex-1 transition-all",
                  selectedServices.includes(service) &&
                    "bg-white text-black"
                )}
                onClick={() => toggleService(service)}
              >
                {service}
              </Button>
            ))}
          </div>
          <FieldError>{errors.services?.message}</FieldError>
        </Field>
      </FieldGroup>

      {/* Row 4: Budget dropdown */}
      <Field data-invalid={!!errors.budget}>
        <FieldLabel htmlFor="budget">Your Budget</FieldLabel>
        <NativeSelect
          id="budget"
          className="w-full"
          {...register("budget")}
          aria-invalid={!!errors.budget}
        >
          <NativeSelectOption value="">Select your budget</NativeSelectOption>
          {budgetOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <FieldError>{errors.budget?.message}</FieldError>
      </Field>

      {/* Row 5: Submit button */}
      <Button
        type="submit"
        variant="labs"
        size="lg"
        className="w-full mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
