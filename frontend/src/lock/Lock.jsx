import { useState, useRef, useEffect } from "react";
import {
  Lock as LockIcon,
  Eye,
  EyeOff,
} from "lucide-react";

import API from "../api/axiosconfig";

function LockScreen({ onUnlock }) {

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const inputRef = useRef(null);

  // Telegram check
  const tg = window.Telegram?.WebApp;

  const isTelegram = !!tg?.initDataUnsafe?.user;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Unlock
const handleUnlock = async () => {
  try {
    if (!tg || !tg.initDataUnsafe?.user?.id) {
      setError(true);
      return;
    }

    tg.ready();

    const telegramId = String(
      tg.initDataUnsafe.user.id
    );

    const req = await API.post("/verifytoken", {
      token: password,
      telegram_id: telegramId,
    });

    if (req.data.success) {
      // save locally
      localStorage.setItem("token", password);

      localStorage.setItem(
        "telegram_id",
        telegramId
      );

      onUnlock();
    }
  } catch (err) {
    console.log("FULL ERROR", err);
    console.log("RESPONSE", err.response);
    console.log("MESSAGE", err.message);
    console.log(err);

    setError(true);

    setShaking(true);

    setAttempts((a) => a + 1);

    setTimeout(() => setShaking(false), 500);

    setTimeout(() => setError(false), 2000);

    setPassword("");
  }
};
  // Enter key
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleUnlock();
    }
  };

  // Telegram only block
  if (!isTelegram) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center px-6">

        <div className="text-center max-w-sm">

          <div className="w-20 h-20 rounded-3xl bg-purple-600/20 flex items-center justify-center mx-auto mb-6">

            <LockIcon className="w-10 h-10 text-purple-400" />

          </div>

          <h1 className="text-3xl font-bold text-white mb-3">

            Telegram Only

          </h1>

          <p className="text-zinc-400 leading-relaxed">

            This Mini App only works inside Telegram.

          </p>

        </div>

      </div>
    );
  }

  return (

    <div
      className="min-h-screen w-full flex items-center justify-center bg-black"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,111,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-sm mx-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl transition-all duration-100 ${
          shaking
            ? "animate-[shake_0.4s_ease-in-out]"
            : ""
        }`}
      >

        {/* Icon */}
        <div className="flex flex-col items-center mb-8">

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,111,255,0.2) 0%, rgba(124,111,255,0.08) 100%)",
              border:
                "1px solid rgba(124,111,255,0.3)",
            }}
          >

            <LockIcon
              className="w-7 h-7"
              style={{ color: "#7c6fff" }}
            />

          </div>

          <h1 className="text-xl font-semibold text-white">

            Locked

          </h1>

          <p className="text-sm mt-1 text-zinc-400">

            Enter your password to continue

          </p>

        </div>

        {/* Input */}
        <div className="mb-4 relative">

          <div
            className={`relative flex items-center rounded-xl border transition-all duration-200 ${
              error
                ? "border-red-500/60 bg-red-500/5"
                : "border-zinc-700 bg-zinc-800"
            }`}
            style={{ minHeight: "48px" }}
          >

            <input
              ref={inputRef}
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => {

                setPassword(e.target.value);

                setError(false);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none"
            />

            <button
              onClick={() =>
                setShowPassword((v) => !v)
              }
              className="px-3 text-zinc-400 hover:text-white transition-colors"
              tabIndex={-1}
            >

              {
                showPassword
                  ? <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />
              }

            </button>

          </div>

          {/* Error */}
          <div
            className={`overflow-hidden transition-all duration-200 ${
              error
                ? "max-h-8 mt-2 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >

            <p className="text-xs text-red-400 px-1">

              Incorrect password

              {
                attempts > 1
                  ? ` — ${attempts} failed attempts`
                  : ""
              }

            </p>

          </div>

        </div>

        {/* Button */}
        <button
          onClick={handleUnlock}
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #7c6fff 0%, #9b8fff 100%)",
          }}
        >

          Unlock

        </button>

      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
        }
      `}</style>

    </div>
  );
}

export default function Lock({ onUnlock }) {

  return <LockScreen onUnlock={onUnlock} />;
}