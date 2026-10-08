import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "সাইন ইন | বাজার দর",
  description: "বাজার দর অ্যাকাউন্টে সাইন ইন করে বিস্তারিত দাম ও বাজার তুলনা দেখুন।",
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-12 min-h-[75vh]">
      <Suspense
        fallback={
          <div className="skeleton h-96 w-full max-w-md rounded-3xl mx-auto"></div>
        }
      >
        <AuthForm mode="signin" />
      </Suspense>
    </div>
  );
}
