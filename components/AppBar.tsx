"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const AppBar = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div>E-api</div>
        <div>
          <Button onClick={() => console.log("Button clicked!")}>SignIn</Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default AppBar;
