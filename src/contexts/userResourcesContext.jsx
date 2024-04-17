import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserResourcesContext = createContext();

export function useUserResources() {
  return useContext(UserResourcesContext);
}

export function UserResourcesProvider({ children }) {
  const [userResources, setUserResources] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadUserResources = async () => {
      if (status === "authenticated") {
        const userId = session.user._id;
        try {
          const response = await fetch(`/api/userResources?userId=${userId}`);
          if (response.ok) {
            const resources = await response.json();
            setUserResources(resources.data[0]);
          } else {
            console.error("Failed to load userResources");
          }
        } catch (error) {
          console.error("Error when loading userResources", error);
        }
      }
    };

    if (status !== "loading") {
      loadUserResources();
    }
  }, [status, session]);

  const updateUserResources = async (newResources) => {
    if (status === "authenticated") {
      const userId = session.user._id;

      setUserResources(newResources);

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
