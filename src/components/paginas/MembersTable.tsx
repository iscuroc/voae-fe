import { EtiquetasAmbitosActividad } from "@/api/servicios/enums";
import { Member } from "@/api/types/activityBySlug";
import { ProTable } from "@ant-design/pro-components";

export const MembersTable = ({
  members,
  loading,
}: {
  members?: Member[];
  loading?: boolean;
}) => {
  return (
    <ProTable
      headerTitle="Miembros"
      search={false}
      dataSource={members}
      options={false}
      ghost
      loading={loading}
      columns={[
        {
          title: "Nombre",
          dataIndex: "names",
          ellipsis: true,
          renderText: (_text, obj) => `${obj.names} ${obj.lastnames}`,
        },
        {
          title: "Número de cuenta",
          dataIndex: "account",
        },
        {
          title: "Carrera",
          dataIndex: "career",
        },
        {
          title: "Ámbitos",
          dataIndex: "scopes",
          render: (_, record) =>
            record.scopes?.map((a) => EtiquetasAmbitosActividad[a]).join(", "),
        },
      ]}
      rowKey="id"
      size="small"
    />
  );
};
