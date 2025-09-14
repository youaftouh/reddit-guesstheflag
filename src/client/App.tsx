import React, { useEffect, useState } from "react";
import 'country-flag-icons/react/3x2'; // gives 3:2 aspect ratio SVG components
import * as Flags from 'country-flag-icons/react/3x2';

// GuessTheFlag - Single-file React (TypeScript) app component
// Drop into src/App.tsx in a Create React App / Vite + React + TypeScript project.
// Styling uses Tailwind classes — if you don't have Tailwind, basic styles are included below

type Country = { name: string; code: string };

// --- COUNTRY LIST: 160+ entries (name and ISO 3166-1 alpha-2 code) ---
const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "af" },
  { name: "Palestine", code: "ps" },
  { name: "Albania", code: "al" },
  { name: "Algeria", code: "dz" },
  { name: "Andorra", code: "ad" },
  { name: "Angola", code: "ao" },
  { name: "Argentina", code: "ar" },
  { name: "Armenia", code: "am" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Azerbaijan", code: "az" },
  { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" },
  { name: "Bangladesh", code: "bd" },
  { name: "Barbados", code: "bb" },
  { name: "Belarus", code: "by" },
  { name: "Belgium", code: "be" },
  { name: "Belize", code: "bz" },
  { name: "Benin", code: "bj" },
  { name: "Bhutan", code: "bt" },
  { name: "Bolivia", code: "bo" },
  { name: "Bosnia and Herzegovina", code: "ba" },
  { name: "Botswana", code: "bw" },
  { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" },
  { name: "Bulgaria", code: "bg" },
  { name: "Burkina Faso", code: "bf" },
  { name: "Burundi", code: "bi" },
  { name: "Cabo Verde", code: "cv" },
  { name: "Cambodia", code: "kh" },
  { name: "Cameroon", code: "cm" },
  { name: "Canada", code: "ca" },
  { name: "Central African Republic", code: "cf" },
  { name: "Chad", code: "td" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Comoros", code: "km" },
  { name: "Congo (Brazzaville)", code: "cg" },
  { name: "Congo (Kinshasa)", code: "cd" },
  { name: "Costa Rica", code: "cr" },
  { name: "Côte d'Ivoire", code: "ci" },
  { name: "Croatia", code: "hr" },
  { name: "Cuba", code: "cu" },
  { name: "Cyprus", code: "cy" },
  { name: "Czech Republic", code: "cz" },
  { name: "Denmark", code: "dk" },
  { name: "Djibouti", code: "dj" },
  { name: "Dominica", code: "dm" },
  { name: "Dominican Republic", code: "do" },
  { name: "Ecuador", code: "ec" },
  { name: "Egypt", code: "eg" },
  { name: "El Salvador", code: "sv" },
  { name: "Equatorial Guinea", code: "gq" },
  { name: "Eritrea", code: "er" },
  { name: "Estonia", code: "ee" },
  { name: "Eswatini", code: "sz" },
  { name: "Ethiopia", code: "et" },
  { name: "Fiji", code: "fj" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "Gabon", code: "ga" },
  { name: "Gambia", code: "gm" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Ghana", code: "gh" },
  { name: "Greece", code: "gr" },
  { name: "Grenada", code: "gd" },
  { name: "Guatemala", code: "gt" },
  { name: "Guinea", code: "gn" },
  { name: "Guinea-Bissau", code: "gw" },
  { name: "Guyana", code: "gy" },
  { name: "Haiti", code: "ht" },
  { name: "Honduras", code: "hn" },
  { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" },
  { name: "India", code: "in" },
  { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" },
  { name: "Iraq", code: "iq" },
  { name: "Ireland", code: "ie" },
  { name: "Italy", code: "it" },
  { name: "Jamaica", code: "jm" },
  { name: "Japan", code: "jp" },
  { name: "Jordan", code: "jo" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Kenya", code: "ke" },
  { name: "Kiribati", code: "ki" },
  { name: "Kuwait", code: "kw" },
  { name: "Kyrgyzstan", code: "kg" },
  { name: "Laos", code: "la" },
  { name: "Latvia", code: "lv" },
  { name: "Lebanon", code: "lb" },
  { name: "Lesotho", code: "ls" },
  { name: "Liberia", code: "lr" },
  { name: "Libya", code: "ly" },
  { name: "Liechtenstein", code: "li" },
  { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" },
  { name: "Madagascar", code: "mg" },
  { name: "Malawi", code: "mw" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Mali", code: "ml" },
  { name: "Malta", code: "mt" },
  { name: "Marshall Islands", code: "mh" },
  { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" },
  { name: "Mexico", code: "mx" },
  { name: "Micronesia", code: "fm" },
  { name: "Moldova", code: "md" },
  { name: "Monaco", code: "mc" },
  { name: "Mongolia", code: "mn" },
  { name: "Montenegro", code: "me" },
  { name: "Morocco", code: "ma" },
  { name: "Mozambique", code: "mz" },
  { name: "Myanmar", code: "mm" },
  { name: "Namibia", code: "na" },
  { name: "Nauru", code: "nr" },
  { name: "Nepal", code: "np" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" },
  { name: "Nigeria", code: "ng" },
  { name: "North Korea", code: "kp" },
  { name: "North Macedonia", code: "mk" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Pakistan", code: "pk" },
  { name: "Palau", code: "pw" },
  { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" },
  { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Rwanda", code: "rw" },
  { name: "Saint Kitts and Nevis", code: "kn" },
  { name: "Saint Lucia", code: "lc" },
  { name: "Saint Vincent and the Grenadines", code: "vc" },
  { name: "Samoa", code: "ws" },
  { name: "San Marino", code: "sm" },
  { name: "Sao Tome and Principe", code: "st" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Senegal", code: "sn" },
  { name: "Serbia", code: "rs" },
  { name: "Seychelles", code: "sc" },
  { name: "Sierra Leone", code: "sl" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Solomon Islands", code: "sb" },
  { name: "Somalia", code: "so" },
  { name: "South Africa", code: "za" },
  { name: "South Korea", code: "kr" },
  { name: "South Sudan", code: "ss" },
  { name: "Spain", code: "es" },
  { name: "Sri Lanka", code: "lk" },
  { name: "Sudan", code: "sd" },
  { name: "Suriname", code: "sr" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" },
  { name: "Taiwan", code: "tw" },
  { name: "Tajikistan", code: "tj" },
  { name: "Tanzania", code: "tz" },
  { name: "Thailand", code: "th" },
  { name: "Timor-Leste", code: "tl" },
  { name: "Togo", code: "tg" },
  { name: "Tonga", code: "to" },
  { name: "Trinidad and Tobago", code: "tt" },
  { name: "Tunisia", code: "tn" },
  { name: "Turkey", code: "tr" },
  { name: "Turkmenistan", code: "tm" },
  { name: "Tuvalu", code: "tv" },
  { name: "Uganda", code: "ug" },
  { name: "Ukraine", code: "ua" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
  { name: "Uruguay", code: "uy" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Vanuatu", code: "vu" },
  { name: "Vatican City", code: "va" },
  { name: "Venezuela", code: "ve" },
  { name: "Vietnam", code: "vn" },
  { name: "Yemen", code: "ye" },
  { name: "Zambia", code: "zm" },
  { name: "Zimbabwe", code: "zw" }
];

// Utility: shuffle array (Fisher-Yates)
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Use a temporary variable and non-null assertions to satisfy TypeScript's strict index checks
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

type FlagProps = { code: string; className?: string };

function FlagIcon({ code, className }: FlagProps) {
  const key = code.toUpperCase() as keyof typeof Flags;
  const Flag = Flags[key] as React.FC<React.SVGProps<SVGSVGElement>> | undefined;
  return Flag ? <Flag className={className || 'w-full h-full'} /> : <div>{code}</div>;
}

export default function App(): React.ReactElement {
  const [pool, setPool] = useState<Country[]>(COUNTRIES);
  const [current, setCurrent] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [numOptions] = useState(4);
  const total = pool.length;

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, numOptions]);

  function startNewRound() {
    if (pool.length === 0) {
      // reset pool
      setPool(shuffle(COUNTRIES));
      setRound(0);
      setScore(0);
      setSelected(null);
      setReveal(false);
      return;
    }

    const next = pool[round % pool.length]!;
    const incorrect = shuffle(pool.filter((c) => c.code !== next.code)).slice(0, numOptions - 1);
    const opts = shuffle([next, ...incorrect]);

    setCurrent(next);
    setOptions(opts);
    setSelected(null);
    setReveal(false);
    setRound((r) => r + 1);
  }

  function handleGuess(code: string) {
    if (reveal) return; // already guessed
    setSelected(code);
    setReveal(true);
    if (current && code === current.code) {
      setScore((s) => s + 1);
    }
    // auto-advance after short delay
    setTimeout(() => startNewRound(), 1500);
  }

  function handleSkip() {
    setSelected(null);
    setReveal(true);
    setTimeout(() => startNewRound(), 1000);
  }

  // small helper to render option button state
  function optionClass(opt: Country) {
    if (!reveal) return "hover:scale-105 transform transition p-2 rounded-lg border";
    if (opt.code === (current?.code)) return "bg-green-200 border-green-500 p-2 rounded-lg";
    if (opt.code === selected) return "bg-red-200 border-red-500 p-2 rounded-lg opacity-80 line-through";
    return "p-2 rounded-lg border opacity-70";
  }

  // prepare progress text
  const progressText = `${round} / ${total} (unique pool of ${total})`;

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Guess the Flag 🌍</h1>
          <div className="text-sm text-slate-600">Score: <strong>{score}</strong></div>
        </header>

        <main className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center">
              {current ? (
                <div>
                  <div className="mb-3 text-sm text-slate-500">{progressText}</div>
                  <div className="w-full flex justify-center">
                    <div className="w-72 h-48 rounded-md overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center">
                      <FlagIcon code={current.code} className="w-72 h-48" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">What's this flag?</div>
                </div>
              ) : (
                <div className="text-slate-500">Loading...</div>
              )}
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => handleGuess(opt.code)}
                    className={`${optionClass(opt)} text-left w-full`}
                    aria-pressed={selected === opt.code}
                    disabled={reveal}
                    title={opt.name}
                  >
                    <div className="flex items-center gap-3">
                      {/*<FlagIcon code={opt.code} className="w-10 h-6 rounded-sm border" />*/}
                      <div className="flex-1">
                        <div className="font-medium">{opt.name}</div>
                      </div>
                      {reveal && opt.code === current?.code ? (
                        <div className="text-green-700 font-bold">✓</div>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkip}
                    className="px-3 py-1 rounded-md border hover:bg-slate-100"
                  >
                    Skip
                  </button>

                  <button
                    onClick={() => { setPool(shuffle(COUNTRIES)); setRound(0); setScore(0); }}
                    className="px-3 py-1 rounded-md border hover:bg-slate-100"
                  >
                    Shuffle Pool
                  </button>
                </div>

                <div className="text-sm text-slate-500">Streak / Round not tracked separately</div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-6 text-sm text-center text-slate-500">
          Powered by devvit. Uses Flag images from country-flag-icons.
        </footer>
      </div>

      {/* Minimal fallback CSS if Tailwind isn't present. This CSS will be ignored when Tailwind is used. */}
      <style>{`
        .rounded-2xl{ border-radius:1rem; }
        .shadow-lg{ box-shadow: 0 10px 25px rgba(2,6,23,0.08); }
        .shadow-inner{ box-shadow: inset 0 -6px 12px rgba(2,6,23,0.03); }
        .bg-sky-50{ background: linear-gradient(180deg,#f8fbff,#eef8ff); }
        .bg-white{ background: white; }
        .border{ border: 1px solid rgba(15,23,42,0.06); }
        .hover\\:bg-slate-100:hover{ background: #f3f4f6; }
        .hover\\:scale-105:hover{ transform: scale(1.05); }
        .transform{ transform: translateZ(0); }
        .transition{ transition: all 160ms ease; }
        .line-through{ text-decoration: line-through; }
        .truncate{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      `}</style>
    </div>
  );
}
