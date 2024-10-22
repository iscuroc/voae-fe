import { usePublishActivityMutation } from "@/api/servicios/actividades";
import { Role } from "@/api/servicios/usuarios";
import useAuth from "@/api/useAuth";
import { Button, Tooltip } from "antd";
import { toast } from "react-toastify";

export const PublishButton = ({
  activityId,
  hasBanner,
}: {
  activityOwnerId: number;
  activityId: number;
  hasBanner: boolean;
}) => {
  const { userRole } = useAuth();

  const [{ loading }, publishActivityMutation] =
    usePublishActivityMutation(activityId);

  const handlePublishActivity = async () => {
    await publishActivityMutation();

    toast.success("Actividad publicada exitosamente");
  };

  const isActoivotyOwnerOrVOAE = userRole === Role.VOAE;

  if (!isActoivotyOwnerOrVOAE) {
    return null;
  }

  return (
    <Tooltip title={!hasBanner ? "La actividad debe tener un banner" : ""}>
      <Button
        variant="solid"
        color="primary"
        onClick={handlePublishActivity}
        disabled={!hasBanner}
        loading={loading}
      >
        {loading ? "Publicando..." : "Publicar"}
      </Button>
    </Tooltip>
  );
};
