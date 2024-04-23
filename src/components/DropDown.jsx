import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DropList() {
  const { userEmail, SignOut } = useContext(AuthContext);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered text-slate-800">
          Email:{" "}
          <span className="text-sm font-semibold text-slate-700">
            {userEmail}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={SignOut}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

// shortcut="⌘⇧D"
