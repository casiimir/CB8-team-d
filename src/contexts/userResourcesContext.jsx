import { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const UserResourcesContext = createContext();

export function useUserResources() {
  return useContext(UserResourcesContext);
}

export function UserResourcesProvider({ children }) {
  const [userResources, setUserResources] = useState([]);

  const updateUserResources = async (newResources) => {
    const session = await getSession();
    if (session) {
      const userId = session.user._id;

      // Update state
      setUserResources(newResources);

      // Update database
      const response = await fetch(`/api/userResources?userId=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResources),
      });

      if (!response.ok) {
        console.error("Failed to update userResources in database");
      }
    }
  };

  useEffect(() => {
    const loadUserResources = async () => {
      const session = await getSession();
      if (session) {
        const userId = session.user._id;
        const response = await fetch(`/api/userResources?userId=${userId}`);
        if (response.ok) {
          const resources = await response.json();
          setUserResources(resources.data[0]);
        } else {
          console.error("Failed to load userResources");
        }
      }
    };

    loadUserResources();
  }, []);

  const value = {
    userResources,
    updateUserResources,
  };

  return (
    <UserResourcesContext.Provider value={value}>
      {children}
    </UserResourcesContext.Provider>
  );
}
