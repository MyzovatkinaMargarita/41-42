import { Outlet } from "react-router-dom";
import { StoreProvider } from "../store/StoreProvider";

export default function AppLayout() {
  return (
    <StoreProvider>
      <Outlet />
    </StoreProvider>
  );
}


