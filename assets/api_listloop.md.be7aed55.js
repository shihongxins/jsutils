import{_ as s,o,c as a,M as n}from"./chunks/framework.648ff92d.js";const d=JSON.parse('{"title":"ListLoop API","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"api/listloop.md","filePath":"api/listloop.md"}'),l={name:"api/listloop.md"},p=n('<h1 id="listloop-api" tabindex="-1">ListLoop API <a class="header-anchor" href="#listloop-api" aria-label="Permalink to &quot;ListLoop API&quot;">​</a></h1><h2 id="Contructor" tabindex="-1">Contructor() <a class="header-anchor" href="#Contructor" aria-label="Permalink to &quot;Contructor() {#Contructor}&quot;">​</a></h2><p>Create a new ListLoop instance.</p><ul><li><p><strong>type:</strong> <code>class</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">declare</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ListLoop</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">list</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">index</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">list</span><span style="color:#89DDFF;">?:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">count</span><span style="color:#89DDFF;">?:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">index</span><span style="color:#89DDFF;">?:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">);</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">get</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">total</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">lastRound</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">nextRound</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">get</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">currentRoundList</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></li><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ListLoop</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@shihongxins/utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> lp </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">ListLoop</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h2 id="Instance" tabindex="-1">Instance properties <a class="header-anchor" href="#Instance" aria-label="Permalink to &quot;Instance properties {#Instance}&quot;">​</a></h2><p>The instance properties.</p><h3 id="list" tabindex="-1"><code>ListLoop.prototype.list: T[]</code> <a class="header-anchor" href="#list" aria-label="Permalink to &quot;`ListLoop.prototype.list: T[]` {#list}&quot;">​</a></h3><p>Get the list of instance.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">list)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="count" tabindex="-1"><code>ListLoop.prototype.count: number</code> <a class="header-anchor" href="#count" aria-label="Permalink to &quot;`ListLoop.prototype.count: number` {#count}&quot;">​</a></h3><p>Get the count(step) of instance.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">count)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="index" tabindex="-1"><code>ListLoop.prototype.index: number</code> <a class="header-anchor" href="#index" aria-label="Permalink to &quot;`ListLoop.prototype.index: number` {#index}&quot;">​</a></h3><p>Get the index of instance.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">index)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="total" tabindex="-1"><code>ListLoop.prototype.total: number</code> <a class="header-anchor" href="#total" aria-label="Permalink to &quot;`ListLoop.prototype.total: number` {#total}&quot;">​</a></h3><p>Get the total(<code>getter()</code>) of instance.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">total)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="lastRound" tabindex="-1"><code>ListLoop.prototype.lastRound(): number</code> <a class="header-anchor" href="#lastRound" aria-label="Permalink to &quot;`ListLoop.prototype.lastRound(): number` {#lastRound}&quot;">​</a></h3><p>Set last round of index.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">lastRound</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="nextRound" tabindex="-1"><code>ListLoop.prototype.nextRound(): number</code> <a class="header-anchor" href="#nextRound" aria-label="Permalink to &quot;`ListLoop.prototype.nextRound(): number` {#nextRound}&quot;">​</a></h3><p>Set next round of index.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextRound</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul><h3 id="currentRoundList" tabindex="-1"><code>ListLoop.prototype.currentRoundList: T[]</code> <a class="header-anchor" href="#currentRoundList" aria-label="Permalink to &quot;`ListLoop.prototype.currentRoundList: T[]` {#currentRoundList}&quot;">​</a></h3><p>Get current round list of instance.</p><ul><li><p><strong>example</strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(lp</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">currentRoundList)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></li></ul>',27),t=[p];function e(c,r,i,y,D,F){return o(),a("div",null,t)}const u=s(l,[["render",e]]);export{d as __pageData,u as default};