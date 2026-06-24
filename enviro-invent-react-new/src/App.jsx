import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Challenge from './components/Challenge.jsx'
import Platform from './components/Platform.jsx'
import Mapping from './components/Mapping.jsx'
import Workflow from './components/Workflow.jsx'
import Capabilities from './components/Capabilities.jsx'
import Stakeholders from './components/Stakeholders.jsx'
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
      <Mapping />
      <Workflow />
      <Capabilities />
      <Stakeholders />
      <Compliance />
      <Mission />
      <Cta />
      <Footer />
    </div>
  )
}
