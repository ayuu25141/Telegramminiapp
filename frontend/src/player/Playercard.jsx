
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosconfig";
// ✅ APNI VIDEOS YAHAN ADD KARO


// ─── Helpers ────────────────────────────────────────────────────────────────
function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const PLAY_PATH = "M19.59 12.71l-14-9A1 1 0 004 5v14a1 1 0 001.59.81l14-9a1 1 0 000-1.62z";
const PAUSE_PATH = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
const FS_ENTER = "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z";
const FS_EXIT = "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d={d} />
  </svg>
);


const VolumeIcon = ({ muted, volume }) => {
  if (muted || volume === 0)
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
      </svg>
    );
  if (volume < 0.5)
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
      </svg>
    );
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
};

const PipIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" />
  </svg>
);

const ListIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VideoPlayer() {
  const videoRef = useRef(null);
  const rootRef = useRef(null);
  const hideTimerRef = useRef(null);


const [videoList, setVideoList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [flashIcon, setFlashIcon] = useState(null); // "play"|"pause"
  const [kbdHint, setKbdHint] = useState("");
  const [kbdTimer, setKbdTimer] = useState(null);

  const currentVideo = videoList[currentIdx];


useEffect(() => {

  API.get(`/video/${id}`)
    .then((res) => {

      if(res.data.success){

        const video = res.data.video

        setVideoList([
          {
            src: video.bunny_video_id
,
            title: video.title,
          }
        ])

      }

    })
    .catch((err) => {
      console.log(err)
    })

}, [id])



  // ── Load video on index change ──
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !currentVideo) return;
    v.src = currentVideo.src;
    v.load();
    v.play().catch(() => {});
  }, [currentIdx, currentVideo]);

  // ── Sync playback rate ──
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  // ── Sync volume ──
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = muted;
  }, [volume, muted]);

  // ── Fullscreen change ──
  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const v = videoRef.current;
      if (!v) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "KeyJ" || e.code === "ArrowLeft") { v.currentTime = Math.max(0, v.currentTime - 10); hint("⏪ -10s"); }
      if (e.code === "KeyL" || e.code === "ArrowRight") { v.currentTime = Math.min(v.duration || 0, v.currentTime + 10); hint("⏩ +10s"); }
      if (e.code === "KeyM") toggleMute();
      if (e.code === "KeyF") toggleFS();
      if (e.code === "ArrowUp") { e.preventDefault(); const nv = Math.min(1, v.volume + 0.1); v.volume = nv; setVolume(nv); hint(`🔊 ${Math.round(nv * 100)}%`); }
      if (e.code === "ArrowDown") { e.preventDefault(); const nv = Math.max(0, v.volume - 0.1); v.volume = nv; setVolume(nv); hint(`🔉 ${Math.round(nv * 100)}%`); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [playing, muted]);

  // ── Controls auto-hide ──
  const resetHide = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(hideTimerRef.current);
    if (!videoRef.current?.paused) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
    }
  }, []);

  function hint(msg) {
    setKbdHint(msg);
    clearTimeout(kbdTimer);
    setKbdTimer(setTimeout(() => setKbdHint(""), 1500));
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); triggerFlash("play"); }
    else { v.pause(); triggerFlash("pause"); }
  }

  function triggerFlash(type) {
    setFlashIcon(type);
    setTimeout(() => setFlashIcon(null), 500);
  }

  function toggleMute() {
    setMuted((m) => !m);
    hint(muted ? "🔊 Unmute" : "🔇 Mute");
  }

  function toggleFS() {
    if (!document.fullscreenElement) rootRef.current?.requestFullscreen();
    else document.exitFullscreen();
  }

  function seekTo(pct) {
    const v = videoRef.current;
    if (!v?.duration) return;
    v.currentTime = pct * v.duration;
  }

  function handleProgress(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(pct);
  }

  function handleVolChange(e) {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMuted(val === 0);
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newVideo = { src: url, title: file.name };
    setVideoList((prev) => [...prev, newVideo]);
    setCurrentIdx(videoList.length); // new last index
  }

  function playAt(idx) {
    setCurrentIdx(idx);
    setShowPlaylist(false);
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onMouseMove={resetHide}
      onMouseLeave={() => { if (!videoRef.current?.paused) setControlsVisible(false); }}
      style={{
        position: "relative",
        background: "#000",
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
     height : "70%",
        outline: "none",
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
      }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => { setPlaying(true); hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000); }}
        onPause={() => { setPlaying(false); clearTimeout(hideTimerRef.current); setControlsVisible(true); }}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (!v) return;
          setCurrentTime(v.currentTime);
          if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1) / v.duration * 100);
        }}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => {
          setPlaying(false);
          if (currentIdx < videoList.length - 1) setCurrentIdx((i) => i + 1);
        }}
        style={{ width: "100%", display: "block", aspectRatio: "16/9", background: "#000",cursor: "pointer" }}
      />

      {/* ── Flash overlay ── */}
      {flashIcon && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            width: 64, height: 64, background: "rgba(255,255,255,0.15)",
            borderRadius: "50%", display: "flex", alignItems: "center",
            justifyContent: "center", backdropFilter: "blur(4px)",
          }}>
            <Icon d={flashIcon === "play" ? PLAY_PATH : PAUSE_PATH} size={28} />
          </div>
        </div>
      )}

      {/* ── Keyboard hint ── */}
      {kbdHint && (
        <div style={{
          position: "absolute", bottom: 68, left: "50%", transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.75)", color: "rgba(255,255,255,0.85)",
          fontSize: 12, padding: "4px 12px", borderRadius: 4, pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          {kbdHint}
        </div>
      )}

      {/* ── Top bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        background: "linear-gradient(rgba(0,0,0,0.65),transparent)",
        padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 10,
        opacity: controlsVisible ? 1 : 0, transition: "opacity 0.3s",
        pointerEvents: controlsVisible ? "auto" : "none",
      }}>
        
       
      </div>

      {/* ── Controls ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(0,0,0,0.88))",
        padding: "32px 14px 12px",
        opacity: controlsVisible ? 1 : 0, transition: "opacity 0.3s",
        pointerEvents: controlsVisible ? "auto" : "none",
      }}>
        {/* Progress bar */}
        <div
          onClick={handleProgress}
          style={{ position: "relative", height: 18, display: "flex", alignItems: "center", cursor: "pointer", marginBottom: 8 }}
        >
          <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: buffered + "%", background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: progressPct + "%", background: "#e84545", borderRadius: 2 }} />
            <div style={{
              position: "absolute", top: "50%", left: progressPct + "%",
              width: 13, height: 13, background: "#e84545", borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 0 3px rgba(232,69,69,0.3)",
            }} />
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

          {/* Play/Pause */}
          <Btn onClick={togglePlay} title="Play/Pause (Space)">
            <Icon d={playing ? PAUSE_PATH : PLAY_PATH} />
          </Btn>

          {/* Skip -10 */}
          <Btn onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 10); hint("⏪ -10s"); }} title="−10s (J)">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.5 12l7.5 5V7l-7.5 5zm-7.5 5V7H2v10h2zm2 0V7H4v10h2z" opacity={0.5} />
              <path d="M11.5 12l7.5 5V7l-7.5 5zM2 17h2V7H2v10z" />
              <text x="2.5" y="21" fill="white" fontSize="5.5" fontFamily="sans-serif">10</text>
            </svg>
          </Btn>

          {/* Skip +10 */}
          <Btn onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.min(v.duration || 0, v.currentTime + 10); hint("⏩ +10s"); }} title="+10s (L)">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.5 12L5 7v10l7.5-5zm7.5 5V7h-2v10h2zm-4 0V7h-2v10h2z" opacity={0.5} />
              <path d="M12.5 12L5 7v10l7.5-5zm9-5h-2v10h2V7z" />
              <text x="12.5" y="21" fill="white" fontSize="5.5" fontFamily="sans-serif">10</text>
            </svg>
          </Btn>

          {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
  <Btn onClick={toggleMute} title="Mute (M)">
    <VolumeIcon muted={muted} volume={volume} />
  </Btn>
  <input
    type="range"
    min={0}
    max={1}
    step={0.02}
    value={muted ? 0 : volume}
    onChange={(e) => {
      const newVolume = parseFloat(e.target.value);
      if (muted && newVolume > 0) {
        // Unmute if the user is trying to increase volume
        setMuted(false);
      }
      setVolume(newVolume);
    }}
    style={{ width: 68, height: 3, accentColor: "#e84545", cursor: "pointer" }}
  />
</div>

          {/* Time */}
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: "0.02em", marginLeft: 4, flexShrink: 0 }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div style={{ flex: 1 }} />

          {/* Playlist toggle */}
     

          {/* Speed */}
          <div style={{ position: "relative" }}>
            <Btn
              onClick={() => { setShowSpeedMenu((s) => !s); setShowPlaylist(false); }}
              style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.03em", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4 }}
            >
              {speed === 1 ? "1×" : `${speed}×`}
            </Btn>
          </div>

          {/* PiP */}
          <Btn onClick={async () => {
            const v = videoRef.current;
            if (!v) return;
            if (document.pictureInPictureElement) await document.exitPictureInPicture();
            else if (v.readyState) await v.requestPictureInPicture();
          }} title="Picture-in-Picture">
            <PipIcon />
          </Btn>

          {/* Fullscreen */}
          <Btn onClick={toggleFS} title="Fullscreen (F)">
            <Icon d={fullscreen ? FS_EXIT : FS_ENTER} />
          </Btn>
        </div>
      </div>

      {/* ── Speed Menu ── */}
      {showSpeedMenu && (
        <div style={{
          position: "absolute", bottom: 52, right: 14,
          background: "rgba(18,18,18,0.96)", borderRadius: 8,
          border: "0.5px solid rgba(255,255,255,0.12)", overflow: "hidden", minWidth: 96,
          zIndex: 10,
        }}>
          {SPEEDS.map((s) => (
            <button key={s} onClick={() => { setSpeed(s); setShowSpeedMenu(false); hint(`Speed: ${s}×`); }}
              style={{
                display: "block", width: "100%", background: "none",
                border: "none", color: s === speed ? "#e84545" : "#fff",
                fontSize: 13, padding: "8px 14px", cursor: "pointer",
                textAlign: "left", fontWeight: s === speed ? 600 : 400,
              }}
            >
              {s === 1 ? "1× (Normal)" : `${s}×`}
            </button>
          ))}
        </div>
      )}

      {/* ── Playlist Panel ── */}
   
    </div>
  );
}

// ── Small button helper ───────────────────────────────────────────────────────
function Btn({ children, onClick, title, style }) {
  return (
    <button onClick={onClick} title={title}
      style={{
        background: "none", border: "none", cursor: "pointer", color: "#fff",
        padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
        justifyContent: "center", opacity: 0.85, transition: "opacity 0.15s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
    >
      {children}
    </button>
  );
}