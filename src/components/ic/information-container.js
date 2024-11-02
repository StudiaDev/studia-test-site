/**
 * InformationContainer Component
 * 
 * A reusable component for displaying information in a structured container.
 * It consists of a header with a title and a content area for a child component.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.title - The title to be displayed in the header of the container
 * @param {React.ReactNode} props.children - The content to be rendered inside the container
 * 
 * @returns {JSX.Element} A styled container with a header and content area
 * 
 * @example
 * <InformationContainer title="User Details">
 *   <p>Name: John Doe</p>
 *   <p>Email: john@example.com</p>
 * </InformationContainer>
 */

export default function InformationContainer({ title, children }) {
  return (
    <div className="information-container">
      <InformationContainerHeader title={title} />
      <InformationContainerContent>{children}</InformationContainerContent>
    </div>
  );
}
  
/* check on this if any issues ever arise (no styling on div) */
function InformationContainerContent({ children }) {
    return (
      <div>
        {children}
      </div>
    )
  }
  
function InformationContainerHeader({ title }) {
    return (
      <div className="information-container-header">
        <p className="information-container-header-text">{title}</p>
      </div>
    )
  }