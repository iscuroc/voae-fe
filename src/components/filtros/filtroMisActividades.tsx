import { LightFilter, ProForm, ProFormDatePicker, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";

interface FiltroProps {
  aplicarFiltros: (ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => void;
}

const FiltroMA: React.FC<FiltroProps> = ({ aplicarFiltros }) => {
  const [ form ] = useForm();
  return (
    <LightFilter
      form={form}
      layout="horizontal"
      submitter={{
        render: (_, dom) => <div className="flex justify-center w-full gap-4">{dom}</div>,
        searchConfig: {
          resetText: 'Resetear',
          submitText: 'Filtrar',
        },
      }}
      onFieldsChange={(changedFields: _, allFields) => {
        const ambito = allFields.find(field => field.name[ 0 ] === 'ambito')?.value;
        const fechaInicio = allFields.find(field => field.name[ 0 ] === 'fechaInicio')?.value;
        const fechaFin = allFields.find(field => field.name[ 0 ] === 'fechaFin')?.value;
        const busqueda = allFields.find(field => field.name[ 0 ] === 'busqueda')?.value;
        aplicarFiltros(ambito, fechaInicio, fechaFin, busqueda);
      }}
    >
      <ProForm.Group>
        <ProFormDatePicker
          name="fechaInicio"
          label="Fecha Inicio"
          placeholder="DD-MM-AAAA"
          fieldProps={{
            format: {
              format: 'DD-MM-YYYY',
              type: 'mask',
            },
          }}
        />
        <ProFormDatePicker
          name="fechaFin"
          label="Fecha Fin"
          placeholder="DD-MM-AAAA"

        />
      </ProForm.Group>
      <ProFormSelect
        name="ambito"
        label="Ámbito"
        options={[
          { label: 'Seleccione Ámbito...', value: '' },
          { label: 'Académico', value: 'Academico' },
          { label: 'Cultural', value: 'Cultural' },
          { label: 'Social', value: 'Social' },
          { label: 'Deportivo', value: 'Deportivo' },
        ]}

      />
      <ProFormText
        name="busqueda"
        label="Buscar"
        placeholder="Nombre de actividad"

        lightProps={{
          light: false,
        }}
      />
    </LightFilter>
  );
}

export default FiltroMA;
