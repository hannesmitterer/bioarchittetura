# Bioarchitettura® - Abitare la Terra

La prima rivista italiana di bioarchitettura - Website ufficiale con 30 anni di eccellenza nell'architettura sostenibile.

## 🏗️ Panoramica del Progetto

Questo repository contiene il sito web moderno per **Bioarchitettura® - Abitare la Terra**, la storica rivista italiana fondata nel 1992 da Ugo Sasso e Wittfrida Mitterer. Il sito rappresenta 30 anni di leadership nell'architettura sostenibile italiana con oltre 1.699 articoli pubblicati da 1.254 autori esperti.

### ✨ Caratteristiche Principali

- **🎨 Design Moderno e Responsivo**: Interfaccia mobile-first con design system professionale
- **📚 Sistema di Gestione Contenuti**: Jekyll CMS per gestione dinamica di articoli e pubblicazioni
- **🛒 E-commerce Integrato**: Shop completo per abbonamenti, libri e corsi di formazione
- **♿ Accessibilità WCAG 2.1 AA**: Completamente accessibile per tutti gli utenti
- **⚡ Prestazioni Ottimizzate**: Caricamento veloce e ottimizzazione SEO
- **📱 Esperienza Mobile Eccellente**: Design responsive ottimizzato per tutti i dispositivi

## 🎯 Obiettivi del Sito

1. **Preservare il Patrimonio**: Digitalizzazione e valorizzazione di 30 anni di pubblicazioni
2. **Modernizzare l'Esperienza**: Interfaccia contemporanea mantenendo autorevolezza accademica
3. **Facilitare l'Accesso**: Migliorare la scoperta e fruizione dei contenuti
4. **Espandere la Comunità**: Attrarre nuovi lettori e professionisti del settore
5. **Supportare la Formazione**: Promuovere corsi e master specialistici

## 📊 Statistiche della Piattaforma

- **📖 152/153 Edizioni** pubblicate
- **🗓️ 30 Anni** di attività continuativa
- **📝 1.699 Articoli** di approfondimento
- **👥 1.254 Autori** esperti coinvolti
- **🎓 Partnership** con Università di Bologna
- **🌍 Rete Internazionale** di aziende e professionisti

## 🛠️ Stack Tecnologico

### Frontend
- **HTML5**: Markup semantico e accessibile
- **CSS3**: Design system con custom properties e grid layout
- **JavaScript (Vanilla)**: Funzionalità interattive senza dipendenze esterne
- **Web Fonts**: Source Sans Pro, Crimson Text per tipografia professionale

### Backend & CMS
- **Jekyll**: Generatore di siti statici per GitHub Pages
- **Markdown**: Formato di scrittura per contenuti
- **Liquid**: Template engine per dinamicità
- **YAML**: Configurazione e metadati

### Hosting & Deploy
- **GitHub Pages**: Hosting statico gratuito e affidabile
- **GitHub Actions**: CI/CD automatizzato (opzionale)
- **Cloudflare**: CDN per prestazioni globali (opzionale)

## 📁 Struttura del Progetto

```
bioarchittetura/
├── README.md                     # Documentazione principale
├── _config.yml                   # Configurazione Jekyll
├── .gitignore                    # File da escludere dal versioning
├── index.html                    # Homepage principale
├── shop.html                     # Pagina e-commerce
├── assets/
│   ├── css/
│   │   ├── style.css             # Stili principali (10.4KB)
│   │   └── shop.css              # Stili e-commerce (12.2KB)
│   └── js/
│       ├── main.js               # Funzionalità core (15.0KB)
│       └── shop.js               # Sistema e-commerce (26.2KB)
├── _rivista/                     # Collezione articoli rivista
│   └── edizione-152-153.md       # Ultima edizione
├── _master/                      # Collezione corsi formazione
│   └── casaclima-bioarchitettura.md
├── _news/                        # Collezione news e aggiornamenti
│   └── 2024-08-15-nuovo-protocollo-sostenibilita.md
├── assets/                       # Assets visivi e media
│   ├── images/
│   │   ├── logos/               # Logo Bioarchitettura®
│   │   ├── hero/                # Immagini hero e background
│   │   ├── content/             # Immagini contenuti (fondazione, master)
│   │   └── social/              # Immagini social media/Open Graph
│   └── ATTRIBUTION.md           # Documentazione asset e copyright
├── favicon.ico                   # Favicon del sito
├── executive-summary.md          # Analisi strategica per stakeholder
├── visual-design-guidelines.md   # Linee guida design system
└── website-design-analysis.md    # Analisi UX/UI completa
```

## 🚀 Installazione e Sviluppo

### Prerequisiti
- Git installato
- Ruby 2.7+ (per Jekyll)
- Bundler gem
- Editor di codice (VS Code raccomandato)

### Setup Locale

```bash
# 1. Clona il repository
git clone https://github.com/hannesmitterer/bioarchittetura.git
cd bioarchittetura

# 2. Installa Jekyll e dipendenze
gem install bundler jekyll
bundle install

# 3. Avvia il server di sviluppo
bundle exec jekyll serve --livereload

# 4. Apri il browser
open http://localhost:4000
```

### Comandi Utili

```bash
# Sviluppo con auto-reload
bundle exec jekyll serve --livereload --drafts

# Build per produzione
bundle exec jekyll build

# Verifica della build
bundle exec jekyll doctor

# Pulizia file temporanei
bundle exec jekyll clean
```

## 🎨 Design System

Il sito utilizza un design system coerente ispirato ai principi dell'architettura sostenibile:

### Palette Colori
- **🌲 Verde Primario**: `#2D5A3D` - Materialità naturale e sostenibilità
- **🏔️ Grigio Pietra**: `#6B7280` - Solidità architettonica
- **☁️ Azzurro Cielo**: `#3B82F6` - Chiarezza e innovazione
- **🧱 Terracotta**: `#DC6B4A` - Calore e tradizione costruttiva

### Tipografia
- **Intestazioni**: Source Sans Pro (moderna, professionale)
- **Corpo testo**: Crimson Text (leggibile, accademica)
- **Scala tipografica**: Sistema a 8 livelli per gerarchia chiara

### Griglia Layout
- **Sistema a 12 colonne**: Ispirato alle griglie architettoniche
- **Baseline 8px**: Ritmo verticale coerente
- **Breakpoint responsivi**: Mobile-first approach

### 🖼️ Visual Assets
Il sito integra asset visivi originali da www.bioarchitettura.org:
- **Logo ufficiale**: Bioarchitettura® PNG (86x50px) per header
- **Favicon**: Icona per browser tabs
- **Immagini hero**: Background di alta qualità per sezioni principali
- **Immagini contenuti**: Visual specifici per fondazione, master, etc.
- **Social media**: Immagini Open Graph per condivisione social

Tutti gli asset rispettano l'identità visiva della Fondazione Bioarchitettura® e sono documentati nel file `assets/ATTRIBUTION.md`.

## 🛒 Sistema E-commerce

### Funzionalità Shop
- **Catalogo Prodotti**: Abbonamenti, ebooks, libri, corsi
- **Carrello Persistente**: LocalStorage per sessioni multiple
- **Filtri Categoria**: Navigazione intuitiva prodotti
- **Checkout Semplificato**: Processo di acquisto ottimizzato
- **Notifiche Real-time**: Feedback immediato azioni utente

### Prodotti Disponibili
1. **Abbonamenti Rivista**: Cartaceo, digitale, regalo
2. **Ebooks Specialistici**: Guide tecniche e manuali
3. **Libri e Pubblicazioni**: Volumi celebrativi e atlanti
4. **Formazione**: Master, corsi, webinar accreditati

## 📝 Gestione Contenuti

### Collezioni Jekyll

#### Rivista (`_rivista/`)
Articoli e edizioni della rivista con metadati:
- Titolo, data, autori
- Categoria, tag, descrizione
- Immagine copertina, PDF download
- Featured per homepage

#### Master (`_master/`)
Corsi di formazione con informazioni:
- Durata, livello, prezzo
- Docenti, programma, certificazioni
- Date, modalità, requisiti
- Iscrizioni e materiali

#### News (`_news/`)
Aggiornamenti e novità settoriali:
- Eventi, normative, progetti
- Partnership, ricerche, pubblicazioni
- Comunicati stampa, interviste

## 🤝 Come Contribuire

### Per Content Manager
1. **Nuovi Articoli**: Crea file in `_rivista/` con frontmatter
2. **Eventi/News**: Aggiungi in `_news/` con data corrente
3. **Corsi**: Documenta in `_master/` con dettagli completi
4. **Media**: Ottimizza immagini prima dell'upload

### Per Sviluppatori
1. Fork del repository
2. Branch feature (`git checkout -b feature/nome-feature`)
3. Commit delle modifiche (`git commit -am 'Aggiunge feature'`)
4. Push del branch (`git push origin feature/nome-feature`)
5. Apertura Pull Request

## 📞 Supporto e Contatti

### Supporto Tecnico
- **Email**: dev@bioarchitettura.org
- **Telefono**: +39 0471 973097
- **Issues**: GitHub Issues per bug/richieste

### Contatti Istituzionali
- **Fondazione**: info@bioarchitettura.org
- **Redazione**: redazione@bioarchitettura.org
- **Abbonamenti**: abbonamenti@bioarchitettura.org
- **Master/Formazione**: master@bioarchitettura.org

---

**Bioarchitettura® - Abitare la Terra**  
*La prima rivista italiana di bioarchitettura dal 1992*

Website: https://hannesmitterer.github.io/bioarchittetura  
Repository: https://github.com/hannesmitterer/bioarchittetura

*Fondazione Italiana per la Bioarchitettura® e l'Antropizzazione Sostenibile dell'Ambiente*
