'use client'

interface ContainerProps {
    children: React.ReactNode;
}
// eslint-disable-next-line react/function-component-definition, react/prop-types
const Container: React.FC<ContainerProps> = ({ children }) => (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div className="">{children}</div>
    );
 
export default Container;