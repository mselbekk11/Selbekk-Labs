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
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="name" className="text-xs md:text-sm font-medium">Name</label>
            {errors.name && <span className="text-xs md:text-sm text-red-400/80">{errors.name.message}</span>}
          </div>
          <Input
            id="name"
            placeholder="Your name"
            className={cn(
              "focus-visible:ring-0 focus-visible:border-white text-xs md:text-sm",
              errors.name && "border-red-400/80"
            )}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-xs md:text-sm font-medium">Email</label>
            {errors.email && <span className="text-xs md:text-sm text-red-400/80">{errors.email.message}</span>}
          </div>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={cn(
              "focus-visible:ring-0 focus-visible:border-white text-xs md:text-sm",
              errors.email && "border-red-400/80"
            )}
            {...register("email")}
          />
        </div>
      </div>

      {/* Row 2: Project description */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="project" className="text-xs md:text-sm font-medium">Tell me about your project</label>
          {errors.project && <span className="text-xs md:text-sm text-red-400/80">{errors.project.message}</span>}
        </div>
        <Textarea
          id="project"
          placeholder="Describe your project, goals, and any specific requirements..."
          className={cn(
            "focus-visible:ring-0 focus-visible:border-white min-h-[150px] text-xs md:text-sm",
            errors.project && "border-red-400/80"
          )}
          {...register("project")}
        />
      </div>

      {/* Row 3: Services multi-select */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-xs md:text-sm font-medium">How can I help you?</label>
          {errors.services && <span className="text-xs md:text-sm text-red-400/80">{errors.services.message}</span>}
        </div>
        <div className="flex gap-2">
          {serviceOptions.map((service) => (
            <Button
              key={service}
              type="button"
              variant="outline"
              className={cn(
                "flex-1 focus-visible:ring-0 text-xs md:text-sm",
                selectedServices.includes(service) && "!border-white !bg-white/10",
                errors.services && "border-red-400/80"
              )}
              onClick={() => toggleService(service)}
            >
              {service}
            </Button>
          ))}
        </div>
      </div>

      {/* Row 4: Budget dropdown */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="budget" className="text-xs md:text-sm font-medium">Your Budget</label>
          {errors.budget && <span className="text-xs md:text-sm text-red-400/80">{errors.budget.message}</span>}
        </div>
        <NativeSelect
          id="budget"
          className={cn("w-full [&>select]:text-xs [&>select]:md:text-sm", errors.budget && "[&>select]:border-red-400/80")}
          {...register("budget")}
        >
          <NativeSelectOption value="">Select your budget</NativeSelectOption>
          {budgetOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {/* Row 5: Submit button */}
      <Button
        type="submit"
        variant="labs"
        size="lg"
        className="w-full mt-2 focus-visible:ring-0"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
