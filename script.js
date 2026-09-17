/* =====================================================
   EDITA AQUÍ: Fecha en que empezaron su relación
   Formato: 'YYYY-MM-DD'  (año-mes-día)
   ===================================================== */
const fechaInicio = new Date('2026-05-17T03:00:00');

/* =====================================================
   EDITA AQUÍ: contenido de las cartas
   Agrega o quita objetos según cuántos sobres tengas
   en el HTML (deben coincidir los "id" con data-carta).
   ===================================================== */
const cartas = {
  carta1: `mi amor, 
  quiero que sepas que eres la única persona en la que pienso eres mi primer pensamiento del día en la mañana y mi último pensamiento antes de dormir quiero que sepas que te amo con todo mi corazón y que siempre voy a estar aquí para ti, no importa los momentos difíciles siempre estaré aquí. Quiero que sepas que siempre te extraño, que veo algo que me recuerda a ti y quiero estar contigo, que escucho una canción que me recuerda a ti y quiero estar contigo cualquier cosa que me recuerde a ti me hace querer estar contigo y eso pasa siempre. Gracias por ser mi mayor compañía y mi motivación a seguir, eres mi vida deseo siempre estar a tu lado por toda la eternidad:3`,
  carta2: `Para nuestro mesiversario:
 
cielo!!
cómo estás espero estés muy bien y hayas tenido un lindo día. Quisiera comenzar por decirte que estoy muy agradecida por cada momento que hemos pasado estos cuatro meses de relación cada uno de esos momentos me ha hecho recordar la valiosa y maravillosa persona que eres y lo mucho que realmente te amo, gracias por todo lo que has hecho por mí, los pequeños detalles, las salidas, todo eso que me hace estar segura de qué eres la persona con la que quiero estar el resto de mi vida,,, quisiera compartir muchos más momentos contigo, que faltan demasiados y quiero que siga siendo así por el resto de mi vida. Gracias por ser mi compañía gracias por amarme, gracias por estar ahí cuando lo necesito y gracias por ser tu te amo:3`,
  carta3: `solo xq sí:
 
eres el hombre más increíble que he podido conocer en toda mi vida y yo sé que eso nunca va a cambiar. Te adoro y te amo mucho y sé que ese amor por ti nunca va a cambiar y va a aumentar con el pasar del tiempo eres una de las personas más importantes que tengo en mi vida, y te amo más de lo que las palabras lo pueden expresar. Estoy muy orgullosa de ti por todo lo que has logrado hasta ahora y sé que te esfuerzas demasiado y eso es algo que admiro mucho de ti, mi keke nunca te rindas yo estaré aquí para ti todo el tiempo todos los días a todas horas siempre en las buenas y en las malas, sin importar que suceda cada día contigo ha sido un regalo lleno de momentos inolvidables que siempre se quedarán en mi memoria, risas, las cuales quisiera volver a repetir toda mi vida aprendizajes que quiero seguir teniendo, y sobretodo el amor que nos brindamos el uno al otro, me siento afortunada de tenerte a mi lado y no puedo evitar emocionarme cuando pienso en nuestro futuro deseo estar contigo todo el resto de mi vida y construir mi camino junto a ti, estar acompañados y disfrutarnos el uno al otro, me haces sentir muchas cosas, cosas que no puedo explicar sólo con palabras y por eso decidí hacerte esto. Espero que te haya gustado. Te adoro dammm eres mi todo:3`
};
 
/* =====================================================
   FONDO DE CORAZONES FLOTANTES
   ===================================================== */
function crearCorazones() {
  const contenedor = document.getElementById('heartsBg');
  const emojis = ['💗', '💕', '🩷', '💖'];
  const cantidad = 18;
 
  for (let i = 0; i < cantidad; i++) {
    const heart = document.createElement('span');
    heart.classList.add('heart-float');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (8 + Math.random() * 10) + 's';
    heart.style.animationDelay = (Math.random() * 10) + 's';
    heart.style.fontSize = (16 + Math.random() * 20) + 'px';
    contenedor.appendChild(heart);
  }
}
crearCorazones();
 
/* =====================================================
   BOTÓN ABRIR REGALO -> pasa al contador
   ===================================================== */
document.getElementById('btnRegalo').addEventListener('click', () => {
  document.getElementById('screen-saludo').style.display = 'none';
  document.getElementById('screen-contador').style.display = 'flex';
});
 
/* =====================================================
   BOTONES "continuar" genéricos (usan data-next)
   ===================================================== */
document.querySelectorAll('.btn-continuar').forEach(btn => {
  btn.addEventListener('click', () => {
    const actual = btn.closest('.screen');
    const siguienteId = btn.getAttribute('data-next');
 
    // Pausa cualquier audio que siga sonando en la sección que se oculta
    actual.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
 
    actual.style.display = 'none';
    document.getElementById(siguienteId).style.display = 'flex';
  });
});
 
/* =====================================================
   CONTADOR DE TIEMPO JUNTOS
   ===================================================== */
function actualizarContador() {
  const ahora = new Date();
  let diff = ahora - fechaInicio; // milisegundos
 
  if (diff < 0) diff = 0;
 
  const segTotal = Math.floor(diff / 1000);
  const minTotal = Math.floor(segTotal / 60);
  const horaTotal = Math.floor(minTotal / 60);
  const diaTotal = Math.floor(horaTotal / 24);
 
  // Cálculo aproximado de años y meses
  let anios = ahora.getFullYear() - fechaInicio.getFullYear();
  let meses = ahora.getMonth() - fechaInicio.getMonth();
  let dias = ahora.getDate() - fechaInicio.getDate();
 
  if (dias < 0) {
    meses--;
    const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    anios--;
    meses += 12;
  }
 
  document.getElementById('c-anios').textContent = anios;
  document.getElementById('c-meses').textContent = meses;
  document.getElementById('c-dias').textContent = dias;
  document.getElementById('c-horas').textContent = horaTotal % 24;
  document.getElementById('c-min').textContent = minTotal % 60;
  document.getElementById('c-seg').textContent = segTotal % 60;
}
actualizarContador();
setInterval(actualizarContador, 1000);
 
/* =====================================================
   ANIMACIÓN DE FOTOS AL HACER SCROLL
   ===================================================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.classList.contains('rot1')
        ? 'rotate(-3deg) translateY(0)'
        : 'rotate(3deg) translateY(0)';
    }
  });
}, { threshold: 0.2 });
 
document.querySelectorAll('.polaroid').forEach(p => {
  p.style.opacity = '0';
  p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(p);
});
 
/* =====================================================
   BOTÓN "NO" QUE SE ESCAPA (imposible de elegir)
   ===================================================== */
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const contenedorPregunta = document.getElementById('preguntaBotones');
 
function moverBotonNo() {
  const contRect = contenedorPregunta.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
 
  const maxX = contRect.width - btnRect.width;
  const maxY = contRect.height - btnRect.height;
 
  const nuevoX = Math.random() * Math.max(maxX, 0);
  const nuevoY = Math.random() * Math.max(maxY, 0);
 
  btnNo.style.position = 'absolute';
  btnNo.style.left = nuevoX + 'px';
  btnNo.style.top = nuevoY + 'px';
}
 
// Escritorio: se mueve al pasar el mouse cerca
btnNo.addEventListener('mouseenter', moverBotonNo);
 
// Móvil: se mueve al intentar tocarlo
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moverBotonNo();
});
 
// Cada vez que "escapa", el botón "Sí" crece un poco (efecto divertido)
let tamanioSi = 1;
btnNo.addEventListener('mouseenter', () => {
  tamanioSi += 0.08;
  btnSi.style.transform = `scale(${tamanioSi})`;
});
 
// Botón "Sí" -> muestra la respuesta final
btnSi.addEventListener('click', () => {
  document.getElementById('preguntaBotones').style.display = 'none';
  document.getElementById('respuestaFinal').style.display = 'block';
});
 
/* =====================================================
   CARTAS: abrir y cerrar sobres
   ===================================================== */
const cartaModal = document.getElementById('cartaModal');
const cartaTexto = document.getElementById('cartaTexto');
 
document.querySelectorAll('.sobre').forEach(sobre => {
  sobre.addEventListener('click', () => {
    const id = sobre.getAttribute('data-carta');
    cartaTexto.textContent = cartas[id] || 'Escribe el contenido de esta carta en script.js';
    cartaModal.classList.add('activa');
  });
});
 
document.getElementById('cerrarCarta').addEventListener('click', () => {
  cartaModal.classList.remove('activa');
});
 
cartaModal.addEventListener('click', (e) => {
  if (e.target === cartaModal) {
    cartaModal.classList.remove('activa');
  }
});
 