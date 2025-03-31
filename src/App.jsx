import { useState, useEffect } from 'react'
import Logo from './assets/logo.png'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import espartacto from './assets/espartaco.svg'
import tepoztlan from './assets/tepoztlan.svg'
import defaultCafe from './assets/default.svg'

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function BranchMap({ branches, activeBranch }) {
  
  const defaultIcon = new L.Icon({
    iconUrl: defaultCafe, // O importa un icono genérico
    iconSize: [30, 30]
  });

  const branchIcons = {
    1: new L.Icon({
      iconUrl: espartacto,
      iconSize: [30, 30]
    }),
    2: new L.Icon({
      iconUrl: tepoztlan,
      iconSize: [30, 30]
    })
  };

  // Encuentra la sucursal activa
  const activeBranchData = branches.find(branch => branch.id === activeBranch);

  return (
    <MapContainer 
      center={[activeBranchData.lat, activeBranchData.lng]} 
      zoom={15} 
      style={{ height: '400px', width: '100%' }}
      key={activeBranch} // Esto fuerza un remontaje cuando cambia la sucursal
    >
      <ChangeMapView center={[activeBranchData.lat, activeBranchData.lng]} zoom={15} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {branches.map(branch => (
        <Marker 
          key={branch.id} 
          position={[branch.lat, branch.lng]} 
          icon={branchIcons[branch.id] || defaultIcon}
        >
          <Popup>{branch.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function App() {
  const [activeBranch, setActiveBranch] = useState(1); // Estado para la sucursal seleccionada
  const [activeNavItem, setActiveNavItem] = useState("Sucursales"); // Estado para el ítem de navegación activo
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const branchesData = [
    { 
      id: 1, 
      name: "La Fugitiva Eje Central", 
      lat: 19.372926592060466,
      lng: -99.1492081699916,
      description: "[breve descripción apelando a lo emocional]",
      address: "Eje Central Lázaro Cárdenas 305-Local F, Portales Nte, Benito Juárez, 03303 Ciudad de México, CDMX",
      icon: espartacto
    },
    { 
      id: 2, 
      name: "La Fugitiva Narvarte", 
      lat: 19.402568517556286, 
      lng: -99.15555958533386,
      description: "[breve descripción apelando a lo emocional]",
      address: "Anaxágoras 236, Narvarte Poniente, Benito Juárez, 03020 Ciudad de México, CDMX",
      icon: tepoztlan
    },
    { 
      id: 3, 
      name: "La Fugitiva: Baguette & Café", 
      lat: 19.32116869157236, 
      lng: -99.12294401458979,
      description: "[breve descripción apelando a lo emocional]",
      address: "C. 4 79, Coapa, Espartaco, Coyoacán, 04870 Ciudad de México, CDMX",
      icon: defaultCafe
    },
    { 
      id: 4, 
      name: "La Fugitiva: Baguette & Café", 
      lat: 19.31566083014628, 
      lng: -99.1274072103907,
      description: "[breve descripción apelando a lo emocional]",
      address: "Benito Juárez 117 1-local B, Coapa, Ex-Hacienda Coapa, Coyoacán, 04870 Ciudad de México, CDMX",
      icon: defaultCafe
    },
    { 
      id: 5, 
      name: "La Fugitiva: Baguette & Café", 
      lat: 19.308694739628727, 
      lng: -99.1241456442285,
      description: "[breve descripción apelando a lo emocional]",
      address: "Calz. De Guadalupe 37, Coapa, Ex-Hacienda Coapa, Tlalpan, 14310 Ciudad de México, CDMX",
      icon: defaultCafe
    }
  ];

  const selectedBranch = branchesData.find(branch => branch.id === activeBranch);

  return (
    <>
      <header id='main-header'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} id='logo' alt="Logo"/>
          <h2 className="page-title">{activeNavItem}</h2>
        </div>
        <nav className='desktop-nav'>
          <ul id='nav-menu'>
            <li className={activeNavItem === "Inicio" ? "active" : ""}><a href="#">Inicio</a></li>
            <li className={activeNavItem === "Menú" ? "active" : ""}><a href="#">Menú</a></li>
            <li className={activeNavItem === "Sucursales" ? "active" : ""}><a href="#">Sucursales</a></li>
            <li className={activeNavItem === "Productos" ? "active" : ""}><a href="#">Productos y Servicios</a></li>
            <li className={activeNavItem === "Conocenos" ? "active" : ""}><a href="#">Conocenos</a></li>
          </ul>
        </nav>

        {/* Botón hamburguesa solo para mobile */}
        <button 
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '×' : '☰'}
        </button>
        
        {/* Menú mobile (solo se muestra en mobile cuando está abierto) */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Menú</a></li>
            <li><a href="#">Sucursales</a></li>
            <li><a href="#">Productos y Servicios</a></li>
            <li><a href="#">Conócenos</a></li>
          </ul>
        </div>

      </header>
      <section id='main-section'>
        <div className='left-part'>
          <header className='header-section'>
            <div className='imagen-2'>Imagen</div>
            <h2>Encuéntranos cerca de tí</h2>
          </header>
          
          {/* Dropdown que solo se muestra en mobile */}
          <div className="custom-dropdown">
            <div 
              className="dropdown-header" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ backgroundColor: isOpen ? '#f5f5f5' : 'white' }}
            >
              <img 
                src={selectedBranch.icon} 
                alt="Selected branch" 
                className="dropdown-icon"
              />
              <span>{selectedBranch.name}</span>
              <span className="chevron">{isOpen ? '▼' : '◀'}</span>
            </div>
            {isOpen && (
              <div className="dropdown-options">
                {branchesData
                  .filter(branch => branch.id !== activeBranch) // Filtramos la sucursal activa
                  .map(branch => (
                    <div 
                      key={branch.id} 
                      className="dropdown-option"
                      onClick={() => {
                        setActiveBranch(branch.id);
                        setIsOpen(false);
                      }}
                    >
                      <img src={branch.icon} alt={branch.name} className="dropdown-icon"/>
                      <span>{branch.name}</span>
                      <span></span>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
          
          {/* Lista completa de sucursales (solo en escritorio) */}
          <ul className="branch-list">
            {branchesData.map(branch => (
              <li 
                key={branch.id} 
                className={`branch-item ${activeBranch === branch.id ? 'active' : ''}`}
                onClick={() => setActiveBranch(branch.id)} // Esto actualizará el mapa
              >
                <div className="branch-details">
                  <h3 className="branch-name">
                    <img src={branch.icon} alt={branch.name} style={{ width: '30px', height: '30px' }}/> 
                    {branch.name.replace('Sucursal ', '')}
                  </h3>
                  <p className="branch-description">{branch.description}</p>
                  <p className="branch-address">{branch.address}</p>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Detalles de la sucursal seleccionada (solo en mobile) */}
          <div className="selected-branch">
            <div className="branch-details">
              <h3 className="branch-name">
                <img src={selectedBranch.icon} alt={selectedBranch.name} style={{ width: '30px', height: '30px' }}/> 
                {selectedBranch.name.replace('Sucursal ', '')}
              </h3>
              <p className="branch-description">{selectedBranch.description}</p>
              <p className="branch-address">{selectedBranch.address}</p>
            </div>
          </div>
        </div>
        <div className='right-part'>
          <BranchMap branches={branchesData} activeBranch={activeBranch} />
        </div>
      </section>
      <footer id='main-footer'>
        <div>Bolsa de trabajo</div>
        <div>Invierte en nosotros</div>
      </footer>
    </>
  )
}

export default App
