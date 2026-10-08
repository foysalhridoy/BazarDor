import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "সাইন আপ | বাজার দর",
  description: "বাজার দর অ্যাপে নতুন অ্যাকাউন্ট তৈরি করে নিত্যদিনের বাজারদর ট্র্যাক করুন।",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-12 min-h-[75vh]">
      <Suspense
        fallback={
          <div className="skeleton h-96 w-full max-w-md rounded-3xl mx-auto"></div>
        }
      >
        <AuthForm mode="signup" />
      </Suspense>
    </div>
  );
}
