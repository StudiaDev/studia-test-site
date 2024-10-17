/**
 * Header Component
 * 
 * Header section of the application.
 * It displays a logo image at the top of the page.
 * 
 * @component
 * @returns {JSX.Element} A div containing the header logo
 * 
 * @example
 * import Header from '@/components/header'
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       Rest of your app
 *     </div>
 *   )
 * }
 */

export default function Header() {
    return (
      <div className="header-wrapper">
        <img className="elements" src="/images/test-site-header-img.svg" alt="Logo" />
      </div>
    )
  }