import { useParams } from "react-router-dom";
import { ProfileContent } from "./ProfileContent";
import withRoot from "../../hocs/withRoot";

const Profile = () => {
  const { id } = useParams();

  return <ProfileContent profileId={Number(id)}></ProfileContent>;
};

export const ProfilePage = withRoot(Profile);
