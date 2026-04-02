<script>
  // @ts-nocheck
  import { SAMPLES, UI, analyzeRecord } from '$lib/analyzer.js';

  // ── State ──────────────────────────────────────────────
  let lang      = 'id'; // 'en' | 'id'
  let inputText = '';
  let readLevel = 'standard';
  let focusArea = 'all';
  let loading   = false;
  let result    = null;
  let error     = null;
  let wordsBefore = 0;
  let wordsAfter  = 0;
  let copied    = false;
  let activeTab = 'input';
  let langSwitching = false; // animation flag

  $: t = UI[lang];
  $: sampleKeys = Object.keys(SAMPLES);

  // ── Language toggle ───────────────────────────────────
  async function toggleLang() {
    langSwitching = true;
    await new Promise(r => setTimeout(r, 200));
    lang = lang === 'en' ? 'id' : 'en';
    // Clear result when switching — it was in the old language
    if (result) {
      result = null;
      activeTab = 'input';
    }
    await new Promise(r => setTimeout(r, 50));
    langSwitching = false;
  }

  // ── Actions ───────────────────────────────────────────
  function loadSample(key) {
    inputText = SAMPLES[key].text;
    activeTab = 'input';
  }

  async function handleAnalyze() {
    if (!inputText.trim() || loading) return;
    loading = true;
    error   = null;
    result  = null;

    try {
      const res = await analyzeRecord(inputText, readLevel, focusArea, lang);
      result      = res;
      wordsBefore = res.wordsBefore;
      wordsAfter  = res.wordsAfter;
      activeTab   = 'result';
    } catch (e) {
      error = e.message || (lang === 'id' ? 'Terjadi kesalahan. Coba lagi.' : 'Something went wrong. Please try again.');
    } finally {
      loading = false;
    }
  }

  function handleCopy() {
    if (!result) return;
    const text = [
      result.title,
      '',
      ...result.sections.map(s => `${s.heading}\n${s.content}`)
    ].join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => { copied = false; }, 2000);
    });
  }

  function handleReset() {
    result    = null;
    error     = null;
    activeTab = 'input';
  }

  $: reduction = wordsBefore > 0 ? Math.round(((wordsBefore - wordsAfter) / wordsBefore) * 100) : 0;
  $: readTime  = wordsAfter  > 0 ? Math.max(1, Math.round(wordsAfter / 200)) : 0;

  const urgencyConfig = {
    routine: { color: '#1a6b50', bg: '#e8f4ef' },
    monitor: { color: '#8a5200', bg: '#f5e8d0' },
    urgent:  { color: '#b84a35', bg: '#f0e0da' }
  };

  const sectionIcons = {
    diagnosis: '◈', medications: '⊕',
    findings: '◉',  followup: '◎', lifestyle: '◐'
  };
</script>

<div class="app" class:switching={langSwitching}>

  <!-- ── Header ── -->
  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">
        <div class="logo-mark">
          <span class="logo-emoji">🏥</span>
        </div>
        <div class="logo-text">
          <span class="logo-name">Neural Scribe</span>
          <span class="logo-tagline">{t.tagline}</span>
        </div>
      </a>

      <div class="header-right">
        <!-- Language toggle -->
        <button class="lang-toggle" on:click={toggleLang} aria-label="Toggle language" title="Ganti Bahasa / Change Language">
          <span class="lang-flag">{lang === 'en' ? '🇬🇧' : '🇮🇩'}</span>
          <div class="lang-track">
            <div class="lang-knob" class:id={lang === 'id'}></div>
            <span class="lang-opt" class:active={lang === 'en'}>EN</span>
            <span class="lang-opt" class:active={lang === 'id'}>ID</span>
          </div>
          <span class="lang-flag">{lang === 'en' ? '🇮🇩' : '🇬🇧'}</span>
        </button>

        <div class="header-badge">{t.badge}</div>
      </div>
    </div>
  </header>

  <!-- ── Hero ── -->
  <section class="hero">
    <div class="doodles-bg">
      <div class="doodle doodle-1">💉</div>
      <div class="doodle doodle-2">🩺</div>
      <div class="doodle doodle-3">💊</div>
      <div class="doodle doodle-4">🏥</div>
      <div class="doodle doodle-5">❤️</div>
    </div>
    <div class="hero-inner" class:fade={langSwitching}>
      <p class="hero-eyebrow">{t.eyebrow}</p>
      <h1 class="hero-title">{t.heroLine1}<br /><em>{t.heroLine2}</em></h1>
      <p class="hero-desc">{t.heroDesc}</p>
    </div>
  </section>

  <!-- ── Workspace ── -->
  <main class="workspace">

    <!-- Input panel -->
    <div class="panel input-panel" class:hidden={activeTab === 'result' && result}>

      <div class="panel-head">
        <span class="panel-label">📝 {t.panelLabel}</span>
        <span class="char-count">{inputText.length}</span>
      </div>

      <div class="samples-row">
        <span class="samples-label">{t.loadSample}</span>
        {#each sampleKeys as key}
          <button class="sample-chip" on:click={() => loadSample(key)}>
            <span class="sample-icon">{SAMPLES[key].icon}</span>
            <span class="sample-text">{SAMPLES[key].label[lang]}</span>
          </button>
        {/each}
      </div>

      <textarea
        class="record-input"
        bind:value={inputText}
        placeholder={t.placeholder}
        spellcheck="false"
      ></textarea>

      <div class="options-row">
        <div class="option-group">
          <label class="option-label" for="readLevel">📊 {t.readLevelLabel}</label>
          <select class="option-select" id="readLevel" bind:value={readLevel}>
            <option value="simple">{t.readLevels.simple}</option>
            <option value="standard">{t.readLevels.standard}</option>
            <option value="detailed">{t.readLevels.detailed}</option>
          </select>
        </div>
        <div class="option-group">
          <label class="option-label" for="focusArea">🎯 {t.focusLabel}</label>
          <select class="option-select" id="focusArea" bind:value={focusArea}>
            <option value="all">{t.focusAreas.all}</option>
            <option value="diagnosis">{t.focusAreas.diagnosis}</option>
            <option value="medications">{t.focusAreas.medications}</option>
            <option value="followup">{t.focusAreas.followup}</option>
          </select>
        </div>
      </div>

      <button
        class="analyze-btn"
        on:click={handleAnalyze}
        disabled={!inputText.trim() || loading}
      >
        {#if loading}
          <span class="btn-spinner"></span>
          <span>{t.analyzing}</span>
        {:else}
          <span>✨</span>
          <span>{t.analyzeBtn}</span>
        {/if}
      </button>

      {#if error}
        <div class="error-msg">⚠️ {error}</div>
      {/if}
    </div>

    <!-- Result panel -->
    <div class="panel result-panel" class:active={!!result}>

      {#if !result && !loading}
        <div class="result-empty">
          <div class="empty-icon">📄</div>
          <p class="empty-title">{t.emptyTitle}</p>
          <p class="empty-sub">{t.emptySub}</p>
        </div>

      {:else if loading}
        <div class="result-loading">
          <div class="loading-brain">
            <div class="brain-pulse"></div>
            <span class="brain-emoji">🧠</span>
          </div>
          <p class="loading-text">{t.loadingText}</p>
          <div class="loading-steps">
            {#each t.loadingSteps as step, i}
              <div class="loading-step" class:active={i === 0}>{step}</div>
            {/each}
          </div>
        </div>

      {:else if result}
        <div class="result-content">

          <div class="result-header">
            <div class="result-meta">
              {#if result.urgency}
                <span class="urgency-badge urgency-{result.urgency}">
                  {#if result.urgency === 'routine'}
                    ✅ {t.urgency.routine}
                  {:else if result.urgency === 'monitor'}
                    ⚠️ {t.urgency.monitor}
                  {:else}
                    🚨 {t.urgency.urgent}
                  {/if}
                </span>
              {/if}
              {#each (result.tags || []).slice(0, 3) as tag}
                <span class="result-tag">{tag}</span>
              {/each}
            </div>
            <h2 class="result-title">{result.title}</h2>
          </div>

          <div class="metrics-strip">
            <div class="metric">
              <span class="metric-val">{result.readabilityScore}</span>
              <span class="metric-lbl">{t.metReadability}</span>
            </div>
            <div class="metric-divider"></div>
            <div class="metric">
              <span class="metric-val">{reduction}%</span>
              <span class="metric-lbl">{t.metShorter}</span>
            </div>
            <div class="metric-divider"></div>
            <div class="metric">
              <span class="metric-val">{readTime} {t.metMin}</span>
              <span class="metric-lbl">{t.metReadTime}</span>
            </div>
          </div>

          <div class="sections">
            {#each result.sections as section, i}
              <div class="section" style="animation-delay:{i * 80}ms">
                <div class="section-header">
                  <span class="section-icon">
                    {#if section.type === 'diagnosis'}
                      🔍
                    {:else if section.type === 'medications'}
                      💊
                    {:else if section.type === 'findings'}
                      📊
                    {:else if section.type === 'followup'}
                      📅
                    {:else if section.type === 'lifestyle'}
                      🏃
                    {:else}
                      📋
                    {/if}
                  </span>
                  <span class="section-heading">{section.heading}</span>
                </div>
                <p class="section-content">{section.content}</p>
              </div>
            {/each}
          </div>

          <div class="result-actions">
            <button class="action-btn primary" on:click={handleCopy}>
              {#if copied}
                <span>✓</span>
                {t.copied}
              {:else}
                <span>📋</span>
                {t.copyBtn}
              {/if}
            </button>
            <button class="action-btn" on:click={handleReset}>
              <span>🔄</span>
              {t.newRecord}
            </button>
          </div>

          <p class="disclaimer">⚕️ {t.disclaimer}</p>
        </div>
      {/if}
    </div>
  </main>

  <!-- Mobile tabs -->
  {#if result || loading}
    <div class="mobile-tabs">
      <button class="mobile-tab" class:active={activeTab === 'input'}  on:click={() => activeTab = 'input'}>📝 {t.mobileInput}</button>
      <button class="mobile-tab" class:active={activeTab === 'result'} on:click={() => activeTab = 'result'}>📄 {t.mobileResult}</button>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="footer">
    <span>💙 {t.footerLeft}</span>
    <span class="footer-dot">·</span>
    <span>{t.footerRight}</span>
  </footer>

</div>

<style>
  .app { 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column; 
  }
  .app.switching { 
    opacity: 0.7; 
    transition: opacity 0.2s; 
  }

  /* ── Header ── */
  .header { 
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    border-bottom: 3px solid var(--primary-light);
    position: sticky; 
    top: 0; 
    z-index: 100;
    box-shadow: var(--shadow-md);
  }
  
  .header-inner { 
    max-width: 1300px; 
    margin: 0 auto; 
    padding: 0 clamp(1rem, 5vw, 2rem);
    height: auto;
    min-height: 60px;
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .logo { 
    display: flex; 
    align-items: center; 
    gap: clamp(8px, 2vw, 12px);
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
  
  .logo-mark { 
    width: 44px; 
    height: 44px; 
    background: var(--white);
    border-radius: 50%;
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-size: 28px;
    box-shadow: var(--shadow-sm);
    animation: bounce 3s ease-in-out infinite;
  }
  
  .logo-text { 
    display: flex; 
    flex-direction: column; 
    gap: 2px; 
  }
  
  .logo-name { 
    font-family: var(--font-display); 
    font-size: clamp(16px, 4vw, 20px); 
    font-weight: 700; 
    color: var(--white); 
    line-height: 1; 
  }
  
  .logo-tagline { 
    font-size: clamp(9px, 2vw, 10px); 
    font-weight: 500; 
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  .header-right { 
    display: flex; 
    align-items: center; 
    gap: clamp(8px, 2vw, 12px);
  }
  
  .header-badge { 
    font-size: clamp(8px, 2vw, 10px); 
    font-weight: 600; 
    color: var(--primary);
    background: var(--white);
    border: 2px solid var(--white);
    padding: clamp(4px, 1vw, 8px) clamp(8px, 2vw, 12px);
    border-radius: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* ── Language toggle ── */
  .lang-toggle {
    display: flex;
    align-items: center;
    gap: clamp(6px, 1vw, 8px);
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    padding: clamp(4px, 1vw, 8px) clamp(8px, 2vw, 10px);
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
  }
  
  .lang-toggle:hover { 
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  .lang-flag { 
    font-size: clamp(12px, 2vw, 16px); 
    line-height: 1; 
    transition: transform 0.3s; 
  }
  
  .lang-toggle:hover .lang-flag { 
    transform: scale(1.2) rotate(10deg); 
  }

  .lang-track {
    position: relative;
    width: clamp(50px, 12vw, 60px);
    height: 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  .lang-knob {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 26px;
    height: 16px;
    background: var(--white);
    border-radius: 8px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    box-shadow: var(--shadow-sm);
  }
  
  .lang-knob.id { 
    transform: translateX(26px); 
  }

  .lang-opt {
    position: relative;
    z-index: 2;
    flex: 1;
    text-align: center;
    font-size: clamp(8px, 1.5vw, 10px);
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.25s;
    pointer-events: none;
  }
  
  .lang-opt.active { 
    color: var(--white); 
  }

  /* ── Hero ── */
  .hero { 
    background: linear-gradient(135deg, var(--primary-pale) 0%, var(--secondary-pale) 50%, var(--accent-pale) 100%);
    padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem);
    position: relative; 
    overflow: hidden;
  }
  
  .doodles-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  .doodle {
    position: absolute;
    font-size: clamp(60px, 15vw, 120px);
    opacity: 0.12;
    animation: float 6s ease-in-out infinite;
  }
  
  .doodle-1 { top: -20px; right: 10%; animation-delay: 0s; }
  .doodle-2 { top: 50%; left: 5%; animation-delay: 1s; }
  .doodle-3 { bottom: 5%; right: 15%; animation-delay: 2s; }
  .doodle-4 { top: 20%; left: 15%; animation-delay: 3s; }
  .doodle-5 { bottom: 20%; right: 5%; animation-delay: 1.5s; }
  
  .hero-inner { 
    max-width: 700px; 
    margin: 0 auto; 
    text-align: center; 
    position: relative; 
    z-index: 1; 
    animation: fadeUp 0.6s ease both;
    transition: opacity 0.2s;
  }
  
  .hero-inner.fade { 
    opacity: 0; 
  }
  
  .hero-eyebrow { 
    font-size: clamp(10px, 2vw, 12px); 
    font-weight: 600;
    letter-spacing: 2px; 
    text-transform: uppercase; 
    color: var(--primary);
    margin-bottom: 1rem;
  }
  
  .hero-title { 
    font-family: var(--font-display); 
    font-size: clamp(1.8rem, 6vw, 3.2rem);
    font-weight: 700;
    color: var(--primary);
    line-height: 1.15; 
    margin-bottom: 1.25rem;
  }
  
  .hero-title em { 
    font-style: normal;
    color: var(--secondary);
    font-weight: 700;
  }
  
  .hero-desc { 
    font-size: clamp(13px, 2vw, 15px);
    color: var(--ink-soft);
    line-height: 1.7;
    max-width: 520px; 
    margin: 0 auto; 
  }

  /* ── Workspace ── */
  .workspace { 
    flex: 1; 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    max-width: 1400px; 
    width: 100%; 
    margin: 0 auto; 
    padding: clamp(1rem, 4vw, 2rem);
    gap: clamp(1rem, 3vw, 2rem);
    align-items: start;
  }

  /* ── Panels ── */
  .panel { 
    background: var(--white);
    border: 3px solid;
    border-color: var(--primary);
    border-radius: var(--r-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    display: flex; 
    flex-direction: column;
    animation: fadeUp 0.5s ease both;
  }
  
  .panel-head { 
    padding: clamp(0.875rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
    border-bottom: 2px dashed var(--secondary);
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    background: var(--primary-pale);
  }
  
  .panel-label { 
    font-size: clamp(9px, 1.5vw, 11px);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--primary);
  }
  
  .char-count { 
    font-size: clamp(9px, 1.5vw, 11px);
    color: var(--secondary);
    font-weight: 600;
  }

  /* ── Samples ── */
  .samples-row { 
    display: flex; 
    flex-wrap: wrap; 
    gap: clamp(6px, 1vw, 8px);
    padding: clamp(0.75rem, 2vw, 1rem);
    background: linear-gradient(135deg, var(--secondary-pale), var(--accent-pale));
    border-bottom: 2px dashed var(--secondary);
    align-items: center;
    overflow-x: auto;
  }
  
  .samples-label { 
    font-size: clamp(10px, 1.5vw, 11px);
    color: var(--ink-soft);
    margin-right: 4px;
    flex-shrink: 0;
    font-weight: 600;
  }
  
  .sample-chip { 
    display: flex; 
    align-items: center; 
    gap: 4px;
    font-size: clamp(11px, 1.5vw, 13px);
    color: var(--primary);
    background: var(--white);
    border: 2px solid var(--primary);
    padding: clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px);
    border-radius: 20px;
    transition: all 0.2s;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .sample-chip:hover { 
    background: var(--primary-pale);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  .sample-icon { 
    font-size: clamp(12px, 2vw, 14px); 
  }
  
  .sample-text {
    display: none;
  }
  
  @media (min-width: 600px) {
    .sample-text {
      display: inline;
    }
  }

  /* ── Textarea ── */
  .record-input { 
    width: 100%; 
    min-height: clamp(200px, 40vh, 300px);
    padding: clamp(1rem, 2vw, 1.5rem);
    border: none;
    outline: none;
    font-size: clamp(13px, 2vw, 14px);
    line-height: 1.8;
    color: var(--ink);
    background: var(--white);
    resize: vertical;
    border-bottom: 2px dashed var(--secondary);
    font-family: 'Segoe UI Mono', monospace;
  }
  
  .record-input::placeholder { 
    color: var(--ink-ghost);
    font-style: italic;
  }
  
  .record-input:focus {
    background: var(--accent-pale);
  }

  /* ── Options ── */
  .options-row { 
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--primary-light);
    border-bottom: 2px dashed var(--secondary);
  }
  
  .option-group { 
    display: flex; 
    flex-direction: column; 
    gap: 4px;
    padding: clamp(0.75rem, 2vw, 1rem);
    background: var(--white);
  }
  
  .option-label { 
    font-size: clamp(9px, 1.5vw, 10px);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--primary);
  }
  
  .option-select { 
    font-size: clamp(13px, 2vw, 14px);
    color: var(--ink);
    background: transparent;
    border: none;
    outline: none;
    padding: 4px 0;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    font-weight: 600;
  }
  
  .option-select:hover,
  .option-select:focus { 
    color: var(--primary);
  }

  /* ── Analyze button ── */
  .analyze-btn { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: clamp(6px, 1vw, 10px);
    width: calc(100% - clamp(2rem, 4vw, 3rem));
    margin: clamp(0.75rem, 2vw, 1.25rem) auto;
    padding: clamp(12px, 2vw, 16px);
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    border: none;
    border-radius: var(--r-lg);
    font-family: var(--font-ui);
    font-size: clamp(13px, 2vw, 15px);
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    box-shadow: var(--shadow-md);
    cursor: pointer;
  }
  
  .analyze-btn:hover:not(:disabled) { 
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .analyze-btn:active:not(:disabled) { 
    transform: scale(0.98);
  }
  
  .analyze-btn:disabled { 
    background: var(--surface-3);
    color: var(--ink-ghost);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .btn-spinner { 
    width: 16px; 
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: var(--white);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  /* ── Error ── */
  .error-msg { 
    margin: 0 clamp(1rem, 3vw, 1.5rem) clamp(0.75rem, 2vw, 1.25rem);
    padding: clamp(10px, 1.5vw, 14px);
    background: #FFE5E8;
    color: var(--danger);
    font-size: clamp(12px, 1.5vw, 13px);
    border-radius: var(--r-md);
    border-left: 4px solid var(--danger);
    animation: fadeUp 0.3s ease both;
  }

  /* ── Empty state ── */
  .result-empty { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem);
    gap: 12px;
    min-height: clamp(250px, 40vh, 400px);
  }
  
  .empty-icon { 
    font-size: 64px;
    animation: float 3s ease-in-out infinite;
  }
  
  .empty-title { 
    font-size: clamp(14px, 2vw, 16px);
    font-weight: 700;
    color: var(--primary);
  }
  
  .empty-sub { 
    font-size: clamp(12px, 1.5vw, 13px);
    color: var(--ink-soft);
    text-align: center;
    max-width: 300px;
  }

  /* ── Loading ── */
  .result-loading { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem);
    gap: clamp(12px, 2vw, 16px);
    min-height: clamp(250px, 40vh, 400px);
  }
  
  .loading-brain { 
    position: relative; 
    width: 80px; 
    height: 80px;
    display: flex; 
    align-items: center; 
    justify-content: center;
  }
  
  .brain-pulse { 
    position: absolute; 
    inset: -12px;
    border-radius: 50%;
    border: 3px solid var(--primary);
    opacity: 0.3;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  .brain-emoji {
    font-size: 48px;
    animation: bounce 1s ease-in-out infinite;
  }
  
  .loading-text { 
    font-size: clamp(14px, 2vw, 16px);
    font-weight: 700;
    color: var(--primary);
  }
  
  .loading-steps { 
    display: flex; 
    flex-direction: column; 
    gap: 6px;
    width: 100%;
    max-width: 240px;
  }
  
  .loading-step { 
    font-size: clamp(12px, 1.5vw, 13px);
    color: var(--ink-ghost);
    padding: 8px 12px;
    border-radius: var(--r-sm);
    border-left: 3px solid var(--secondary);
    transition: all 0.3s;
  }
  
  .loading-step.active { 
    color: var(--white);
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-left-color: var(--primary);
    font-weight: 600;
  }

  /* ── Result ── */
  .result-content { 
    padding: clamp(1.25rem, 3vw, 1.5rem);
    display: flex; 
    flex-direction: column; 
    gap: clamp(1rem, 2vw, 1.25rem);
    animation: fadeIn 0.4s ease both;
  }
  
  .result-header { 
    display: flex; 
    flex-direction: column; 
    gap: 12px;
  }
  
  .result-meta { 
    display: flex; 
    flex-wrap: wrap; 
    gap: clamp(6px, 1vw, 8px);
    align-items: center;
  }
  
  .urgency-badge { 
    font-size: clamp(11px, 1.5vw, 12px);
    font-weight: 700;
    padding: clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 12px);
    border-radius: 20px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  
  .urgency-routine {
    background: #C8F5D4;
    color: var(--success);
  }
  
  .urgency-monitor {
    background: #FFE8B6;
    color: var(--warning);
  }
  
  .urgency-urgent {
    background: #FFD4D4;
    color: var(--danger);
  }
  
  .result-tag { 
    font-size: clamp(10px, 1.5vw, 11px);
    color: var(--ink-soft);
    background: var(--surface-2);
    border: 2px solid var(--secondary);
    padding: clamp(3px, 0.8vw, 6px) clamp(8px, 1.5vw, 10px);
    border-radius: 20px;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .result-title { 
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 1.8rem);
    font-weight: 700;
    color: var(--primary);
    line-height: 1.2;
  }

  /* ── Metrics ── */
  .metrics-strip { 
    display: flex; 
    align-items: center; 
    background: linear-gradient(135deg, var(--secondary-pale), var(--accent-pale));
    border-radius: var(--r-lg);
    border: 3px solid var(--secondary);
    overflow: hidden;
  }
  
  .metric { 
    flex: 1;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: clamp(10px, 2vw, 16px) clamp(8px, 1.5vw, 12px);
    gap: 4px;
  }
  
  .metric-val { 
    font-size: clamp(18px, 4vw, 24px);
    font-weight: 700;
    color: var(--primary);
    font-family: var(--font-display);
  }
  
  .metric-lbl { 
    font-size: clamp(9px, 1.5vw, 10px);
    color: var(--ink-soft);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-weight: 600;
  }
  
  .metric-divider { 
    width: 2px;
    height: clamp(30px, 8vh, 40px);
    background: var(--secondary);
    flex-shrink: 0;
  }

  /* ── Sections ── */
  .sections { 
    display: flex; 
    flex-direction: column; 
    gap: clamp(8px, 1.5vw, 12px);
  }
  
  .section { 
    background: linear-gradient(135deg, var(--accent-pale), var(--secondary-pale));
    border-radius: var(--r-lg);
    padding: clamp(1rem, 2vw, 1.25rem);
    border: 2px solid var(--primary-light);
    animation: fadeUp 0.4s ease both;
    transition: all 0.2s;
  }
  
  .section:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .section-header { 
    display: flex; 
    align-items: center; 
    gap: clamp(6px, 1.5vw, 10px);
    margin-bottom: 8px;
  }
  
  .section-icon { 
    font-size: clamp(18px, 3vw, 24px);
    line-height: 1;
  }
  
  .section-heading { 
    font-size: clamp(10px, 1.5vw, 11px);
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--primary);
  }
  
  .section-content { 
    font-size: clamp(13px, 1.8vw, 14px);
    line-height: 1.75;
    color: var(--ink-soft);
  }

  /* ── Actions ── */
  .result-actions { 
    display: flex; 
    flex-wrap: wrap;
    gap: clamp(6px, 1.5vw, 10px);
  }
  
  .action-btn { 
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: clamp(4px, 1vw, 8px);
    font-size: clamp(12px, 1.5vw, 13px);
    font-family: var(--font-ui);
    padding: clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 16px);
    border-radius: var(--r-md);
    border: 2px solid var(--primary-light);
    background: var(--white);
    color: var(--primary);
    transition: all 0.2s;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex: 1;
    min-width: 120px;
  }
  
  .action-btn:hover { 
    background: var(--primary-pale);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  .action-btn.primary { 
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    border-color: var(--primary);
  }
  
  .action-btn.primary:hover { 
    background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
    box-shadow: var(--shadow-md);
  }

  /* ── Disclaimer ── */
  .disclaimer { 
    font-size: clamp(11px, 1.5vw, 12px);
    color: var(--ink-soft);
    line-height: 1.6;
    padding: clamp(10px, 2vw, 14px);
    background: #FFE8D4;
    border-radius: var(--r-md);
    border-left: 3px solid var(--warning);
  }

  /* ── Mobile tabs ── */
  .mobile-tabs { 
    display: none; 
    position: fixed; 
    bottom: 0; 
    left: 0; 
    right: 0;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-top: 3px solid var(--primary-light);
    z-index: 200;
    box-shadow: var(--shadow-lg);
  }
  
  .mobile-tab { 
    flex: 1; 
    padding: clamp(12px, 2vw, 16px);
    font-family: var(--font-ui);
    font-size: clamp(12px, 1.5vw, 13px);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
    background: none;
    border: none;
    transition: all 0.2s;
    cursor: pointer;
    letter-spacing: 0.5px;
  }
  
  .mobile-tab.active { 
    color: var(--white);
    background: rgba(0, 0, 0, 0.1);
  }

  /* ── Footer ── */
  .footer { 
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    font-size: clamp(10px, 1.5vw, 12px);
    text-align: center; 
    padding: clamp(0.75rem, 2vw, 1.25rem);
    display: flex; 
    justify-content: center; 
    align-items: center; 
    gap: clamp(6px, 1.5vw, 8px);
    letter-spacing: 0.5px;
    font-weight: 500;
  }
  
  .footer-dot { 
    opacity: 0.6; 
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .workspace { 
      grid-template-columns: 1fr;
      padding: clamp(1rem, 3vw, 1.5rem);
    }
    
    .input-panel.hidden { 
      display: none; 
    }
    
    .result-panel { 
      display: flex; 
    }
    
    .mobile-tabs { 
      display: flex; 
    }
    
    .app { 
      padding-bottom: 60px; 
    }
  }

  @media (max-width: 768px) {
    .header-inner {
      gap: 0.5rem;
    }

    .header-badge { 
      display: none; 
    }

    .workspace {
      padding: 1rem;
      gap: 1rem;
    }

    .samples-row {
      justify-content: flex-start;
    }

    .result-actions {
      flex-direction: column;
    }

    .action-btn {
      width: 100%;
      min-width: auto;
    }

    .metrics-strip {
      flex-direction: column;
      gap: 1px;
    }

    .metric-divider {
      width: 100%;
      height: 1px;
    }
  }

  @media (max-width: 480px) {
    .logo-text {
      display: none;
    }

    .lang-toggle {
      padding: 4px 6px;
      gap: 4px;
    }

    .lang-flag {
      font-size: 12px;
    }

    .lang-track {
      width: 48px;
    }

    .hero {
      padding: 1.5rem 1rem;
    }

    .hero-title {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .samples-row {
      gap: 4px;
    }

    .sample-chip {
      padding: 3px 8px;
      font-size: 10px;
    }

    .option-label {
      font-size: 9px;
    }

    .panel-head {
      flex-wrap: wrap;
      gap: 8px;
    }

    .panel-label {
      flex: 1;
    }

    .char-count {
      width: 100%;
      text-align: right;
    }

    .record-input {
      min-height: 150px;
    }

    .result-title {
      font-size: 1.3rem;
    }

    .section {
      padding: 0.75rem;
    }

    .section-icon {
      font-size: 16px;
    }

    .metric-val {
      font-size: 18px;
    }

    .result-meta {
      gap: 4px;
    }

    .result-tag {
      font-size: 9px;
      padding: 2px 6px;
    }

    .urgency-badge {
      padding: 3px 8px;
      font-size: 10px;
    }
  }
</style>
