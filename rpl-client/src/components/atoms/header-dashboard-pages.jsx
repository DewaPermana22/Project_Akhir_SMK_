import React from "react";

const HeaderDashboardPages = ({mainHeader, descriptionText}) => {
  return (
    <div>
      <h1 className="text-gray-600 text-xl font-eudo-bold">
        {mainHeader}
      </h1>
      <p className="text-indigo-600 text-sm">
        {descriptionText}
      </p>
    </div>
  );
};

export default HeaderDashboardPages;
