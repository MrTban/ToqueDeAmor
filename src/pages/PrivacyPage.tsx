export function PrivacyPage() {
  return (
    <main className='min-h-screen bg-white px-6 py-12 text-gray-800'>
      <div className='mx-auto max-w-3xl'>
        <header className='mb-10 text-center'>
          <p className='mb-2 text-sm font-semibold uppercase tracking-widest text-pink-600'>Toque de Amor</p>
          <h1 className='text-3xl font-bold text-gray-900 md:text-4xl'>Políticas y privacidad</h1>
          <p className='mt-4 text-gray-600'>
            Conoce las condiciones de reserva, entrega y domicilio de nuestros productos.
          </p>
        </header>

        <section className='space-y-6 rounded-2xl border border-pink-100 bg-pink-50 p-6 shadow-sm md:p-8'>
          <article>
            <h2 className='mb-2 text-xl font-semibold text-gray-900'>Política de pagos y reservas</h2>
            <p className='leading-7'>
              <strong>NO realizamos devolución de dinero.</strong> Puedes reservar tu dinero para una próxima ocasión o
              posponer la fecha de entrega, solicitándolo con un plazo mínimo de 48 horas antes.
            </p>
          </article>

          <article>
            <h2 className='mb-2 text-xl font-semibold text-gray-900'>Horario de entrega</h2>
            <p className='leading-7'>
              Contamos con una hora exacta de entrega. Sin embargo, debes tomar en cuenta el tráfico y los imprevistos
              que puedan presentarse en la carretera.
            </p>
          </article>

          <article>
            <h2 className='mb-2 text-xl font-semibold text-gray-900'>Entrega al destinatario</h2>
            <p className='leading-7'>
              Se esperará un <strong>MÁXIMO de 15 minutos</strong> a la hora de realizar la entrega. Si no es posible
              comunicarse con el destinatario, el regalo será devuelto y el cliente asumirá nuevamente el costo del
              envío.
            </p>
          </article>

          <article>
            <h2 className='mb-2 text-xl font-semibold text-gray-900'>Valor del domicilio</h2>
            <p className='leading-7'>
              <strong>El valor del domicilio es adicional al valor del producto.</strong>
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
