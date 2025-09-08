import { getUserById } from "@/api/services/UserService";
import { useEffect, useState } from "react";

const useGetUserDetail = (userId) => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserDetail = async () => {
    setLoading(true);
    try {
      const response = await getUserById(userId);
      if (response) {
        setUserDetail(response);
      }
    } catch (error) {
      console.error("Error fetching user detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetail();
    }
  }, [userId]);

  return { userDetail, loading };
};

export default useGetUserDetail;
