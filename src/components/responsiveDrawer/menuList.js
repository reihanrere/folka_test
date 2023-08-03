import { GridViewOutlined, PeopleOutline } from "@mui/icons-material";
import routesList from "../../utils/RoutesList";

const MenuList = [
  {
    name: "Dasboard",
    link: routesList.dashboard.root,
    icon: <GridViewOutlined />,
  },
  {
    name: "Users",
    link: routesList.users.root,
    icon: <PeopleOutline />,
  },
];

export default MenuList;
