import { EtiquetasAmbitosActividad } from "@/api/servicios/enums";
import { Member } from "@/api/types/activityBySlug";
import { ProTable } from "@ant-design/pro-components";

export const MembersTable = ({ members }: { members?: Member[] }) => {
  return (
    <ProTable
      headerTitle="Miembros"
      search={false}
      dataSource={members}
      options={false}
      columns={[
        {
          title: "Nombre",
          dataIndex: "names",
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
    />
  );
};
