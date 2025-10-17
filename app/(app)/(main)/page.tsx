"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

function Home() {
  const handleSubmit = () => {
    toast.success("Button Clicked");
  };

  return <div className="">Home</div>;
}

export default Home;
