// ======================
// 1) Mapa base
// ======================
const map = L.map("map", {
  zoomControl: true,
  minZoom: 4,
  maxZoom: 12
}).setView([40.2, -3.7], 6);

// Base tiles (OSM). Puedes cambiar a otro proveedor si quieres.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ======================
// 2) Datos (GeoJSON demo)
// ======================
// NOTA: Son polígonos aproximados para que el visor funcione.
// Luego sustituimos por un GeoJSON riguroso sin tocar la app.
const geoData = {
  "type":"FeatureCollection",
  "features":[
    // Montañas (aprox)
    featurePoly("Cordillera Cantábrica", "montanas",
      [[43.65,-8.9],[43.75,-7.4],[43.55,-5.6],[43.15,-3.1],[43.20,-1.4],[43.55,-1.6],[43.65,-8.9]],
      "Barrera al flujo atlántico; potencia precipitación orográfica al N y genera sombras pluviométricas al S.",
      ["Orografía", "Nubes de retención", "Sombras de lluvia"]
    ),
    featurePoly("Pirineos", "montanas",
      [[43.35,-1.9],[43.45,0.2],[43.50,1.3],[43.40,2.7],[42.90,3.1],[42.70,2.2],[42.75,1.0],[42.85,-0.2],[43.05,-1.2],[43.35,-1.9]],
      "Alta montaña: nieve, barrera a masas de aire y fuerte contraste N-S (foehn).",
      ["Nieve", "Foehn", "Gradientes térmicos"]
    ),
    featurePoly("Sistema Central", "montanas",
      [[41.20,-6.2],[41.30,-5.2],[41.10,-4.1],[40.80,-3.3],[40.35,-2.8],[40.15,-3.6],[40.25,-4.7],[40.55,-5.8],[41.20,-6.2]],
      "Divide mesetas y favorece inversiones, heladas y diferencias de precipitación entre vertientes.",
      ["Inversiones", "Heladas", "Orografía"]
    ),
    featurePoly("Sistema Ibérico", "montanas",
      [[42.40,-2.3],[42.25,-1.2],[42.05,0.0],[41.55,0.7],[40.95,0.5],[40.55,-0.2],[40.25,-1.2],[40.55,-2.2],[41.30,-2.6],[42.40,-2.3]],
      "Canaliza vientos y separa influencias atlánticas/mediterráneas; clave en episodios de cierzo y nevadas interiores.",
      ["Cierzo (indirecto)", "Nevadas interiores", "Canalización"]
    ),
    featurePoly("Costero-Catalana (Prelitoral)", "montanas",
      [[42.10,0.8],[42.10,1.7],[41.85,2.5],[41.25,2.9],[40.75,2.3],[40.85,1.4],[41.35,0.9],[42.10,0.8]],
      "Influye en brisas, retención de humedad y episodios de lluvia intensa en fachada NE.",
      ["Brisas", "Lluvias intensas", "Retención orográfica"]
    ),
    featurePoly("Costero-Catalana (Litoral)", "montanas",
      [[41.95,1.9],[41.90,2.7],[41.35,3.2],[40.95,2.6],[41.05,2.0],[41.45,1.8],[41.95,1.9]],
      "Cordón cercano a costa: modula tormentas costeras y convergencias con brisas mar-tierra.",
      ["Convergencias", "Tormentas", "Brisas"]
    ),
    featurePoly("Béticas (Subbético)", "montanas",
      [[38.70,-4.9],[38.55,-3.7],[38.25,-2.3],[37.85,-1.6],[37.35,-2.2],[37.10,-3.2],[37.35,-4.6],[38.05,-5.0],[38.70,-4.9]],
      "Relieve complejo: favorece tormentas, retenciones y fuertes contrastes locales.",
      ["Tormentas", "Sombras", "Contrastes locales"]
    ),
    featurePoly("Béticas (Penibético / Sierra Nevada)", "montanas",
      [[37.25,-3.9],[37.20,-3.1],[37.05,-2.4],[36.75,-2.3],[36.65,-3.2],[36.80,-3.9],[37.25,-3.9]],
      "Alta montaña del sur: nieve, vientos fuertes y efecto barrera frente a entradas mediterráneas.",
      ["Nieve", "Viento fuerte", "Barrera orográfica"]
    ),

    // Mesetas (aprox)
    featurePoly("Submeseta Norte (Cuenca del Duero)", "mesetas",
      [[42.80,-7.2],[42.90,-6.0],[42.60,-4.7],[42.35,-3.0],[41.75,-2.8],[41.05,-3.4],[41.00,-5.4],[41.40,-6.9],[42.20,-7.6],[42.80,-7.2]],
      "Frecuentes inversiones térmicas y heladas en invierno; nieblas persistentes en situaciones anticiclónicas.",
      ["Nieblas", "Heladas", "Inversiones"]
    ),
    featurePoly("Submeseta Sur (La Mancha)", "mesetas",
      [[40.55,-5.4],[40.70,-4.2],[40.40,-2.2],[39.70,-1.2],[38.95,-1.6],[38.80,-3.2],[39.25,-4.8],[40.00,-5.8],[40.55,-5.4]],
      "Continentalidad marcada: veranos muy cálidos, grandes amplitudes y episodios de polvo/sahariano en algunas advecciones.",
      ["Continentalidad", "Olas de calor", "Amplitud térmica"]
    ),

    // Depresiones (aprox)
    featurePoly("Depresión del Ebro (Valle del Ebro)", "depresiones",
      [[42.55,-2.2],[42.60,-1.0],[42.35,0.4],[41.95,1.5],[41.25,1.2],[41.15,0.2],[41.30,-1.2],[41.70,-2.4],[42.20,-2.7],[42.55,-2.2]],
      "Gran corredor: canaliza vientos (cierzo) y modula temperaturas; nieblas y estabilidad frecuentes en invierno.",
      ["Cierzo", "Nieblas", "Canalización"]
    ),
    featurePoly("Depresión del Guadalquivir", "depresiones",
      [[38.30,-6.6],[38.10,-5.3],[37.75,-4.2],[37.25,-3.0],[36.85,-2.9],[36.60,-4.0],[36.60,-5.8],[37.05,-6.8],[37.80,-7.0],[38.30,-6.6]],
      "Entrada atlántica + valle abierto: calor intenso en verano y episodios de lluvia con frentes en otoño-invierno.",
      ["Frentes", "Calor intenso", "Convección"]
    ),
    featurePoly("Depresión del Duero (núcleo)", "depresiones",
      [[42.55,-5.9],[42.50,-4.6],[42.10,-3.9],[41.60,-4.1],[41.55,-5.2],[42.00,-6.0],[42.55,-5.9]],
      "Zona proclive a nieblas radiativas e inversiones en invierno; bajas mínimas nocturnas.",
      ["Nieblas radiativas", "Mínimas", "Inversiones"]
    ),

    // Mar (polígonos “marítimos” aproximados)
    featurePoly("Mar Cantábrico", "mar",
      [[44.10,-9.6],[44.10,-1.1],[43.40,-1.1],[43.40,-9.6],[44.10,-9.6]],
      "Influencia oceánica: suaviza temperaturas, aporta humedad y alimenta frentes del W-NW.",
      ["Frentes", "Humedad", "Temperaturas suaves"]
    ),
    featurePoly("Mar Mediterráneo", "mar",
      [[41.60,0.6],[41.60,4.5],[36.00,4.5],[36.00,-0.2],[38.20,0.6],[41.60,0.6]],
      "Fuente de humedad: clave en temporales de levante y episodios de lluvia intensa en costa.",
      ["Levante", "Lluvias intensas", "Humedad"]
    ),
    featurePoly("Mar de Alborán", "mar",
      [[37.60,-6.3],[37.60,-1.3],[35.70,-1.3],[35.70,-6.3],[37.60,-6.3]],
      "Zona de intercambios Atlántico-Mediterráneo; vientos y humedad relevantes para el sur peninsular.",
      ["Viento", "Humedad", "Intercambio masas de aire"]
    ),
    featurePoly("Golfo de Cádiz", "mar",
      [[37.30,-9.6],[37.30,-6.0],[35.80,-6.0],[35.80,-9.6],[37.30,-9.6]],
      "Entrada atlántica para Andalucía occidental; temporales y oleaje en situaciones de poniente.",
      ["Poniente", "Temporales", "Oleaje"]
    ),
  ]
};

function featurePoly(name, layerKey, latlngs, importance, examples){
  return {
    type:"Feature",
    properties:{
      name,
      layer: layerKey,
      typeLabel: typeLabel(layerKey),
      description: shortDesc(layerKey),
      importance,
      examples
    },
    geometry:{
      type:"Polygon",
      coordinates:[ latlngs.map(([lat,lng]) => [lng,lat]) ] // GeoJSON: [lng,lat]
    }
  };
}

function typeLabel(k){
  return ({
    montanas:"Sistemas montañosos",
    mesetas:"Mesetas y altiplanos",
    depresiones:"Depresiones y valles",
    mar:"Zonas marítimas"
  })[k] || "—";
}

function shortDesc(k){
  return ({
    montanas:"Relieves que modifican el viento, la nubosidad y la precipitación (efecto barrera, foehn, sombras).",
    mesetas:"Superficies altas interiores con continentalidad; nieblas e inversiones frecuentes en anticiclón.",
    depresiones:"Corredores y cuencas que canalizan vientos y favorecen acumulación de aire frío y nieblas.",
    mar:"Áreas fuente de humedad, regulación térmica y alimentación de temporales costeros."
  })[k] || "";
}

// ======================
// 3) Capas Leaflet por tipo
// ======================
const palette = {
  montanas: { fill: "rgba(205, 92, 92, 0.35)", stroke: "rgba(205, 92, 92, 0.85)" },
  mesetas:  { fill: "rgba(218, 165, 32, 0.28)", stroke: "rgba(218, 165, 32, 0.85)" },
  depresiones:{ fill:"rgba(60, 179, 113, 0.22)", stroke:"rgba(60, 179, 113, 0.85)" },
  mar:      { fill: "rgba(30, 144, 255, 0.20)", stroke: "rgba(30, 144, 255, 0.80)" }
};

const layerGroups = {
  montanas: L.layerGroup().addTo(map),
  mesetas: L.layerGroup().addTo(map),
  depresiones: L.layerGroup().addTo(map),
  mar: L.layerGroup().addTo(map)
};

let selectedLayer = null;

function styleFor(feature){
  const k = feature.properties.layer;
  const p = palette[k] || palette.montanas;
  return {
    color: p.stroke,
    weight: 2,
    fillColor: p.fill,
    fillOpacity: 1
  };
}

function onEachFeature(feature, layer){
  layer.on("click", () => selectFeature(feature, layer));
  layer.bindTooltip(feature.properties.name, { sticky:true, opacity:0.95 });
}

const geoLayer = L.geoJSON(geoData, {
  style: styleFor,
  onEachFeature
});

geoLayer.eachLayer(l => {
  const k = l.feature?.properties?.layer;
  if (k && layerGroups[k]) layerGroups[k].addLayer(l);
});

// ======================
// 4) Panel de info
// ======================
const infoTitle = document.getElementById("infoTitle");
const infoType  = document.getElementById("infoType");
const infoDesc  = document.getElementById("infoDesc");
const infoImp   = document.getElementById("infoImp");
const infoExamples = document.getElementById("infoExamples");

function selectFeature(feature, layer){
  if (selectedLayer) {
    // reset previous
    selectedLayer.setStyle({ weight: 2 });
  }
  selectedLayer = layer;
  layer.setStyle({ weight: 4 });

  infoTitle.textContent = feature.properties.name;
  infoType.textContent  = feature.properties.typeLabel;
  infoDesc.textContent  = feature.properties.description;
  infoImp.textContent   = feature.properties.importance;

  infoExamples.innerHTML = "";
  (feature.properties.examples || []).forEach(t => {
    const el = document.createElement("span");
    el.className = "tag";
    el.textContent = t;
    infoExamples.appendChild(el);
  });

  // zoom suave al elemento
  try { map.fitBounds(layer.getBounds(), { padding:[30,30] }); } catch {}

  // actualizar URL compartible
  updateURLState({ selected: feature.properties.name });
}

// ======================
// 5) Toggles de capas
// ======================
document.querySelectorAll('input[type="checkbox"][data-layer]').forEach(cb => {
  cb.addEventListener("change", () => {
    const key = cb.getAttribute("data-layer");
    if (!layerGroups[key]) return;

    if (cb.checked) layerGroups[key].addTo(map);
    else map.removeLayer(layerGroups[key]);

    updateURLState({}); // guarda estado capas
  });
});

// ======================
// 6) Búsqueda
// ======================
const searchInput = document.getElementById("searchInput");
document.getElementById("searchBtn").addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});

function doSearch(){
  const q = (searchInput.value || "").trim().toLowerCase();
  if (!q) return;

  let found = null;
  geoLayer.eachLayer(layer => {
    const name = layer.feature?.properties?.name?.toLowerCase() || "";
    if (name.includes(q)) found = layer;
  });

  if (found) {
    selectFeature(found.feature, found);
  } else {
    // feedback simple
    infoTitle.textContent = "No encontrado";
    infoType.textContent = "—";
    infoDesc.textContent = "Prueba otro término (por ejemplo: Ebro, Pirineos, Guadalquivir…).";
    infoImp.textContent = "";
    infoExamples.innerHTML = "";
  }
}

// ======================
// 7) Compartir enlace (capas + selección)
// ======================
document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    flashButton("shareBtn", "¡Copiado!");
  } catch {
    prompt("Copia este enlace:", url);
  }
});

function flashButton(id, text){
  const btn = document.getElementById(id);
  const old = btn.textContent;
  btn.textContent = text;
  setTimeout(() => btn.textContent = old, 900);
}

function getLayerState(){
  const state = {};
  document.querySelectorAll('input[type="checkbox"][data-layer]').forEach(cb => {
    state[cb.dataset.layer] = cb.checked ? 1 : 0;
  });
  return state;
}

function updateURLState(extra){
  const layers = getLayerState();
  const selectedName = extra.selected ?? getSelectedNameFromUI();

  const params = new URLSearchParams();
  params.set("layers", Object.entries(layers).map(([k,v]) => `${k}:${v}`).join(","));
  if (selectedName) params.set("sel", selectedName);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function getSelectedNameFromUI(){
  const t = infoTitle.textContent || "";
  if (!t || t === "Selecciona una zona" || t === "No encontrado") return "";
  return t;
}

function applyURLState(){
  const params = new URLSearchParams(window.location.search);
  const layersParam = params.get("layers");
  const sel = params.get("sel");

  // capas
  if (layersParam) {
    const items = layersParam.split(",");
    const mapState = {};
    items.forEach(it => {
      const [k,v] = it.split(":");
      if (k) mapState[k] = (v === "1");
    });

    document.querySelectorAll('input[type="checkbox"][data-layer]').forEach(cb => {
      const k = cb.dataset.layer;
      if (k in mapState) {
        cb.checked = mapState[k];
        if (cb.checked) layerGroups[k].addTo(map);
        else map.removeLayer(layerGroups[k]);
      }
    });
  }

  // selección
  if (sel) {
    const target = sel.toLowerCase();
    let found = null;
    geoLayer.eachLayer(layer => {
      const name = layer.feature?.properties?.name?.toLowerCase() || "";
      if (name === target) found = layer;
    });
    if (found) selectFeature(found.feature, found);
  }
}

applyURLState();
updateURLState({}); // inicializa URL si no hay params
