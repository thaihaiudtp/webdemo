
import { getServerSession } from "next-auth";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  const session = await getServerSession();
  return <Navbar session={session} />;
}
