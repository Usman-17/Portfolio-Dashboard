import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>HomePage new</div>
      <Link to={"/login"}>
        <Button>login</Button>
      </Link>
    </>
  );
};

export default HomePage;
