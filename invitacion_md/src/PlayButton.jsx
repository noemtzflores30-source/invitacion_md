import { useRef, useState } from "react"

function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = async () => {
  if (!playing) {
    try {
      await audioRef.current.play()
      setPlaying(true)
    } catch (err) {
      console.log("Error al reproducir:", err)
    }
  } else {
    audioRef.current.pause()
    setPlaying(false)
  }
}

  return (
    <div className="music-player">
      <button onClick={toggleMusic} className="music-btn">
        <span className="icon">
          {playing ? "🔇" : "🎵"}
        </span>
        <span className="label">
          {playing ? "Pausar música" : "Reproducir música"}
        </span>
      </button>

      <audio ref={audioRef} loop>
        <source src="/music/Silvergun_Superman.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default MusicPlayer