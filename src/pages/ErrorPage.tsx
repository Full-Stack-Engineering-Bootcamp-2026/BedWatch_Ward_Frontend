import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img
        src="https://c8.alamy.com/comp/2BNBF6E/not-found-concept-404-error-page-design-with-hand-holding-message-vector-background-not-found-page-message-web-site-illustration-2BNBF6E.jpg"
        alt="404 Error"
        className="max-w-md w-full object-contain"
      />

      <Button onClick={() => navigate(-1)} className="mt-6">
        Go Home
      </Button>
    </div>
  );
}

export default ErrorPage;
