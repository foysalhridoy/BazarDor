export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-base-content/70 sm:flex-row">
        <p className="font-medium text-base-content/80">
          বাজার দর, প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="italic text-center sm:text-right">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
    </footer>
  );
}
