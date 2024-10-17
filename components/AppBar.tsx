"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const AppBar = () => {
  const session = useSession();
  console.log("Session Data:", session);
  return (
    <div>
      <div className="flex justify-between">
        <div>E-api</div>
        <div>
          {session.data?.user && (
            <Button onClick={() => signOut()}>SignOut</Button>
          )}
          {!session.data?.user && (
            <Button onClick={() => signIn()}>SignIn</Button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default AppBar;
