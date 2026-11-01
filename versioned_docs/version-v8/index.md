import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, Users, Grid, Settings, Mic, MicOff, 
  Volume2, VolumeX, Pause, Play, Download, Share2, Plus, 
  ChevronRight, Search, Check, Clock, ShieldCheck, Smartphone, X, Trash2, Edit
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [darkMode, setDarkMode] = useState(true);

  // Database States
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'أحمد محمود',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      numbers: [
        { type: 'شخصي', number: '+966 50 123 4567', isDefault: true },
        { type: 'العمل', number: '+966 55 987 6543', isDefault: false },
        { type: 'المنزل', number: '+966 11 234 5678', isDefault: false }
      ],
      preferredSim: 'SIM1'
    },
    {
      id: '2',
      name: 'سارة علي',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      numbers: [
        { type: 'شخصي', number: '+966 51 444 3322', isDefault: true },
        { type: 'مكتب', number: '+966 11 888 7766', isDefault: false }
      ],
      preferredSim: null
    }
  ]);

  const [calls, setCalls] = useState([
    { id: 'c1', name: 'أحمد محمود', number: '+966 50 123 4567', type: 'incoming', time: '10:30 ص', date: 'اليوم', sim: 'SIM1', recorded: true },
    { id: 'c2', name: 'سارة علي', number: '+966 51 444 3322', type: 'missed', time: 'أمس', date: 'أمس', sim: 'SIM2', recorded: false }
  ]);

  const [recordings, setRecordings] = useState([
    {
      id: 'rec1',
      contactName: 'أحمد محمود',
      number: '+966 50 123 4567',
      date: '10 مايو 2024 - 10:32 ص',
      duration: '02:45',
      transcript: 'أهلاً أحمد، تم الاتفاق على موعد الاجتماع غداً الساعة 10 صباحاً في المقر الرئيسي.'
    }
  ]);

  // Call Flow States
  const [selectedContactForCall, setSelectedContactForCall] = useState(null);
  const [callStep, setCallStep] = useState(null); // 'number' | 'sim'
  const [chosenNumber, setChosenNumber] = useState(null);
  const [rememberSimChoice, setRememberSimChoice] = useState(false);

  // Active Call Screen State
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Audio Player State
  const [playingRecId, setPlayingRecId] = useState(null);

  // Keypad State
  const [dialPadNumber, setDialPadNumber] = useState('');

  // Add Contact Modal
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number1: '', type1: 'شخصي', number2: '', type2: 'عمل' });

  // Call Timer Effect
  useEffect(() => {
    let interval;
    if (activeCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Call Wizard
  const initiateCall = (contact) => {
    setSelectedContactForCall(contact);
    if (contact.numbers.length === 1) {
      setChosenNumber(contact.numbers[0]);
      if (contact.preferredSim) {
        startActiveCall(contact, contact.numbers[0], contact.preferredSim);
      } else {
        setCallStep('sim');
      }
    } else {
      setCallStep('number');
    }
  };

  const handleSelectNumber = (numObj) => {
    setChosenNumber(numObj);
    if (selectedContactForCall.preferredSim) {
      startActiveCall(selectedContactForCall, numObj, selectedContactForCall.preferredSim);
    } else {
      setCallStep('sim');
    }
  };

  const handleSelectSim = (sim) => {
    if (rememberSimChoice && selectedContactForCall) {
      setContacts(contacts.map(c => c.id === selectedContactForCall.id ? { ...c, preferredSim: sim } : c));
    }
    startActiveCall(selectedContactForCall, chosenNumber, sim);
  };

  const startActiveCall = (contact, numObj, sim) => {
    setCallStep(null);
    setActiveCall({
      contactName: contact ? contact.name : dialPadNumber,
      number: numObj ? numObj.number : dialPadNumber,
      avatar: contact ? contact.avatar : null,
      sim: sim
    });
    setIsRecording(false);
  };

  const endCall = () => {
    if (isRecording && activeCall) {
      const newRec = {
        id: `rec_${Date.now()}`,
        contactName: activeCall.contactName,
        number: activeCall.number,
        date: new Date().toLocaleString('ar-SA'),
        duration: formatTime(callDuration),
        transcript: 'تم تسجيل المكالمة بنجاح والتفريغ النصي قيد المعالجة بالذكاء الاصطناعي.'
      };
      setRecordings([newRec, ...recordings]);
    }

    if (activeCall) {
      setCalls([{
        id: `c_${Date.now()}`,
        name: activeCall.contactName,
        number: activeCall.number,
        type: 'outgoing',
        time: 'الآن',
        date: 'اليوم',
        sim: activeCall.sim,
        recorded: isRecording
      }, ...calls]);
    }

    setActiveCall(null);
    setSelectedContactForCall(null);
    setChosenNumber(null);
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.number1) return;

    const nums = [{ type: newContact.type1, number: newContact.number1, isDefault: true }];
    if (newContact.number2) {
      nums.push({ type: newContact.type2, number: newContact.number2, isDefault: false });
    }

    const created = {
      id: `cnt_${Date.now()}`,
      name: newContact.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newContact.name}`,
      numbers: nums,
      preferredSim: null
    };

    setContacts([...contacts, created]);
    setNewContact({ name: '', number1: '', type1: 'شخصي', number2: '', type2: 'عمل' });
    setIsAddContactOpen(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-2 sm:p-6 transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`} dir="rtl">
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-slate-900 border-4 border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[850px] relative">
        
        {/* Status Bar */}
        <div className="bg-slate-900 px-6 pt-3 pb-2 flex justify-between items-center text-xs text-slate-400 select-none z-10">
          <span>09:41</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-bold">5G</span>
            <span>SIM1 | SIM2</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-200 rounded-xs"></div>
            </div>
          </div>
        </div>

        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              CF
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              ConnectFlow
            </h1>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Dynamic Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">دليل الهاتف الموحد</h2>
                <button 
                  onClick={() => setIsAddContactOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3 top-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="البحث باسم أو رقم..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Contacts List */}
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3.5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-indigo-500/30" />
                        <div>
                          <h3 className="font-bold text-slate-100">{contact.name}</h3>
                          <span className="text-xs text-indigo-400 font-medium">{contact.numbers.length} أرقام مربوطة</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => initiateCall(contact)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-900/20"
                      >
                        <Phone className="w-4 h-4" />
                        <span>اتصال</span>
                      </button>
                    </div>

                    {/* Unified Numbers Chips */}
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-700/40">
                      {contact.numbers.map((num, i) => (
                        <div key={i} className="text-xs bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-2">
                          <span className="text-slate-400">{num.type}:</span>
                          <span className="font-mono text-slate-200" dir="ltr">{num.number}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CALL LOG TAB */}
          {activeTab === 'calls' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">سجل المكالمات</h2>
              <div className="space-y-2">
                {calls.map((call) => (
                  <div key={call.id} className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-full ${call.type === 'missed' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{call.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="font-mono" dir="ltr">{call.number}</span>
                          <span>•</span>
                          <span className="text-indigo-400 font-semibold">{call.sim}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left flex flex-col items-end">
                      <span className="text-xs text-slate-400">{call.time}</span>
                      {call.recorded && (
                        <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded mt-1">مسجلة</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECORDINGS STUDIO TAB */}
          {activeTab === 'recordings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">استوديو التسجيلات</h2>
                <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-300 px-2 py-1 rounded-full">AI Powered</span>
              </div>

              <div className="space-y-3">
                {recordings.map((rec) => (
                  <div key={rec.id} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-100">{rec.contactName}</h4>
                        <span className="text-xs text-slate-400 font-mono" dir="ltr">{rec.number}</span>
                      </div>
                      <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-300">{rec.duration}</span>
                    </div>

                    {/* Audio Player */}
                    <div className="bg-slate-900 p-3 rounded-xl flex items-center gap-3">
                      <button 
                        onClick={() => setPlayingRecId(playingRecId === rec.id ? null : rec.id)}
                        className="p-2 bg-indigo-600 rounded-full text-white"
                      >
                        {playingRecId === rec.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <div className="flex-1">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-500 ${playingRecId === rec.id ? 'w-2/3 animate-pulse' : 'w-0'}`}></div>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">{rec.date}</span>
                    </div>

                    {/* AI Transcript */}
                    <div className="text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
                      <strong className="text-indigo-400 block mb-1">التفريغ النصي الذكي:</strong>
                      "{rec.transcript}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KEYPAD TAB */}
          {activeTab === 'keypad' && (
            <div className="flex flex-col items-center justify-between h-full py-4">
              <div className="text-center space-y-2">
                <input 
                  type="text" 
                  value={dialPadNumber}
                  readOnly
                  dir="ltr"
                  placeholder="أدخل الرقم..."
                  className="bg-transparent text-2xl font-mono text-center font-bold tracking-widest text-slate-100 focus:outline-none"
                />
              </div>

              {/* Number Pad Grid */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                  <button 
                    key={key}
                    onClick={() => setDialPadNumber(prev => prev + key)}
                    className="w-16 h-16 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 flex items-center justify-center text-xl font-bold text-slate-100 mx-auto active:scale-95 transition-transform"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {dialPadNumber && (
                  <button 
                    onClick={() => setDialPadNumber(dialPadNumber.slice(0, -1))}
                    className="p-3 text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                <button 
                  onClick={() => dialPadNumber && startActiveCall(null, { number: dialPadNumber }, 'SIM1')}
                  className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30"
