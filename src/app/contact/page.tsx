import { Suspense } from "react";
import InquiryPage from "./InquiryPage";

export default function ContactPage() {
return (
    <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
    </div>
    }>
    <InquiryPage />
    </Suspense>
);
}
