import React from "react";
import { User } from "lucide-react";
import LoadingUserDetail from "@/components/templates/loading/LoadingUserDetail";

const AuthorCard = ({ userDetail, loadingUserDetail }) => {
  if (loadingUserDetail) {
    return <LoadingUserDetail />;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl blur-sm opacity-50" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-indigo-600" />
          <span className="text-gray-800 font-semibold">
            {userDetail?.name || "Anonymous"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;