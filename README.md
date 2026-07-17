# Oficio — La red de los que laburan bien

Maqueta (MVP visual) de una red social local de oficios para **La Plata**:
descubrí albañiles, electricistas, plomeros, gasistas y pintores, mirá sus
trabajos reales, reseñas verificadas y disponibilidad. Sin fricción: se navega
todo **sin registrarte**.

> ⚠️ Prototipo con **datos falsos**. No hay backend, pagos ni cuentas reales.
> El objetivo es validar la *sensación* de uso.

## Qué se puede probar

- **Inicio (Feed):** trabajos reales cerca tuyo, filtrables por oficio.
- **Mapa:** profesionales de tu zona con pins, filtros y "verificados".
- **Buscar:** escribís en lenguaje natural ("pérdida de agua urgente") y
  detecta el oficio.
- **Perfil:** la "carrera" del profesional — trabajos, reseñas, matrícula,
  recomendaciones de colegas, disponibilidad.
- **Detalle de trabajo:** foto, ficha, reseña verificada y "Pedir un trabajo
  parecido".
- **Guardados:** profesionales a mano para cuando los necesites.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Deploy en Vercel

## Correr local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000
