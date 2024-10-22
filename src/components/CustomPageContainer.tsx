import { PageContainer, PageContainerProps } from "@ant-design/pro-components";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const CustomPageContainer: FC<PageContainerProps> = ({
  children,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <div className="container md:mx-auto p-0 ">
      <PageContainer
        onBack={() => navigate(-1)}
        {...rest}
        contentWidth="Fixed"
        // childrenContentStyle={{ padding: isMobile && 0 }}
        className="sm:p-0 sm:m-0"
        style={{
          ...rest.style,
        }}
        ghost
      >
        {children}
      </PageContainer>
    </div>
  );
};
