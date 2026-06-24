import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Challenge from './components/Challenge.jsx'
import Platform from './components/Platform.jsx'
import SectionDivider from './components/SectionDivider.jsx'
import ProductShowcase from './components/ProductShowcase.jsx'
import Mapping from './components/Mapping.jsx'
import Workflow from './components/Workflow.jsx'
import Capabilities from './components/Capabilities.jsx'
import Stakeholders from './components/Stakeholders.jsx'
import ScreenshotStrip from './components/ScreenshotStrip.jsx'
import Compliance from './components/Compliance.jsx'
import Mission from './components/Mission.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="bg-paper text-ink font-body">
      <Nav />
      <Hero />
      <Challenge />
      <Platform />
      <SectionDivider fromLabel="Platform" toLabel="Product" />
      <ProductShowcase />
      <Mapping />
      <Workflow />
      <Capabilities />
      <Stakeholders />
      <ScreenshotStrip />
      <Compliance />
      <Mission />
      <Cta />
      <Footer />
    </div>
  )
}
