"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
        //add finally block
      }
    };
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-lg mb-4">
          These are the registered users in the app
        </div>

        <hr className="w-48 h-1 mx-auto my-4 bg-blue-200 border-0 rounded md:my-4 dark:bg-gray-700" />
        <h2 className="text-xl font-bold">Users</h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="space-y-6">
            {users.map((user) => (
              <div key={user.id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
