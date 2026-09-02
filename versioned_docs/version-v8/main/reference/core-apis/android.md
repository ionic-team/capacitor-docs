import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Users, 
  Shield, 
  Activity, 
  Battery, 
  Clock, 
  Phone, 
  Play, 
  Pause, 
  RotateCcw, 
  Radio, 
  Search, 
  Bell, 
  Plus, 
  Smartphone, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  UserCheck, 
  Send, 
  Eye, 
  ChevronRight,
  Layers,
  Crosshair,
  Volume2
} from 'lucide-react';

// Radhey Enterprises - Initial Field Staff & Fleet Data (Centered in Delhi NCR / India)
const INITIAL_STAFF = [
  {
    id: 'RE-101',
    name: 'Ramesh Sharma',
    role: 'Field Sales Executive',
    phone: '+91 98765 43210',
    vehicle: 'Honda Activa (DL 4S 8821)',
    status: 'active', // active, idle, offline, on_trip
    lat: 28.6139,
    lng: 77.2090,
    speed: 34,
    battery: 88,
    lastPing: 'Just now',
    currentLocationName: 'Connaught Place, New Delhi',
    destination: 'Karol Bagh Market Hub',
    distanceTodayKm: 18.4,
    color: '#10b981', // emerald
    route: [
      { lat: 28.6050, lng: 77.1950 },
      { lat: 28.6080, lng: 77.2020 },
      { lat: 28.6139, lng: 77.2090 }
    ]
  },
  {
    id: 'RE-102',
    name: 'Suresh Kumar Verma',
    role: 'Delivery Specialist',
    phone: '+91 98112 34567',
    vehicle: 'Tata Ace (DL 1L 5520)',
    status: 'on_trip',
    lat: 28.6289,
    lng: 77.2185,
    speed: 42,
    battery: 65,
    lastPing: '1 min ago',
    currentLocationName: 'Pahar Ganj Near Station',
    destination: 'Radhey Enterprises Warehouse #2',
    distanceTodayKm: 31.2,
    color: '#3b82f6', // blue
    route: [
      { lat: 28.6210, lng: 77.2100 },
      { lat: 28.6250, lng: 77.2140 },
      { lat: 28.6289, lng: 77.2185 }
    ]
  },
  {
    id: 'RE-103',
    name: 'Amit Patel',
    role: 'Service Engineer',
    phone: '+91 97234 56789',
    vehicle: 'Hero Splendor (DL 7S 1209)',
    status: 'idle',
    lat: 28.5980,
    lng: 77.2280,
    speed: 0,
    battery: 42,
    lastPing: '4 mins ago',
    currentLocationName: 'Lodhi Colony Client Site',
    destination: 'Client Site Inspection Done',
    distanceTodayKm: 12.8,
    color: '#f59e0b', // amber
    route: [
      { lat: 28.5900, lng: 77.2200 },
      { lat: 28.5980, lng: 77.2280 }
    ]
  },
  {
    id: 'RE-104',
    name: 'Priya Sundaram',
    role: 'Client Relationship Mgr',
    phone: '+91 99887 11223',
    vehicle: 'Maruti Dzire (DL 2C 9012)',
    status: 'active',
    lat: 28.5700,
    lng: 77.1980,
    speed: 28,
    battery: 94,
    lastPing: 'Just now',
    currentLocationName: 'AIIMS Ring Road Flyover',
    destination: 'South Ext. Corporate Office',
    distanceTodayKm: 22.1,
    color: '#8b5cf6', // purple
    route: [
      { lat: 28.5600, lng: 77.1890 },
      { lat: 28.5700, lng: 77.1980 }
    ]
  }
];

// Pre-defined Geofence Zones of Radhey Enterprises
const GEOFENCES = [
  { id: 'geo-1', name: 'Main Head Office & HQ', lat: 28.6139, lng: 77.2090, radius: 800, color: '#3b82f6' },
  { id: 'geo-2', name: 'Central Warehouse - Okhla', lat: 28.5355, lng: 77.2732, radius: 1200, color: '#10b981' },
  { id: 'geo-3', name: 'North Hub - Model Town', lat: 28.7020, lng: 77.1930, radius: 900, color: '#f59e0b' }
];

export default function App() {
  // State Management
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [selectedStaffId, setSelectedStaffId] = useState(INITIAL_STAFF[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'staff', 'geofence', 'mobile_preview'
  
  // Real Device GPS Tracking state
  const [isRealGpsActive, setIsRealGpsActive] = useState(false);
  const [deviceCoords, setDeviceCoords] = useState(null);
  const [gpsError, setGpsError] = useState(null);

  // Alerts Log
  const [alerts, setAlerts] = useState([
    { id: 1, time: '10:42 AM', title: 'Geofence Entry', desc: 'Ramesh Sharma entered Main Head Office zone.', type: 'info' },
    { id: 2, time: '10:35 AM', title: 'Speed Alert', desc: 'Suresh Kumar exceeded 40 km/h on Pahar Ganj Road.', type: 'warning' },
    { id: 3, time: '10:15 AM', title: 'Trip Started', desc: 'Priya Sundaram started trip towards South Ext.', type: 'success' }
  ]);

  // Modals & Forms
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [notificationToast, setNotificationToast] = useState(null);

  // Leaflet references
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef({});
  const geofenceCirclesRef = useRef([]);

  // Toast notifier helper
  const showToast = (message, type = 'info') => {
    setNotificationToast({ message, type });
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  // 1. Initialize Leaflet Map dynamically
  useEffect(() => {
    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS
    const loadLeafletScript = () => {
      if (window.L) {
        initMap();
        return;
      }
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      // Base map centered in Delhi
      const map = L.map(mapContainerRef.current, {
        center: [28.6139, 77.2090],
        zoom: 13,
        zoomControl: false
      });

      // Add Zoom control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // CartoDB / OSM High Performance Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;

      // Draw initial geofences
      drawGeofences(L, map);
      updateStaffMarkers(L, map, staffList);
    };

    loadLeafletScript();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Draw Geofence circles
  const drawGeofences = (L, map) => {
    // Clear previous
    geofenceCirclesRef.current.forEach(c => c.remove());
    geofenceCirclesRef.current = [];

    GEOFENCES.forEach(g => {
      const circle = L.circle([g.lat, g.lng], {
        color: g.color,
        fillColor: g.color,
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '5, 5',
        radius: g.radius
      }).addTo(map);

      circle.bindTooltip(`ðŸ“ Geofence: ${g.name} (${g.radius}m)`, {
        permanent: false,
        direction: 'top'
      });

      geofenceCirclesRef.current.push(circle);
    });
  };

  // 3. Update Markers & Polylines on Map
  const updateStaffMarkers = (L, map, currentStaff) => {
    if (!L || !map) return;

    currentStaff.forEach(staff => {
      // Create Custom Animated Pulse Marker HTML
      const isSelected = staff.id === selectedStaffId;
      const markerHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'animate-ping' : ''}" style="background-color: ${staff.color}; opacity: 0.35;"></div>
          <div class="w-7 h-7 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-bold font-sans transition-transform transform ${isSelected ? 'scale-125' : 'hover:scale-110'}" style="background-color: ${staff.color};">
            ${staff.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div class="absolute -bottom-5 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow border border-slate-700">
            ${staff.speed > 0 ? `${staff.speed} km/h` : 'Stopped'}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-staff-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      if (markersRef.current[staff.id]) {
        // Update existing marker position
        markersRef.current[staff.id].setLatLng([staff.lat, staff.lng]);
        markersRef.current[staff.id].setIcon(customIcon);
      } else {
        // Create new marker
        const marker = L.marker([staff.lat, staff.lng], { icon: customIcon }).addTo(map);
        marker.on('click', () => {
          setSelectedStaffId(staff.id);
        });
        markersRef.current[staff.id] = marker;
      }

      // Draw Route Polyline
      const latlngs = staff.route.map(r => [r.lat, r.lng]);
      if (polylineRef.current[staff.id]) {
        polylineRef.current[staff.id].setLatLngs(latlngs);
      } else {
        polylineRef.current[staff.id] = L.polyline(latlngs, {
          color: staff.color,
          weight: 3.5,
          opacity: 0.7,
          dashArray: '4, 8'
        }).addTo(map);
      }
    });
  };

  // Re-render markers whenever staff list or selected staff changes
  useEffect(() => {
    if (window.L && mapInstanceRef.current) {
      updateStaffMarkers(window.L, mapInstanceRef.current, staffList);
    }
  }, [staffList, selectedStaffId]);

  // Center map on selected staff
  const focusOnStaff = (staff) => {
    setSelectedStaffId(staff.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([staff.lat, staff.lng], 15, { duration: 1.2 });
    }
  };

  // 4. Real-time Live Simulation loop (Moving agents around streets)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setStaffList(prev => prev.map(staff => {
        if (staff.status === 'idle' || staff.status === 'offline') return staff;

        // Small random movement delta
        const deltaLat = (Math.random() - 0.48) * 0.0006;
        const deltaLng = (Math.random() - 0.48) * 0.0006;
        const newLat = staff.lat + deltaLat;
        const newLng = staff.lng + deltaLng;
        const currentSpeed = Math.max(12, Math.min(55, Math.floor(staff.speed + (Math.random() * 8 - 4))));

        const updatedRoute = [...staff.route, { lat: newLat, lng: newLng }];
        if (updatedRoute.length > 25) updatedRoute.shift(); // Keep route lightweight

        return {
          ...staff,
          lat: newLat,
          lng: newLng,
          speed: currentSpeed,
          distanceTodayKm: +(staff.distanceTodayKm + 0.02).toFixed(2),
          lastPing: 'Just now',
          route: updatedRoute
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // 5. Device Native GPS Tracker Toggle
  const toggleDeviceRealGps = () => {
    if (isRealGpsActive) {
      setIsRealGpsActive(false);
      showToast('Real GPS Tracking stopped.', 'info');
      return;
    }

    if (!('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported by your browser.');
      showToast('Geolocation is not supported in this browser.', 'warning');
      return;
    }

    showToast('Starting Device Live GPS Tracking...', 'success');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        setDeviceCoords({ lat: latitude, lng: longitude });
        setIsRealGpsActive(true);
        setGpsError(null);

        // Update selected agent or add admin's live marker
        setStaffList(prev => prev.map(s => {
          if (s.id === selectedStaffId) {
            return {
              ...s,
              lat: latitude,
              lng: longitude,
              speed: Math.round((speed || 0) * 3.6),
              currentLocationName: 'Your Live Device GPS Location'
            };
          }
          return s;
        }));

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 16);
        }
      },
      (err) => {
        setGpsError(err.message);
        showToast(`GPS Error: ${err.message}`, 'warning');
      },
      { enableHighAccuracy: true }
    );
  };

  // Filtered staff list
  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const currentSelectedStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  // Assign New Destination Task
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setStaffList(prev => prev.map(s => {
      if (s.id === selectedStaffId) {
        return {
          ...s,
          destination: newTaskTitle,
          status: 'on_trip'
        };
      }
      return s;
    }));

    setAlerts(prev => [
      {
        id: Date.now(),
        time: 'Just now',
        title: 'New Dispatch Assigned',
        desc: `Assigned task "${newTaskTitle}" to ${currentSelectedStaff.name}.`,
        type: 'info'
      },
      ...prev
    ]);

    showToast(`Task assigned to ${currentSelectedStaff.name}!`, 'success');
    setNewTaskTitle('');
    setShowAssignModal(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification Alert */}
      {notificationToast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all transform animate-bounce ${
          notificationToast.type === 'success' 
            ? 'bg-emerald-950/95 border-emerald-500 text-emerald-200' 
            : notificationToast.type === 'warning'
            ? 'bg-amber-950/95 border-amber-500 text-amber-200'
            : 'bg-indigo-950/95 border-indigo-500 text-indigo-200'
        }`}>
          <Bell className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <span className="text-sm font-medium">{notificationToast.message}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <Radio className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Radhey Enterprises
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                GPS Fleet v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">Real-time Field Staff & Location Tracking System</p>
          </div>
        </div>

        {/* Global Live Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulation Play/Pause */}
          <button
            onClick={() => {
              setIsSimulating(!isSimulating);
              showToast(isSimulating ? 'Simulation paused' : 'Live tracking simulation resumed', 'info');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isSimulating 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSimulating ? 'Live Simulation: ON' : 'Simulation: PAUSED'}</span>
          </button>

          {/* Test Real GPS */}
          <button
            onClick={toggleDeviceRealGps}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isRealGpsActive 
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Apne phone ya computer ka real GPS test karein"
          >
            <Crosshair className={`w-3.5 h-3.5 ${isRealGpsActive ? 'animate-spin' : ''}`} />
            <span>{isRealGpsActive ? 'My GPS Active' : 'Use My GPS'}</span>
          </button>

          {/* Mobile Preview View Switcher */}
          <button
            onClick={() => setActiveTab(activeTab === 'mobile_preview' ? 'map' : 'mobile_preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeTab === 'mobile_preview'
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Field App Mode</span>
          </button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow">
              AD
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-white leading-none">Super Admin</p>
              <p className="text-[10px] text-slate-400 leading-tight">HQ Control Room</p>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK KPI METRIC BAR */}
      <section className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0 text-xs">
        <div className="flex items-center gap-2.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
          <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-400 text-[11px]">Total Active Staff</p>
            <p className="font-bold text-slate-100 text-sm">
              {staffList.filter(s => s.status === 'active' || s.status === 'on_trip').length} / {staffList.length} Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
          <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-400 text-[11px]">Today's Total Run</p>
            <p clas
