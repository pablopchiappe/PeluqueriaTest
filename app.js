fetch('config.json')
  .then(r => r.json())
  .then(cfg => {
    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    const href = (id, url) => { const el = document.getElementById(id); if (el) el.href = url; };

    document.getElementById('page-title').textContent = cfg.nombre;
    document.querySelector('meta[name="description"]').content = cfg.descripcion ?? '';

    set('nav-nombre',   cfg.nombre);
    set('hero-nombre',  cfg.nombre);
    set('hero-slogan',  cfg.slogan);
    set('hero-desc',    cfg.descripcion ?? '');
    set('footer-nombre', cfg.nombre);

    href('nav-cta',   cfg.appUrl);
    href('hero-cta',  cfg.appUrl);
    href('footer-cta', cfg.appUrl);

    const ig = cfg.contacto?.instagram;
    if (ig) href('footer-ig', `https://instagram.com/${ig}`);

    // Servicios
    const grid = document.getElementById('grid-servicios');
    if (grid && cfg.servicios) {
      grid.innerHTML = cfg.servicios.map(s => `
        <div class="servicio-card">
          <div class="servicio-card__icono">${s.icono}</div>
          <h3 class="servicio-card__nombre">${s.nombre}</h3>
          <p class="servicio-card__desc">${s.descripcion}</p>
        </div>`).join('');
    }

    // Horarios
    const hl = document.getElementById('horarios-list');
    if (hl && cfg.horarios) {
      hl.innerHTML = cfg.horarios.map(h => `
        <li>
          <span class="dias">${h.dias}</span>
          <span class="hora">${h.horario}</span>
        </li>`).join('');
    }

    // Contacto
    const cl = document.getElementById('contacto-list');
    if (cl && cfg.contacto) {
      const c = cfg.contacto;
      const items = [];

      if (c.telefono)
        items.push(['📞', `<a href="tel:${c.telefono.replace(/\s/g,'')}">${c.telefono}</a>`]);

      if (c.whatsapp)
        items.push(['💬', `<a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`]);

      if (c.email)
        items.push(['✉️', `<a href="mailto:${c.email}">${c.email}</a>`]);

      if (c.instagram)
        items.push(['📷', `<a href="https://instagram.com/${c.instagram}" target="_blank" rel="noopener">@${c.instagram}</a>`]);

      if (c.direccion) {
        const mapHref = c.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(c.direccion)}`;
        items.push(['📍', `<a href="${mapHref}" target="_blank" rel="noopener">${c.direccion}</a>`]);
      }

      cl.innerHTML = items.map(([icon, content]) => `
        <li>
          <span class="icon">${icon}</span>
          <span>${content}</span>
        </li>`).join('');
    }
  })
  .catch(err => console.error('Error cargando config.json:', err));
