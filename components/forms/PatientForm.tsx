"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UsreFormValidation } from "@/lib/validation";

import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SWITCH = "switch",
  Date_PICKER = "datePicker",
  SKELETON = "skeleton",
  PHONE_INPUT = "phoneInput",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UsreFormValidation>>({
    resolver: zodResolver(UsreFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UsreFormValidation>) => {
    console.log("working....");
    setIsLoading(true);
    console.log(values);
    try {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header"> Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="+216 55-555-555"
        />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
