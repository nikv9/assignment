import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clrUser } from "../redux/doc_slice";

const Header = () => {
  const docState = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clrUser());
  };
  return (
    <div className="h-16 px-2 flex items-center justify-between shadow-[0_5px_5px_rgba(0,0,0,0.1)] sticky top-0 z-999 bg-[#030c24]">
      <div className="animate-pulse">AllSoft - Document Management System</div>
      {docState.user && (
        <div onClick={logout} className="cursor-pointer">
          Logout
        </div>
      )}
    </div>
  );
};

export default Header;
