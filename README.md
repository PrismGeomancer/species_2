# SPECIES

**YOUR MEME IS ALIVE. THE MARKET IS ITS DNA.**

A local, build-free species discovery application using HTML, CSS, vanilla JavaScript, Three.js, Canvas, SVG and localStorage. Phantom and Solflare connect through their injected Solana providers. No backend or database is required.

## Run locally

From this folder:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open **http://localhost:8080**. A static HTTP server is required for reliable Canvas image export; do not use a `file://` URL. Three.js is vendored locally, and no external fonts or services are needed. Wallet connections require HTTPS or localhost. Use a wallet-enabled browser or an installed Phantom/Solflare extension.

## Try the product loop

1. Click **TRY $BONK**, or paste a contract into the hero. Recognized reference tickers and reference addresses open a specimen scan. Other addresses open the manual snapshot form.
2. Enter a name, ticker, market cap, ATH, volume, holders and age. Optionally upload a PNG, JPEG or WebP. Uploads are resized to 512 pixels and baked into a specimen treatment.
3. Watch the discovery sequence and open the species profile.
4. Explore its DNA and evolution timeline. Simulate a pump, crash, inactivity or returning activity; changes are saved locally. You can also edit market inputs directly.
5. Generate a PNL card using your entry market cap and SOL position, or choose a status/event card.
6. Export a **1200 × 675** or **1080 × 1080** PNG. **Share on X** opens prefilled copy; attach the downloaded image yourself.

## Included

- 15 recognizable reference tokens, 3 extinct specimens and a resurrection example.
- Original token reference images on profiles, with click-to-enlarge; uploaded source images for custom species.
- Original local organism illustrations and the user-supplied `assets/logo/logo-new.jpg` symbol with a custom SPECIES wordmark.
- A smooth four-form hero evolution replay: cell → emergent → adapting → mature, with pause/resume and replay controls. Plays once, pauses off-screen and respects reduced motion.
- Three.js cell membranes, a DNA helix, containment rings and data pulses. Reduced mobile complexity and illustrated fallback if WebGL is unavailable.
- Ecosystem filters, search, detailed profiles, evolution histories, graveyard, leaderboards, favorites and My Species.
- Deterministic evolution rules centralized in `js/evolution.js`.
- Real Phantom and Solflare connections, wallet-address keeper identities, account-change handling and disconnect.
- Persistent custom species, uploaded/generated art, positions, history, card settings, wallet profiles and saved market scenarios.
- Seven Canvas card types: My PNL, Species Status, New Evolution, ATH, Mutation, Survival and Resurrection.
- Optional feature-detected WebMCP read, profile navigation and discovery-start tools. These are not needed to use the application.

## Wallet profiles

Choose **Connect Wallet → Phantom / Solflare** and approve access in the wallet. The returned Solana public key selects the keeper profile. Display names, custom species, favorites, market scenarios, positions and activity are stored separately for each address. Using the same address through either provider opens the same profile.

Disconnect returns to the guest archive. Existing collections remain in that guest archive after migration. Reset Archive clears only the current profile. Downloads also export the current profile only.

Phantom reconnects silently on reload when the site is already trusted. Solflare restores an already-connected injected provider; otherwise choose Connect Wallet again. Mobile users can open the site inside the wallet’s app browser. Installation links appear when the wallet is unavailable.

Profiles remain local to this browser and origin. Connection provides a public key; it does not synchronize devices, authenticate a server session or automatically import holdings. PNL positions still use manual inputs.

Implementation references: [Phantom connection API](https://docs.phantom.com/solana/establishing-a-connection), [Phantom provider detection](https://docs.phantom.com/solana/detecting-the-provider), and [Solflare wallet integration](https://docs.solflare.com/solflare/technical/integrate-solflare/solflare-wallet-sdk).

## Data and behavior

`js/data.js` is the source of reference snapshots. Values and reference contract identifiers are fictional; there are no claims of affiliation, verified addresses or live market access. An arbitrary entered CA is not checked against Pump.fun.

Generation depends on achieved market-cap thresholds. Previously achieved generations survive a crash; drawdowns change health and mutations. Same normalized CA and ticker generate the same base identity. Time stamps record discovery and events; they do not randomize the organism.

PNL is approximately `(current market cap / entry market cap - 1) × 100`, assuming unchanged token supply. SOL gain applies that ratio to the manually entered SOL position. Fees, slippage, supply changes and SOL/USD price changes are excluded. Optional entry price is stored for reference.

**Settings → Download Archive** exports a JSON copy of your species, positions, preferences and profile. Existing saved collections migrate automatically to the archive storage namespace.

Storage is browser- and origin-specific. Use the same localhost address and port to keep your archive. Uploads are compressed/resized, and storage failures show a notice instead of silently discarding data. **Settings → Reset Archive** clears the current profile’s archive after confirmation, keeping the wallet connection and other profiles.

## Files

- `index.html` — shared navigation, dialogs and footer
- `css/style.css` — responsive interface and motion
- `js/app.js` — views, discovery sequence and interactions
- `js/data.js` — all reference specimens and historical event data
- `js/species.js` — specimen cards, filters and uploaded-image treatment
- `js/evolution.js` — thresholds, deterministic interpretation and simulation
- `js/storage.js` — persistence and shared formatting helpers
- `js/wallet.js` — Phantom/Solflare connections and keeper sessions
- `js/cards.js` — PNL calculation, full-resolution PNG rendering and X intents
- `js/hero-evolution.js` — continuous SVG anatomy morph and hero replay controls
- `js/three-scene.js` — habitat renderer and lifecycle cleanup
- `js/agent-tools.js` — optional WebMCP integration
- `assets/` — logos, original organisms and vendored Three.js

See [QA.md](QA.md) for browser verification.
