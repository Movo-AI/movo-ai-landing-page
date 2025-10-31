"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { normalizePhoneNumber } from "@/lib/phone";
import { toast } from "sonner";

// RFC 5322 email regex pattern
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const formSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name must be 50 characters or less"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be 50 characters or less"),
    email: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || emailRegex.test(val),
        "Please enter a valid email address"
      ),
    phone: z.string().trim().optional(),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(1000, "Message must be 1000 characters or less"),
  })
  .refine(
    (data) => {
      const hasEmail = data.email && data.email.trim().length > 0;
      const hasPhone = data.phone && data.phone.trim().length > 0;
      return hasEmail || hasPhone;
    },
    {
      message: "At least one of email or phone number is required",
      path: ["email"], // Show error on email field
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function InterestFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      // Normalize phone number to E.164 if present (includes country code)
      let normalizedPhone = values.phone;
      if (normalizedPhone && normalizedPhone.trim()) {
        normalizedPhone = normalizePhoneNumber(normalizedPhone.trim());
      }

      // Prepare payload with backend's expected field names
      const payload: {
        first_name: string;
        last_name: string;
        message: string;
        phone_number?: string;
        email_address?: string;
      } = {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        message: values.message.trim(),
        ...(normalizedPhone && { phone_number: normalizedPhone }),
        ...(values.email?.trim() && { email_address: values.email.trim() }),
      };

      // Get backend URL from environment variable or use deployed URL
      const backendUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://movo-backend-jet.vercel.app";

      const response = await fetch(`${backendUrl}/api/trigger-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData: any = {};

        if (contentType?.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch {
            // If JSON parsing fails, use default error
          }
        }

        // Handle validation errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          // Set field-level errors if provided by server
          // Map backend field names (snake_case) to form field names (camelCase)
          const fieldNameMap: Record<string, keyof FormValues> = {
            first_name: "firstName",
            last_name: "lastName",
            phone_number: "phone",
            email_address: "email",
            message: "message",
          };

          if (errorData.errors) {
            Object.keys(errorData.errors).forEach((backendField) => {
              const formField = fieldNameMap[backendField] || backendField;
              form.setError(formField as keyof FormValues, {
                type: "server",
                message: errorData.errors[backendField],
              });
            });
          } else if (errorData.message) {
            toast.error(
              errorData.message || "Please check your input and try again."
            );
          } else {
            toast.error("Please check your input and try again.");
          }
          return;
        }

        // Handle server errors (5xx)
        if (response.status >= 500) {
          toast.error("Something went wrong—please try again.");
          return;
        }
      }

      // Success
      toast.success("We'll call you shortly at the number you provided.", {
        duration: 5000,
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong—please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const firstNameError = form.formState.errors.firstName;
  const lastNameError = form.formState.errors.lastName;
  const emailError = form.formState.errors.email;
  const phoneError = form.formState.errors.phone;
  const messageError = form.formState.errors.message;
  const rootError = form.formState.errors.root;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EB] to-[#FFFDFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <Link
            href="/"
            className="inline-flex items-center justify-center mb-6 hover:opacity-80 transition-opacity"
          >
            <img
              src="/movo-logo.png"
              alt="Movo logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We'd love to hear from you. Fill out the form below and we'll
            respond as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 animate-fade-in-up animation-delay-200">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="firstName"
                        className="text-gray-900 font-medium"
                      >
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="h-12 border border-gray-200 focus:border-[#FF7A29] focus-visible:border-[#FF7A29] focus:ring-2 focus-visible:ring-2 focus:ring-[#FF7A29]/20 focus-visible:ring-[#FF7A29]/20 focus:ring-offset-0 focus-visible:ring-offset-0"
                          aria-invalid={!!firstNameError}
                          aria-describedby={
                            firstNameError ? "firstName-error" : undefined
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="firstName-error" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="lastName"
                        className="text-gray-900 font-medium"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="h-12 border border-gray-200 focus:border-[#FF7A29] focus-visible:border-[#FF7A29] focus:ring-2 focus-visible:ring-2 focus:ring-[#FF7A29]/20 focus-visible:ring-[#FF7A29]/20 focus:ring-offset-0 focus-visible:ring-offset-0"
                          aria-invalid={!!lastNameError}
                          aria-describedby={
                            lastNameError ? "lastName-error" : undefined
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="lastName-error" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="email"
                        className="text-gray-900 font-medium"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="h-12 border border-gray-200 focus:border-[#FF7A29] focus-visible:border-[#FF7A29] focus:ring-2 focus-visible:ring-2 focus:ring-[#FF7A29]/20 focus-visible:ring-[#FF7A29]/20 focus:ring-offset-0 focus-visible:ring-offset-0"
                          aria-invalid={!!emailError || !!rootError}
                          aria-describedby={
                            emailError || rootError ? "email-error" : undefined
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="email-error" />
                      {rootError && (
                        <p
                          className="text-sm text-destructive mt-1"
                          role="alert"
                          id="email-error"
                        >
                          {rootError.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="phone"
                        className="text-gray-900 font-medium"
                      >
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="h-12 border border-gray-200 focus:border-[#FF7A29] focus-visible:border-[#FF7A29] focus:ring-2 focus-visible:ring-2 focus:ring-[#FF7A29]/20 focus-visible:ring-[#FF7A29]/20 focus:ring-offset-0 focus-visible:ring-offset-0"
                          aria-invalid={!!phoneError}
                          aria-describedby={
                            phoneError ? "phone-error phone-hint" : "phone-hint"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        id="phone-hint"
                        className="text-gray-500 text-xs mt-1"
                      >
                        Include country code, e.g., +1
                      </FormDescription>
                      <FormMessage id="phone-error" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="message"
                      className="text-gray-900 font-medium"
                    >
                      Message <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-32 border border-gray-200 focus:border-[#FF7A29] focus:ring-2 focus:ring-[#FF7A29]/20 focus:ring-offset-0 resize-none"
                        aria-invalid={!!messageError}
                        aria-describedby={
                          messageError
                            ? "message-error message-hint"
                            : "message-hint"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription
                      id="message-hint"
                      className="text-gray-500 text-sm"
                    >
                      {field.value.length}/1000 characters
                    </FormDescription>
                    <FormMessage id="message-error" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#FF7A29] hover:bg-[#E8650F] text-white font-semibold text-base shadow-md transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span
                      className="flex items-center gap-2"
                      aria-live="polite"
                    >
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By submitting this form, you agree to our{" "}
          <Link href="#" className="text-[#FF7A29] hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
