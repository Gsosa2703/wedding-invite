'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, Variant, VariantLabels, Variants } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function WeddingInvitation() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    asistencia: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(1) // Start with middle image
  
  // Carousel images
  const carouselImages = [
    { src: "/images/gaby3.jpg", alt: "Alexander y Gabriela - Momento especial 1" },
    { src: "/images/gaby2.jpg", alt: "Alexander y Gabriela - Momento principal" },
    { src: "/images/carosel1.jpg", alt: "Alexander y Gabriela - Momento especial 2" },
  ]
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }
  
  const getVisibleImages = () => {
    const prevIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length
    const nextIndex = (currentImageIndex + 1) % carouselImages.length
    
    return {
      left: carouselImages[prevIndex],
      center: carouselImages[currentImageIndex],
      right: carouselImages[nextIndex]
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration
      const serviceId = 'service_e1j75je' // You'll need to create this in EmailJS
      const templateId = 'template_zn85aen' // You'll need to create this in EmailJS  
      const publicKey = '27AI7HoqsgNy-ksMX' // You'll need to get this from EmailJS

      const templateParams = {
        to_email: 'gsosa2703@gmail.com',
        from_name: formData.nombre,
        phone: formData.telefono,
        attendance: formData.asistencia === 'si' ? 'Sí, asistiré' : 'No podré asistir',
        reply_to: 'noreply@wedding.com',
        subject: `Confirmación de asistencia - ${formData.nombre}`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setSubmitStatus('success')
      setShowConfirmationModal(true)
      // Reset form
      setFormData({
        nombre: '',
        telefono: '',
        asistencia: '',
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date('2025-11-15T20:00:00')
    const update = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasPlayed && audioRef.current) {
        audioRef.current.play().catch((err: any) => {
          console.error('Autoplay failed:', err);
        });
        setHasPlayed(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasPlayed]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/boda1.jpg"
            alt="Alexander y Gabriela"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 z-20 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="text-sm font-cormorant mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            15 de noviembre de 2025
          </motion.div>
          <motion.h1 
            className="text-6xl md:text-6xl font-allura"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >
            Alexander & <br/> Gabriela
          </motion.h1>
        </motion.div>
      </div>

      <div className="flex justify-center py-4">
        <audio autoPlay loop controls className="w-64 h-8">
          <source src="/cancion/cancion-aladin.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>


      {/* Main Content */}
      <div className=" mx-auto space-y-16">
        {/* Story/Welcome Section */}
        <motion.section 
          className="text-lg leading-relaxed text-center space-y-4 pt-5 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p 
            className="font-script text-5xl text-gray-700 text-center"
            variants={fadeInUp}
          >
            ¡Nos Casamos!
          </motion.p>
          <motion.p 
            className="font-cormorant text-justify"
            variants={fadeInUp}
          >
            Toda familia tiene una historia, y la nuestra apenas comienza. Con mucha ilusión, alegría en nuestros corazones y fe en Dios, nosotros, <span className="font-semibold">Alexander y Gabriela</span>, te invitamos a acompañarnos en la celebración de nuestro matrimonio sacramental, guiados por el amor de papá Dios quien nos unió hace siete años para comenzar un maravilloso noviazgo.
          </motion.p>
          
          {/* Countdown Section */}
          <motion.section 
            className="flex justify-center items-center gap-4 py-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: timeLeft.days, label: 'DÍAS' },
              { value: timeLeft.hours, label: 'HORAS' },
              { value: timeLeft.minutes, label: 'MINUTOS' },
              { value: timeLeft.seconds, label: 'SEGUNDOS' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center"
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-cormorant w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-[#22223b] text-white mb-1">
                  {item.value}
                </div>
                <div className="font-cormorant text-xs font-semibold tracking-widest text-gray-700">{item.label}</div>
              </motion.div>
            ))}
          </motion.section>
          
          <motion.p 
            className="font-cormorant text-justify"
            variants={fadeInUp}
          >
            En este día especial, queremos compartir contigo el nacimiento de nuestra propia historia familiar y llenar cada rincón de bendiciones, abrazos y recuerdos inolvidables.
          </motion.p>
        </motion.section>

        {/* Save the Date */}
        <motion.section 
          className="text-center space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className='px-5'>
            <div className='pb-5'>
              <motion.div 
                className="font-script text-5xl text-gray-700 text-center pb-4"
                variants={fadeInUp}
              >
                Reserva la Fecha
              </motion.div>
              <motion.div 
                className="w-full max-w-3xl relative"
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <Image
                  src="/images/boda5.jpg"
                  alt="Alexander y Gabriela"
                  width={400}
                  height={400}
                />
              </motion.div>
              <motion.div 
                className="text-5xl text-gray-700 font-script pt-4"
                variants={fadeInUp}
              >
                15/11/2025
              </motion.div>
              <motion.div 
                className="text-lg font-cormorant text-justify"
                variants={fadeInUp}
              >
                Queremos compartir contigo este día inolvidable.
              </motion.div>
            </div>
          </div>
        </motion.section>     

        {/* Ceremony Section */}
        <motion.section 
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="relative w-full max-w-xl h-80 overflow-hidden shadow-lg"
            variants={scaleIn}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/ceremonia.jpg"
              alt="Lugar del festejo"
              fill
              className="object-cover grayscale"
              style={{ zIndex: 1 }}
            />
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/iconos/cruzar_white.png"
                  alt="Anillos de boda"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>
              <motion.div 
                className="font-script text-5xl text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Ceremonia
              </motion.div>
              <motion.div 
                className="text-lg text-white mb-2 font-cormorant"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Lugar: La Catedral de Guarenas <span className="font-semibold"> <br/> Hora: 8:00 PM</span>
              </motion.div>
              <motion.a
                href="https://maps.app.goo.gl/VdTvjZotR25H8cDV9?g_st=iw"
                className="px-6 py-2 mt-3 bg-white text-black rounded shadow hover:bg-gray-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                Ver mapa
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

                {/* Dress Code Section */}
                <section className="text-center space-y-4 px-4">
          {/* Icon: Tuxedo and dress */}
          <div className="flex justify-center mb-2">
            <Image
                  src="/iconos/vestido-de-novia.png"
                alt="Anillos de boda"
                width={48}
                height={48}
                className="object-contain"
              />
          </div>
          <div className="font-script text-5xl text-gray-700 text-center">Vestimenta</div>
          <div className="text-lg font-cormorant text-center">Traje formal</div>
          <div className="text-lg font-cormorant text-justify">
            <Image
                src="/iconos/advertencia.png"
                alt="advertencia"
                width={20}
                height={20}
                className="object-contain"
              />
            Por favor <strong> evite utilizar </strong> tonos neutros como blanco, azul cielo, beige o champagne.
          </div>
        </section>

        {/* Reception Section */}
        <section className="flex justify-center">
          <div className="relative w-full max-w-xl h-80 overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Lugar del festejo"
              fill
              className="object-cover grayscale"
              style={{ zIndex: 1 }}
            />
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center">
              {/* Icon: Clinking glasses */}
              <Image
                src="/iconos/salud-blanco.png"
                alt="Anillos de boda"
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="font-script text-5xl text-white text-center">Celebración</div>
              <div className="text-lg text-white mb-2 font-cormorant">Club Campestre El Rodeo, Guatire
              <br/>
              <span className='text-base'>Dará inicio después de la ceremonia.</span>

              </div>
              <a
                href="https://maps.app.goo.gl/ZzfvtDET4BRdUttB8?g_st=iw"
                className="px-6 py-2 mt-3 bg-white text-black rounded shadow hover:bg-gray-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver mapa
              </a>
            </div>
          </div>
        </section>

        {/* Children Section */}
        <section className="text-center space-y-2 px-4">
          {/* Icon: Info */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </div>
          <div className="font-script text-5xl text-gray-700 text-center">Detalles</div>
          <div className="text-lg font-cormorant text-justify">
            <Image
                  src="/iconos/advertencia.png"
                  alt="advertencia"
                  width={20}
                  height={20}
                  className="object-contain"
              />
            Por motivos de logística y espacio, la celebración será exclusivamente para adultos (A excepción de los pequeños del cortejo). Agradecemos tu comprensión y cariño.
            </div>
        </section>

        {/* Wedding Hands Photo Section */}
        <section className="flex justify-center my-8">
          <div className="relative w-full max-w-md h-56 overflow-hidden shadow">
            <Image
              src="/images/manos.jpg"
              alt="Intercambio de anillos"
              fill
              className="object-cover grayscale"
            />
          </div>
        </section>

        {/* Gift Section */}
        <section className="text-center space-y-4 px-4">
          {/* Icon: Gift box */}
          <div className="flex justify-center mb-2">
            <Image
              src="/iconos/caja-de-regalo.png"
              alt="Anillos de boda"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          {/* Título principal */}
          <h2 className="font-script text-5xl text-gray-700">Regalos</h2>

          {/* Texto introductorio */}
          <p className="text-lg font-cormorant text-justify">
            Tu presencia ya es nuestro mejor regalo. Si deseas contribuir a nuestro inicio, en efectivo lo sabremos apreciar, pero si lo prefieres, hemos habilitado varias opciones para tus regalos:
          </p>

          {/* Métodos de pago */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-md text-left space-y-3">
            <div>
              <span className="block text-lg font-semibold font-cormorant text-gray-800">Pago Móvil</span>
              <ul className="text-lg font-cormorant list-disc list-inside ml-2">
                <li>Banco Activo</li>
                <li>CI: 27.039.489</li>
                <li>Tel: 0424-272-1324</li>
              </ul>
            </div>
            <hr className="border-gray-300" />
            <div>
              <span className="block text-lg font-semibold font-cormorant text-gray-800">Facebank</span>
              <ul className="text-lg font-cormorant list-disc list-inside ml-2">
                <li>Beneficiario: Gabriela Mercedes Navarro Garban</li>
                <li>Número de cuenta: 77130002125</li>
              </ul>
            </div>
            <hr className="border-gray-300" />
            <div>
              <span className="block text-lg font-semibold font-cormorant text-gray-800">Zinli</span>
              <p className="text-lg font-cormorant ml-2">gabriela.mnavarro99@gmail.com</p>
            </div>
          </div>

          {/* Mensaje de agradecimiento */}
          <p className="text-lg font-cormorant text-justify">
            ¡Gracias por tu generosidad y apoyo en esta nueva etapa!
          </p>
        </section>

        {/* Photo Gallery Section */}
        <motion.section 
          className=""
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Names Section */}
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <div className="font-allura text-6xl md:text-7xl text-gray-700 tracking-wide">
              Alexander
            </div>
            <div className="w-24 h-px bg-gray-300 mx-auto my-4"></div>
            <div className="font-allura text-6xl md:text-7xl text-gray-700 tracking-wide">
              Gabriela
            </div>
          </motion.div>

          {/* Interactive Carousel */}
          <div className="relative">
            {/* Carousel Photo Layout */}
            <div className="flex items-center justify-center overflow-hidden">
              {/* Left Photo */}
              <motion.div 
                className="relative w-32 h-48 md:w-40 md:h-60 flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                key={`left-${currentImageIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                onClick={prevImage}
              >
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <Image
                  src={getVisibleImages().left.src}
                  alt={getVisibleImages().left.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>

              {/* Center Photo (Larger and Prominent) */}
              <motion.div 
                className="relative w-48 h-72 md:w-64 md:h-96 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl mx-4 z-10"
                key={`center-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-black/10 z-10"></div>
                <Image
                  src={getVisibleImages().center.src}
                  alt={getVisibleImages().center.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>

              {/* Right Photo */}
              <motion.div 
                className="relative w-32 h-48 md:w-40 md:h-60 flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                key={`right-${currentImageIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                onClick={nextImage}
              >
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <Image
                  src={getVisibleImages().right.src}
                  alt={getVisibleImages().right.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-gray-700 w-6' 
                      : 'bg-gray-300 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* RSVP Section */}
        <section className="text-center space-y-4 px-4">
          {/* Icon: Clipboard/Checkmark */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div className="font-script text-5xl text-gray-700 text-center">Confirmacion</div>
          <div className="text-lg font-cormorant text-justify">Por favor, confírmanos tu asistencia antes del <span className="font-semibold">15 de septiembre</span>. Si para esa fecha no hemos recibido tu confirmación entenderemos que no podrás acompañarnos.</div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2 font-cormorant">Nombre y Apellido</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-cormorant"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 font-cormorant">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="(___) ___-____"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-cormorant"
                required
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="asistencia"
                  value="si"
                  checked={formData.asistencia === 'si'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <label className="font-cormorant">Sí, asistiré</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="asistencia"
                  value="no"
                  checked={formData.asistencia === 'no'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <label className="font-cormorant">No podré asistir</label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-medium font-cormorant transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-[#22223b] text-white hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar asistencia'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-cormorant">¡Gracias! Tu confirmación ha sido enviada exitosamente.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-cormorant">
                  Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo o contacta directamente.
                </p>
              </div>
            )}
          </form>
        </section>

        {/* Special Note Section */}
        <section className="text-center space-y-4 px-4">
          {/* Icon: Star/Heart */}
          <div className="flex justify-center mb-2">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12 4.5 12 4.5C12 4.5 12.96 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z"/></svg>
          </div>
          <div className="font-script text-5xl text-gray-700 text-center">Nota Especial</div>
          <div className="text-lg font-cormorant text-justify">Este día será tan especial como quienes nos rodean. Queremos que cada momento esté lleno de emoción, de recuerdos imborrables, y de todo el cariño que siempre nos has brindado. Gracias por ser parte de nuestra historia.</div>
          <div className="font-script text-5xl text-gray-700 text-center pt-6">Te esperamos!</div>
        </section>

        {/* Bottom Image */}
        <div className="relative h-[80vh] bg-gray-200 overflow-hidden mt-8">
          <Image
            src="/images/boda2.jpg"
            alt="Alexander y Gabriela"
            fill
            className="object-cover grayscale"
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowConfirmationModal(false)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center relative"
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>

            {/* Success icon */}
            <motion.div
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="text-green-600"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.path d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-script text-3xl text-gray-700 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ¡Confirmación Enviada!
            </motion.h3>

            {/* Message */}
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="font-cormorant text-lg text-gray-600">
                Tu confirmación de asistencia ha sido enviada exitosamente a
              </p>
              <p className="font-allura text-2xl text-gray-700">
                Alexander & Gabriela
              </p>
              <p className="font-cormorant text-sm text-gray-500">
                ¡Gracias por ser parte de nuestro día especial!
              </p>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={() => setShowConfirmationModal(false)}
              className="bg-[#22223b] text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-cormorant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Perfecto
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 