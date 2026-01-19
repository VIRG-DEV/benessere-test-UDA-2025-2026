// ==========================================================================
// PROGETTO UDA 2025-2026: Test del Benessere Emotivo
// ==========================================================================
// Questo script gestisce tutta la logica del nostro sito web:
// 1. Le domande del test
// 2. I profili dei risultati
// 3. La navigazione tra le pagine (Home -> Test -> Risultati)
// 4. Il calcolo del punteggio finale
// ==========================================================================

// --------------------------------------------------------------------------
// 1. ELENCO DELLE DOMANDE
// Qui ho inserito tutte le 20 domande del test.
// Ogni domanda è un oggetto con:
// - id: numero identificativo
// - testo: la domanda vera e propria
// - opzioni: le 4 possibili risposte, ognuna con un punteggio da 1 a 4
// - categoria: per capire quale aspetto stiamo valutando (es. felicita, fisico...)
// --------------------------------------------------------------------------
const elencoDomande = [
  {
    id: 1,
    testo: "Come ti senti in questo periodo, in generale?",
    opzioni: [
      { testo: "Molto bene, sereno e positivo", punti: 4 },
      { testo: "Abbastanza bene, con qualche momento difficile", punti: 3 },
      { testo: "Così così, spesso mi sento giù", punti: 2 },
      { testo: "Male, quasi sempre triste o svuotato", punti: 1 }
    ],
    categoria: "felicita"
  },
  {
    id: 2,
    testo: "Quanto spesso provi un senso di benessere nella tua giornata?",
    opzioni: [
      { testo: "Quasi sempre, ogni giorno", punti: 4 },
      { testo: "Spesso, più volte alla settimana", punti: 3 },
      { testo: "Raramente", punti: 2 },
      { testo: "Quasi mai", punti: 1 }
    ],
    categoria: "felicita"
  },
  {
    id: 3,
    testo: "Quanto senti di avere controllo sulla tua felicità?",
    opzioni: [
      { testo: "Ho molto controllo sulla mia felicità", punti: 4 },
      { testo: "Abbastanza, riesco a influenzarla", punti: 3 },
      { testo: "Poco, mi sembra dipendere dagli eventi", punti: 2 },
      { testo: "Per niente, mi sento in balia delle situazioni", punti: 1 }
    ],
    categoria: "felicita"
  },
  {
    id: 4,
    testo: "Quanto spesso ti senti soddisfatto della tua vita?",
    opzioni: [
      { testo: "Molto soddisfatto/a", punti: 4 },
      { testo: "Abbastanza soddisfatto/a", punti: 3 },
      { testo: "Poco soddisfatto/a", punti: 2 },
      { testo: "Per niente soddisfatto/a", punti: 1 }
    ],
    categoria: "felicita"
  },
  {
    id: 5,
    testo: "Come valuti il tuo livello di energia negli ultimi giorni?",
    opzioni: [
      { testo: "Molto alta, mi sento pieno/a di energie", punti: 4 },
      { testo: "Abbastanza buona", punti: 3 },
      { testo: "Bassa, spesso mi sento stanco/a", punti: 2 },
      { testo: "Molto bassa, sono quasi sempre senza energie", punti: 1 }
    ],
    categoria: "fisico"
  },
  {
    id: 6,
    testo: "Quanto dormi bene la notte?",
    opzioni: [
      { testo: "Dormo bene e mi sveglio riposato/a", punti: 4 },
      { testo: "Dormo abbastanza bene", punti: 3 },
      { testo: "Dormo male, mi sveglio spesso stanco/a", punti: 2 },
      { testo: "Dormo molto male o quasi per niente", punti: 1 }
    ],
    categoria: "fisico"
  },
  {
    id: 7,
    testo: "Quanto la tua alimentazione influisce positivamente sul tuo umore?",
    opzioni: [
      { testo: "Molto, curo molto l'alimentazione", punti: 4 },
      { testo: "Abbastanza, cerco di mangiare in modo equilibrato", punti: 3 },
      { testo: "Poco, non ci faccio molto caso", punti: 2 },
      { testo: "Per niente, mangio spesso in modo disordinato", punti: 1 }
    ],
    categoria: "fisico"
  },
  {
    id: 8,
    testo: "Quanto spesso ti senti stanco o sovraccarico?",
    opzioni: [
      { testo: "Raramente, quasi mai", punti: 4 },
      { testo: "Qualche volta", punti: 3 },
      { testo: "Spesso", punti: 2 },
      { testo: "Quasi sempre", punti: 1 }
    ],
    categoria: "fisico"
  },
  {
    id: 9,
    testo: "Quanto spesso ti senti stressato?",
    opzioni: [
      { testo: "Raramente, quasi mai", punti: 4 },
      { testo: "Qualche volta", punti: 3 },
      { testo: "Spesso", punti: 2 },
      { testo: "Quasi sempre", punti: 1 }
    ],
    categoria: "emozioni"
  },
  {
    id: 10,
    testo: "Quanto ti senti sopraffatto dai compiti scolastici/lavorativi?",
    opzioni: [
      { testo: "Raramente, riesco a gestirli bene", punti: 4 },
      { testo: "Qualche volta mi sento in difficoltà", punti: 3 },
      { testo: "Spesso mi sento appesantito/a", punti: 2 },
      { testo: "Quasi sempre sono sopraffatto/a", punti: 1 }
    ],
    categoria: "emozioni"
  },
  {
    id: 11,
    testo: "Quanto ti senti in ansia durante la settimana?",
    opzioni: [
      { testo: "Quasi mai", punti: 4 },
      { testo: "Qualche volta", punti: 3 },
      { testo: "Spesso", punti: 2 },
      { testo: "Quasi sempre", punti: 1 }
    ],
    categoria: "emozioni"
  },
  {
    id: 12,
    testo: "Quanto ti è difficile calmarti quando sei agitato?",
    opzioni: [
      { testo: "Per niente difficile, riesco a calmarmi in fretta", punti: 4 },
      { testo: "Un po' difficile, ma ci riesco", punti: 3 },
      { testo: "Abbastanza difficile", punti: 2 },
      { testo: "Molto difficile, quasi mai ci riesco", punti: 1 }
    ],
    categoria: "emozioni"
  },
  {
    id: 13,
    testo: "Quanto ti senti supportato dalle persone intorno a te?",
    opzioni: [
      { testo: "Molto, mi sento molto supportato/a", punti: 4 },
      { testo: "Abbastanza", punti: 3 },
      { testo: "Poco", punti: 2 },
      { testo: "Per niente", punti: 1 }
    ],
    categoria: "relazioni"
  },
  {
    id: 14,
    testo: "Quanto ti senti a tuo agio a parlare dei tuoi problemi?",
    opzioni: [
      { testo: "Molto a mio agio", punti: 4 },
      { testo: "Abbastanza a mio agio", punti: 3 },
      { testo: "Poco a mio agio", punti: 2 },
      { testo: "Per niente a mio agio", punti: 1 }
    ],
    categoria: "relazioni"
  },
  {
    id: 15,
    testo: "Quanto ti senti parte del tuo gruppo (classe, amici, colleghi)?",
    opzioni: [
      { testo: "Molto, mi sento pienamente parte del gruppo", punti: 4 },
      { testo: "Abbastanza", punti: 3 },
      { testo: "Poco", punti: 2 },
      { testo: "Per niente", punti: 1 }
    ],
    categoria: "relazioni"
  },
  {
    id: 16,
    testo: "Quanto le relazioni positive migliorano il tuo umore?",
    opzioni: [
      { testo: "Molto, mi danno grande benessere", punti: 4 },
      { testo: "Abbastanza", punti: 3 },
      { testo: "Poco", punti: 2 },
      { testo: "Per niente", punti: 1 }
    ],
    categoria: "relazioni"
  },
  {
    id: 17,
    testo: "Quanto tempo passi online oltre allo studio/lavoro?",
    opzioni: [
      { testo: "Poco, meno di 1 ora al giorno", punti: 4 },
      { testo: "Circa 1-2 ore al giorno", punti: 3 },
      { testo: "Circa 3-4 ore al giorno", punti: 2 },
      { testo: "Più di 4 ore al giorno", punti: 1 }
    ],
    categoria: "digitale"
  },
  {
    id: 18,
    testo: "Come ti senti quando non puoi controllare il telefono?",
    opzioni: [
      { testo: "Tranquillo/a, non mi pesa", punti: 4 },
      { testo: "Un po' infastidito/a ma gestibile", punti: 3 },
      { testo: "In ansia o irritato/a", punti: 2 },
      { testo: "Molto agitato/a, non riesco a staccare", punti: 1 }
    ],
    categoria: "digitale"
  },
  {
    id: 19,
    testo: "Quanto i social media influenzano il tuo umore?",
    opzioni: [
      { testo: "Poco, il mio umore dipende da altro", punti: 4 },
      { testo: "Abbastanza, ma riesco a gestirlo", punti: 3 },
      { testo: "Molto, il mio umore cambia in base ai social", punti: 2 },
      { testo: "Moltissimo, sto bene o male in base ai social", punti: 1 }
    ],
    categoria: "digitale"
  },
  {
    id: 20,
    testo: "Quanto sarebbe difficile per te stare un’intera giornata senza usare il telefono o i social?",
    opzioni: [
      { testo: "Per niente difficile", punti: 4 },
      { testo: "Un po' difficile ma possibile", punti: 3 },
      { testo: "Abbastanza difficile", punti: 2 },
      { testo: "Quasi impossibile", punti: 1 }
    ],
    categoria: "digitale"
  }
];

// --------------------------------------------------------------------------
// 2. PROFILI DEI RISULTATI
// In base al punteggio totale, mostreremo uno di questi 4 profili.
// Ogni profilo ha un titolo, una descrizione e dei consigli specifici.
// --------------------------------------------------------------------------
const profiliRisultati = {
  eccellente: {
    titolo: "Equilibrio Eccellente",
    sottotitolo: "Il tuo benessere emotivo è in ottima forma! Continua così.",
    icona: "🌟",
    sfondoIcona: "var(--color-mint)",
    consigli: [
      {
        titolo: "Mantieni le tue abitudini",
        testo: "Le tue routine positive stanno funzionando. Continua a coltivare ciò che ti fa stare bene.",
        icona: "✨",
        sfondoIcona: "var(--color-mint)"
      },
      {
        titolo: "Condividi il tuo equilibrio",
        testo: "Puoi essere di ispirazione per gli altri. Considera di condividere le tue strategie.",
        icona: "💝",
        sfondoIcona: "var(--color-primary-light)"
      },
      {
        titolo: "Esplora nuovi orizzonti",
        testo: "Questo è il momento ideale per provare nuove esperienze e crescere ulteriormente.",
        icona: "🚀",
        sfondoIcona: "var(--color-accent-light)"
      }
    ]
  },
  buono: {
    titolo: "Buon Equilibrio",
    sottotitolo: "Stai andando bene! Ci sono alcune aree su cui puoi lavorare.",
    icona: "😊",
    sfondoIcona: "var(--color-secondary)",
    consigli: [
      {
        titolo: "Rafforza i tuoi punti di forza",
        testo: "Hai già buone basi. Concentrati su ciò che funziona e rendilo ancora più solido.",
        icona: "💪",
        sfondoIcona: "var(--color-secondary)"
      },
      {
        titolo: "Dedica tempo a te stesso",
        testo: "Ritagliati momenti quotidiani per attività che ti rigenerano e ti danno piacere.",
        icona: "🧘",
        sfondoIcona: "var(--color-lavender)"
      },
      {
        titolo: "Coltiva le relazioni",
        testo: "Investi del tempo nelle relazioni che ti fanno stare bene e ti supportano.",
        icona: "🤝",
        sfondoIcona: "var(--color-peach)"
      }
    ]
  },
  medio: {
    titolo: "Equilibrio in Costruzione",
    sottotitolo: "Ci sono aree importanti su cui lavorare. Non sei solo in questo percorso.",
    icona: "🌱",
    sfondoIcona: "var(--color-peach)",
    consigli: [
      {
        titolo: "Inizia con piccoli passi",
        testo: "Non cercare di cambiare tutto subito. Scegli una piccola abitudine positiva da implementare.",
        icona: "👣",
        sfondoIcona: "var(--color-peach)"
      },
      {
        titolo: "Gestisci lo stress",
        testo: "Prova tecniche di rilassamento come la respirazione profonda o brevi passeggiate.",
        icona: "🌿",
        sfondoIcona: "var(--color-mint)"
      },
      {
        titolo: "Chiedi supporto",
        testo: "Parlare con amici, familiari o un professionista può fare una grande differenza.",
        icona: "💬",
        sfondoIcona: "var(--color-accent-light)"
      }
    ]
  },
  attenzione: {
    titolo: "Attenzione al Benessere",
    sottotitolo: "Il tuo benessere emotivo richiede attenzione. È il momento di prenderti cura di te.",
    icona: "💙",
    sfondoIcona: "var(--color-lavender)",
    consigli: [
      {
        titolo: "Prenditi una pausa",
        testo: "Il tuo corpo e la tua mente hanno bisogno di riposo. Concediti del tempo per recuperare.",
        icona: "🛋️",
        sfondoIcona: "var(--color-lavender)"
      },
      {
        titolo: "Parla con qualcuno",
        testo: "Considera di parlare con un professionista della salute mentale. Chiedere aiuto è un segno di forza.",
        icona: "🩺",
        sfondoIcona: "var(--color-sky)"
      },
      {
        titolo: "Priorità al riposo",
        testo: "Cerca di migliorare la qualità del tuo sonno. È fondamentale per il benessere emotivo.",
        icona: "😴",
        sfondoIcona: "var(--color-secondary)"
      },
      {
        titolo: "Un giorno alla volta",
        testo: "Ricorda che ogni piccolo miglioramento conta. Sii gentile con te stesso in questo percorso.",
        icona: "🌅",
        sfondoIcona: "var(--color-primary-light)"
      }
    ]
  }
};

// --------------------------------------------------------------------------
// 3. VARIABILI DI STATO (MEMORIA)
// Qui teniamo traccia di cosa sta succedendo durante il test.
// --------------------------------------------------------------------------
let indiceDomandaCorrente = 0; // A che numero di domanda siamo? (0 = prima domanda)
let risposteUtente = {};       // Qui salviamo le risposte dell'utente (idDomanda: indiceRisposta)

// --------------------------------------------------------------------------
// 4. ELEMENTI HTML (DOM)
// Qui colleghiamo il codice JavaScript agli elementi che vediamo nella pagina.
// Usiamo i loro ID per trovarli.
// --------------------------------------------------------------------------
const schermataHome = document.getElementById('landingPage');
const schermataTest = document.getElementById('testPage');
const schermataRisultati = document.getElementById('resultsPage');

const contenitoreDomanda = document.getElementById('questionContainer');
const barraProgresso = document.getElementById('progressFill');
const testoProgresso = document.getElementById('progressText');

const pulsanteIndietro = document.getElementById('prevBtn');
const pulsanteAvanti = document.getElementById('nextBtn');
const pulsanteMenuMobile = document.getElementById('mobileMenuBtn');
const collegamentiMenu = document.getElementById('navLinks');
const barraNavigazione = document.getElementById('navbar');

// --------------------------------------------------------------------------
// 5. FUNZIONI DI NAVIGAZIONE
// Queste funzioni servono per spostarsi tra le schermate (Home, Test, Risultati).
// --------------------------------------------------------------------------

// Funzione chiamata quando clicchiamo su "Inizia il Test"
function startTest() {
  // Nascondiamo la home e mostriamo il test
  schermataHome.classList.add('hidden');
  schermataTest.classList.remove('hidden');
  schermataRisultati.classList.add('hidden');
  
  // Resettiamo il test da zero
  indiceDomandaCorrente = 0;
  risposteUtente = {};
  
  // Mostriamo la prima domanda e aggiorniamo la barra
  mostraDomanda();
  aggiornaProgresso();
  
  // Torniamo in cima alla pagina
  window.scrollTo(0, 0);
}

// Funzione per tornare indietro dalla schermata del test alla home
function goBack() {
  schermataTest.classList.add('hidden');
  schermataHome.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// Funzione per tornare alla home dai risultati
function goHome() {
  schermataRisultati.classList.add('hidden');
  schermataHome.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// Funzione per rifare il test
function retakeTest() {
  schermataRisultati.classList.add('hidden');
  startTest();
}

// --------------------------------------------------------------------------
// 6. FUNZIONI DEL TEST
// Qui c'è il cuore del funzionamento del quiz.
// --------------------------------------------------------------------------

// Questa funzione disegna la domanda corrente sullo schermo
function mostraDomanda() {
  const domanda = elencoDomande[indiceDomandaCorrente];
  const rispostaSelezionata = risposteUtente[domanda.id];
  
  // Creiamo l'HTML per la domanda e le sue opzioni
  contenitoreDomanda.innerHTML = `
    <span class="question-number">Domanda ${domanda.id} di ${elencoDomande.length}</span>
    <h2 class="question-text">${domanda.testo}</h2>
    <div class="options-list">
      ${domanda.opzioni.map((opzione, indice) => `
        <button 
          class="option-btn ${rispostaSelezionata === indice ? 'selected' : ''}"
          onclick="selezionaRisposta(${domanda.id}, ${indice})"
        >
          <span class="option-radio"></span>
          <span>${opzione.testo}</span>
        </button>
      `).join('')}
    </div>
  `;
}

// Funzione chiamata quando l'utente clicca su una risposta
function selezionaRisposta(idDomanda, indiceOpzione) {
  // Salviamo la risposta
  risposteUtente[idDomanda] = indiceOpzione;
  
  // Ridisegniamo la domanda per mostrare la selezione
  mostraDomanda();
  
  // Aggiorniamo i pulsanti (ora si può andare avanti)
  aggiornaPulsanti();
}

// Aggiorna la barra di avanzamento in alto
function aggiornaProgresso() {
  // Calcoliamo la percentuale completata
  const percentuale = ((indiceDomandaCorrente + 1) / elencoDomande.length) * 100;
  
  // Aggiorniamo la larghezza della barra colorata
  barraProgresso.style.width = `${percentuale}%`;
  
  // Aggiorniamo il testo (es. "1 di 20")
  testoProgresso.textContent = `${indiceDomandaCorrente + 1} di ${elencoDomande.length}`;
}

// Gestisce lo stato dei pulsanti "Indietro" e "Avanti"
function aggiornaPulsanti() {
  const domanda = elencoDomande[indiceDomandaCorrente];
  const haRisposto = risposteUtente[domanda.id] !== undefined;
  
  // Disabilita "Indietro" se siamo alla prima domanda
  pulsanteIndietro.disabled = indiceDomandaCorrente === 0;
  
  // Disabilita "Avanti" se non è stata data una risposta
  pulsanteAvanti.disabled = !haRisposto;
  
  // Se siamo all'ultima domanda, cambia il testo del pulsante in "Vedi Risultati"
  if (indiceDomandaCorrente === elencoDomande.length - 1) {
    pulsanteAvanti.innerHTML = `
      Vedi Risultati
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    `;
  } else {
    pulsanteAvanti.innerHTML = `
      Avanti
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    `;
  }
}

// Passa alla domanda successiva
function nextQuestion() {
  if (indiceDomandaCorrente < elencoDomande.length - 1) {
    // Incrementiamo l'indice
    indiceDomandaCorrente++;
    
    // Piccolo effetto di animazione (reset e restart)
    contenitoreDomanda.style.animation = 'none';
    contenitoreDomanda.offsetHeight; // Trucco per forzare il reflow
    contenitoreDomanda.style.animation = 'fadeInUp 0.5s ease';
    
    // Aggiorniamo tutto
    mostraDomanda();
    aggiornaProgresso();
    aggiornaPulsanti();
  } else {
    // Se era l'ultima domanda, calcoliamo e mostriamo i risultati
    mostraRisultati();
  }
}

// Torna alla domanda precedente
function prevQuestion() {
  if (indiceDomandaCorrente > 0) {
    indiceDomandaCorrente--;
    
    // Animazione
    contenitoreDomanda.style.animation = 'none';
    contenitoreDomanda.offsetHeight;
    contenitoreDomanda.style.animation = 'fadeInUp 0.5s ease';
    
    mostraDomanda();
    aggiornaProgresso();
    aggiornaPulsanti();
  }
}

// --------------------------------------------------------------------------
// 7. CALCOLO E VISUALIZZAZIONE RISULTATI
// --------------------------------------------------------------------------

// Calcola il punteggio finale e le statistiche per categoria
function calcolaRisultati() {
  let punteggioTotale = 0;
  const punteggiCategoria = {};
  
  elencoDomande.forEach(domanda => {
    const indiceRisposta = risposteUtente[domanda.id];
    
    // Se l'utente ha risposto a questa domanda
    if (indiceRisposta !== undefined) {
      const punti = domanda.opzioni[indiceRisposta].punti;
      punteggioTotale += punti;
      
      // Inizializziamo la categoria se non esiste ancora
      if (!punteggiCategoria[domanda.categoria]) {
        punteggiCategoria[domanda.categoria] = { totale: 0, conta: 0 };
      }
      
      // Aggiungiamo i punti alla categoria specifica
      punteggiCategoria[domanda.categoria].totale += punti;
      punteggiCategoria[domanda.categoria].conta++;
    }
  });
  
  // Calcolo percentuale totale (massimo possibile = numero domande * 4)
  const punteggioMassimo = elencoDomande.length * 4;
  const percentualeTotale = Math.round((punteggioTotale / punteggioMassimo) * 100);
  
  // Calcolo percentuali per ogni categoria
  const percentualiCategoria = {};
  for (const categoria in punteggiCategoria) {
    const { totale, conta } = punteggiCategoria[categoria];
    percentualiCategoria[categoria] = Math.round((totale / (conta * 4)) * 100);
  }
  
  return {
    punteggio: percentualeTotale,
    categorie: percentualiCategoria
  };
}

// Determina quale profilo assegnare in base al punteggio
function ottieniProfilo(punteggio) {
  if (punteggio >= 85) return profiliRisultati.eccellente;
  if (punteggio >= 65) return profiliRisultati.buono;
  if (punteggio >= 45) return profiliRisultati.medio;
  return profiliRisultati.attenzione;
}

// Mostra la pagina dei risultati
function mostraRisultati() {
  schermataTest.classList.add('hidden');
  schermataRisultati.classList.remove('hidden');
  window.scrollTo(0, 0);
  
  const risultati = calcolaRisultati();
  const profilo = ottieniProfilo(risultati.punteggio);
  
  // Aggiorniamo l'intestazione dei risultati
  document.getElementById('resultsIcon').innerHTML = profilo.icona;
  document.getElementById('resultsIcon').style.background = profilo.sfondoIcona;
  document.getElementById('resultsTitle').textContent = profilo.titolo;
  document.getElementById('resultsSubtitle').textContent = profilo.sottotitolo;
  
  // Animazione del numero del punteggio
  animarePunteggio(risultati.punteggio);
  
  // Mostriamo il dettaglio per categorie
  mostraDettaglioCategorie(risultati.categorie);
  
  // Mostriamo i consigli
  mostraConsigli(profilo.consigli);
}

function animarePunteggio(punteggioTarget) {
  const elementoNumero = document.getElementById('scoreNumber');
  const cerchioProgresso = document.getElementById('scoreProgress');
  
  // Impostiamo il gradiente se non c'è (per rendere il cerchio più carino)
  const cerchioScore = document.getElementById('scoreCircle');
  if (!document.getElementById('scoreGradient')) {
    const svg = cerchioScore.querySelector('svg');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:var(--color-primary)"/>
        <stop offset="100%" style="stop-color:var(--color-secondary)"/>
      </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);
  }
  
  // Animazione del conteggio numerico
  let conteggioAttuale = 0;
  const durata = 1500; // ms
  const incremento = punteggioTarget / (durata / 16); // 60fps circa
  
  function passoAnimazione() {
    conteggioAttuale += incremento;
    if (conteggioAttuale < punteggioTarget) {
      elementoNumero.textContent = Math.round(conteggioAttuale);
      requestAnimationFrame(passoAnimazione);
    } else {
      elementoNumero.textContent = punteggioTarget;
    }
  }
  
  // Avviamo l'animazione dopo un attimo
  setTimeout(() => {
    passoAnimazione();
    // Animiamo il cerchio SVG
    const circonferenza = 2 * Math.PI * 45; // raggio 45
    const offset = circonferenza - (punteggioTarget / 100) * circonferenza;
    cerchioProgresso.style.strokeDashoffset = offset;
  }, 300);
}

function mostraDettaglioCategorie(categorie) {
  const contenitore = document.getElementById('breakdownItems');
  
  // Etichette più leggibili per le categorie
  const nomiCategorie = {
    felicita: 'Felicità e Benessere',
    fisico: 'Benessere Fisico',
    emozioni: 'Emozioni e Stress',
    relazioni: 'Relazioni Sociali',
    digitale: 'Digitale e Umore'
  };
  
  const coloriCategorie = {
    felicita: 'var(--color-primary)',
    fisico: 'var(--color-secondary)',
    emozioni: 'var(--color-lavender)',
    relazioni: 'var(--color-peach)',
    digitale: 'var(--color-sky)'
  };
  
  contenitore.innerHTML = Object.entries(categorie).map(([cat, valore]) => `
    <div class="breakdown-item">
      <div class="breakdown-header">
        <span class="breakdown-label">${nomiCategorie[cat] || cat}</span>
        <span class="breakdown-value">${valore}%</span>
      </div>
      <div class="breakdown-bar">
        <div class="breakdown-fill" style="width: 0%; background: ${coloriCategorie[cat]};" data-width="${valore}"></div>
      </div>
    </div>
  `).join('');
  
  // Animiamo le barre orizzontali
  setTimeout(() => {
    document.querySelectorAll('.breakdown-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 500);
}

function mostraConsigli(listaConsigli) {
  const lista = document.getElementById('adviceList');
  lista.innerHTML = listaConsigli.map(consiglio => `
    <div class="advice-item">
      <div class="advice-icon" style="background: ${consiglio.sfondoIcona};">
        ${consiglio.icona}
      </div>
      <div class="advice-content">
        <h4>${consiglio.titolo}</h4>
        <p>${consiglio.testo}</p>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// 8. ANIMAZIONI AL SCROLL
// Gestisce l'apparizione degli elementi mentre scorriamo la pagina
// --------------------------------------------------------------------------
function gestisciAnimazioniScroll() {
  const elementi = document.querySelectorAll('[data-animate]');
  
  elementi.forEach((elemento, indice) => {
    const rettangolo = elemento.getBoundingClientRect();
    // Se l'elemento è visibile nella finestra
    const visibile = rettangolo.top < window.innerHeight - 100;
    
    if (visibile) {
      setTimeout(() => {
        elemento.classList.add('visible');
      }, indice * 100); // Ritardo a cascata
    }
  });
}

// Cambia l'aspetto della navbar quando scorriamo
function gestisciScrollNavbar() {
  if (window.scrollY > 50) {
    barraNavigazione.classList.add('scrolled');
  } else {
    barraNavigazione.classList.remove('scrolled');
  }
}

// --------------------------------------------------------------------------
// 9. MENU MOBILE
// --------------------------------------------------------------------------
function apriChiudiMenu() {
  pulsanteMenuMobile.classList.toggle('active');
  collegamentiMenu.classList.toggle('active');
}

// --------------------------------------------------------------------------
// 10. AVVIO DEGLI EVENTI
// Qui diciamo al browser di "ascoltare" le azioni dell'utente
// --------------------------------------------------------------------------

// Ascoltiamo lo scroll della pagina
window.addEventListener('scroll', () => {
  gestisciAnimazioniScroll();
  gestisciScrollNavbar();
});

// Ascoltiamo il click sul menu mobile
pulsanteMenuMobile.addEventListener('click', apriChiudiMenu);

// Chiudiamo il menu mobile se clicchiamo su un link
collegamentiMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    pulsanteMenuMobile.classList.remove('active');
    collegamentiMenu.classList.remove('active');
  });
});

// Appena la pagina è caricata, controlliamo le animazioni
document.addEventListener('DOMContentLoaded', () => {
  gestisciAnimazioniScroll();
});
