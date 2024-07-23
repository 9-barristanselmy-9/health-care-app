import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto"></section>
      <div className="sub-container maw-w-[496px]">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="logo image"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
        />
        <PatientForm />
        <div className="text-14-regular">
        © 2024 CarePluse 
        </div>
      </div>
    </div>
  );
}
