<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Timer - Alarm</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary": "#043900",
                        "error-container": "#93000a",
                        "on-primary-container": "#0e7100",
                        "tertiary": "#fcf9f8",
                        "surface-bright": "#37393a",
                        "primary-fixed": "#78ff5c",
                        "tertiary-fixed": "#e5e2e1",
                        "inverse-surface": "#e2e2e2",
                        "on-tertiary": "#303030",
                        "background": "#121414",
                        "on-primary-fixed-variant": "#085300",
                        "secondary-fixed-dim": "#c8c6c5",
                        "on-tertiary-fixed-variant": "#474746",
                        "surface-variant": "#333535",
                        "surface-dim": "#121414",
                        "secondary-container": "#4a4949",
                        "primary-fixed-dim": "#25e500",
                        "surface-container": "#1e2020",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-surface": "#e2e2e2",
                        "outline": "#85967c",
                        "secondary": "#c8c6c5",
                        "surface-tint": "#25e500",
                        "on-tertiary-fixed": "#1b1b1c",
                        "primary": "#edffe0",
                        "on-primary-fixed": "#012200",
                        "on-tertiary-container": "#616060",
                        "surface-container-high": "#282a2b",
                        "outline-variant": "#3b4b35",
                        "on-surface-variant": "#baccaf",
                        "inverse-on-surface": "#2f3131",
                        "on-error": "#690005",
                        "tertiary-container": "#dfdcdc",
                        "primary-container": "#2aff00",
                        "surface": "#121414",
                        "secondary-fixed": "#e5e2e1",
                        "on-secondary-fixed-variant": "#474646",
                        "tertiary-fixed-dim": "#c8c6c5",
                        "surface-container-lowest": "#0c0f0f",
                        "on-background": "#e2e2e2",
                        "on-secondary": "#313030",
                        "surface-container-low": "#1a1c1c",
                        "on-secondary-fixed": "#1c1b1b",
                        "on-secondary-container": "#bab8b7",
                        "inverse-primary": "#0d6e00",
                        "surface-container-highest": "#333535"
                    },
                    "borderRadius": {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter-md": "16px",
                        "stack-sm": "8px",
                        "stack-md": "16px",
                        "margin-mobile": "20px",
                        "stack-lg": "32px"
                    },
                    "fontFamily": {
                        "body-lg": ["Inter"],
                        "body-md": ["Inter"],
                        "title-md": ["Inter"],
                        "display-lg": ["Inter"],
                        "headline-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-lg-mobile": ["Inter"]
                    },
                    "fontSize": {
                        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "title-md": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(42, 255, 0, 0.4); }
            70% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 30px rgba(42, 255, 0, 0); }
            100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(42, 255, 0, 0); }
        }
        .animate-pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .text-glow {
            text-shadow: 0 0 20px rgba(42, 255, 0, 0.6);
        }
        @keyframes popup-image {
            0% { transform: scale(0.5); opacity: 0; }
            10% { transform: scale(1); opacity: 1; }
            90% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.5); opacity: 0; }
        }
        .animate-popup {
            animation: popup-image 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 0.2s;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background text-on-background font-body-lg h-screen w-screen overflow-hidden flex flex-col justify-center items-center relative">
<!-- Pulsating Background Effect -->
<div class="absolute inset-0 z-0 flex items-center justify-center">
<div class="w-96 h-96 rounded-full bg-primary-container/10 blur-3xl animate-pulse-ring"></div>
</div>
<!-- Main Content Canvas -->
<div class="z-10 flex flex-col items-center justify-center w-full px-margin-mobile flex-1 relative">
<!-- Popup Image Animation -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center justify-center pointer-events-none">
<div class="w-40 h-40 rounded-2xl overflow-hidden border border-primary-fixed shadow-[0_0_30px_rgba(120,255,92,0.4)] opacity-0 animate-popup bg-surface-container">
<img alt="Thumbnail reminder" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvxkv1L0DHQFICkKfer-X3QCeqK4bYbVAmRbFW_6vFBAm4MNLbTI19TsGpQwSvMLykm99uFdypGOnA3DHohiNc8M6nCf1nHJgTwG2ANVsne_25kvsxeeFKzcOrpLnPC-Uzchg3qXLCTJ7GXOjYo7cf6dRb_FuRuLEtUUhxHLH0Dt8Dmb8APEYs_EQzwJefJPxFpzcEVpHU9kA57qdeXvYeCKjsDKxoorJbaM_aV1AJG3NraB_lCZwADrw"/>
</div>
</div>
<!-- Top Bar Area (Suppressed per instructions for task-focused screen, but keeping a minimal back/dismiss context if needed, though instruction says full screen alarm) -->
<div class="fixed top-0 left-0 w-full z-50 flex justify-end items-center px-margin-mobile h-16 backdrop-blur-xl bg-surface-dim/30 border-b border-white/5">
<a class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant/50 text-on-surface hover:bg-surface-variant transition-all active:scale-95" href="{{DATA:SCREEN:SCREEN_3}}">
<span class="material-symbols-outlined">settings</span>
</a>
</div>
<!-- Timer/Alarm State -->
<div class="flex flex-col items-center gap-stack-lg w-full max-w-md mt-16 relative z-10">
<div class="flex flex-col items-center gap-stack-sm">
<span class="font-display-lg text-[80px] leading-none text-primary-fixed font-bold text-glow font-mono tracking-tighter">00:00</span>
<span class="font-title-md text-title-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">notifications_active</span>
انتهى الوقت</span>
</div>
<!-- Reason Text (The primary focus) -->
<div class="bg-surface-container/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 w-full text-center mt-8 relative overflow-hidden">
<div class="absolute inset-0 z-0">
<img alt="Medicine reminder" class="w-full h-full object-cover opacity-40" src="https://lh3.googleusercontent.com/aida/AP1WRLvxkv1L0DHQFICkKfer-X3QCeqK4bYbVAmRbFW_6vFBAm4MNLbTI19TsGpQwSvMLykm99uFdypGOnA3DHohiNc8M6nCf1nHJgTwG2ANVsne_25kvsxeeFKzcOrpLnPC-Uzchg3qXLCTJ7GXOjYo7cf6dRb_FuRuLEtUUhxHLH0Dt8Dmb8APEYs_EQzwJefJPxFpzcEVpHU9kA57qdeXvYeCKjsDKxoorJbaM_aV1AJG3NraB_lCZwADrw"/>
<div class="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/80 to-surface-container-lowest/40"></div>
</div>
<h1 class="font-display-lg text-display-lg text-primary-fixed relative z-10 leading-tight">تناول الدواء</h1>
</div>
</div>
</div>
<!-- Bottom Actions -->
<div class="fixed bottom-0 left-0 w-full z-50 flex flex-col gap-stack-md px-margin-mobile pb-12 pt-8 backdrop-blur-xl bg-surface-dim/80 border-t border-white/5">
<div class="flex gap-gutter-md max-w-md mx-auto w-full">
<button class="flex-1 bg-surface-variant/50 hover:bg-surface-variant backdrop-blur-md border border-white/10 text-on-surface font-title-md text-title-md py-4 rounded-full transition-all flex items-center justify-center gap-2 active:scale-95 duration-150"><span class="material-symbols-outlined">snooze</span>
غفوة</button>
<button class="flex-1 bg-primary-fixed text-on-primary-fixed font-title-md text-title-md py-4 rounded-full transition-all flex items-center justify-center gap-2 active:scale-95 duration-150 shadow-[0_0_20px_rgba(120,255,92,0.4)]"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">stop_circle</span>
إيقاف</button>
</div>
</div>
<audio id="popup-sound" preload="auto">
<source src="https://assets.mixkit.co/active_storage/sfx/290/290-preview.mp3" type="audio/mpeg"/>
</audio>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('popup-sound');
    
    // The animation starts with a 0.2s delay, so we trigger the sound at exactly the same time.
    setTimeout(() => {
      audio.play().catch(error => {
        // Autoplay may be blocked by browser policies if there's no prior user interaction
        console.warn('Audio playback was prevented:', error);
      });
    }, 200);
  });
</script>
</body></html>
