import { useEffect, useRef, useState } from "react"
import "./styles.css"
import PlayButton from './PlayButton'

export default function App() {
  return (
    <div className="page-container">
      <FadeSection delay={0.1}><Hero /></FadeSection>
      <FadeSection delay={0.2}><Guest /></FadeSection>
      <FadeSection delay={0.3}><Intro /></FadeSection>
      <FadeSection delay={0.4}><Location /></FadeSection>
      <FadeSection delay={0.5}><Timeline /></FadeSection>
      <FadeSection delay={0.6}><DressCode /></FadeSection>
      <FadeSection delay={0.7}><Gallery /></FadeSection>
      <FadeSection delay={0.8}><Parents /></FadeSection>
      <FadeSection delay={0.9}><RSVP /></FadeSection>
    <PlayButton/>

    </div>
  )
}

function FadeSection({ children, delay = 0 }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "show" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

/* ================= HERO ================= */
function Hero() {
  const weddingDate = new Date("2027-01-30T00:00:00")

  const [timeLeft, setTimeLeft] = useState(null)
  const [status, setStatus] = useState("before")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const startOfDay = new Date(weddingDate)
      const endOfDay = new Date(weddingDate)
      endOfDay.setHours(23, 59, 59, 999)

      if (now >= startOfDay && now <= endOfDay) {
        setStatus("today")
        setLoading(false)
        return
      }

      if (now > endOfDay) {
        setStatus("after")
        setLoading(false)
        return
      }

      const diff = weddingDate - now

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
      setLoading(false)
    }

    updateTime() // 👈 evita que inicie vacío

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

    return (
    <section className="hero">

    {/* LOGO */}
    <div className="hero-logo">
        <img src="/images/LOGO_MD.png" alt="Logo boda" />
    </div>

    {/* CENTER */}
    <div className="hero-center">
        <h2>ESMERALDA & NOE</h2>
        <p>30 ENERO 2027</p>
    </div>

    {/* BOTTOM */}
    <div className="hero-bottom">
        { status === "before" && (
        loading ? (
            <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            </div>
        ) : (
            <div className="countdown-box">
            <div className="countdown-values">
                <div>
                <span>{timeLeft.days}</span>
                <small>Días</small>
                </div>
                <div>
                <span>{timeLeft.hours}</span>
                <small>Hrs</small>
                </div>
                <div>
                <span>{timeLeft.minutes}</span>
                <small>Min</small>
                </div>
                <div>
                <span>{timeLeft.seconds}</span>
                <small>Seg</small>
                </div>
            </div>
            </div>
        )
        )}

        {status === "today" && (
        <p className="event-message">
            Hoy es el gran día. Nos sentimos felices de compartir este momento contigo.
        </p>
        )}

        {status === "after" && (
        <p className="event-message">
            Nuestro enlace ha sido celebrado. Agradecemos profundamente su compañía y cariño en este día tan especial.
        </p>
        )}
    </div>

    </section>
    )
}

/* COMPONENTE PARA CADA BLOQUE DEL CONTADOR */
function TimeBox({ label, value }) {
  return (
    <div className="time-box">
      <span>{value ?? "--"}</span>
      <small>{label}</small>
    </div>
  )
}

/* ================= INVITADO ================= */
function Guest() {
  // luego aquí conectarás BD
  const guestName = "Invitado Especial"

  return (
    <section className="section center">
      <p>Con mucho cariño invitamos a</p>
      <h2>{guestName}</h2>
    </section>
  )
}

/* ================= INTRO ================= */
function Intro() {
  return (
    <section className="section">
      <p className="center">
        Acompáñanos a celebrar este momento tan especial en nuestras vidas.
      </p>
    </section>
  )
}

/* ================= LUGAR ================= */
function Location() {
  return (
    <section className="section">
      <h2>Ceremonia</h2>
      <p>Nombre del lugar</p>
      <p>Dirección completa</p>
    </section>
  )
}

/* ================= ITINERARIO ================= */
function Timeline() {
  return (
    <section className="section">
      <h2>Itinerario</h2>

      <div className="timeline">
        <div><span>5:00 PM</span><p>Ceremonia</p></div>
        <div><span>6:30 PM</span><p>Recepción</p></div>
        <div><span>8:00 PM</span><p>Cena</p></div>
        <div><span>10:00 PM</span><p>Fiesta</p></div>
      </div>
    </section>
  )
}

/* ================= DRESS CODE ================= */
function DressCode() {
  return (
    <section className="section center">
      <h2>Código de Vestimenta</h2>
      <p>Evitar los siguientes tonos</p>

      <div className="colors">
        <div className="color" style={{ background: "#61081b" }}></div>
        <div className="color" style={{ background: "#ffffffc7" }}></div>
        <div className="color" style={{ background: "#888" }}></div>
      </div>

      {/* 👇 IMAGEN */}
      <div className="dress-image-container">
        <img src="/images/DRESSCODE01.png" alt="Código de vestimenta" />
      </div>
    </section>
  )
}

/* ================= GALERÍA ================= */
function Gallery() {
  return (
    <section className="section center">
      <h2>Galería</h2>
      <p>Próximamente...</p>
    </section>
  )
}

/* ================= PADRES ================= */
function Parents() {
  return (
    <section className="section center">
      <h2>Con la bendición de nuestros padres</h2>

      <div className="grid-2">
        <div>
          <h3>Padres del Novio</h3>
          <p>Nombre Padre</p>
          <p>Nombre Madre</p>
        </div>

        <div>
          <h3>Padres de la Novia</h3>
          <p>Nombre Padre</p>
          <p>Nombre Madre</p>
        </div>
      </div>
    </section>
  )
}

/* ================= RSVP ================= */
function RSVP() {
  return (
    <section className="section center">
      <h2>Confirmación</h2>

      <form className="form">
        <input placeholder="Nombre" />
        <select>
          <option>¿Asistirás?</option>
          <option>Sí</option>
          <option>No</option>
        </select>
        <button>Confirmar</button>
      </form>
    </section>
  )
}

function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    if (!playing) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setPlaying(!playing)
  }
  return (
    <div className="music-player">
      <button onClick={toggleMusic}>
        {playing ? "⏸ Pausar música" : "🎵 Reproducir música"}
      </button>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}