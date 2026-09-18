# André Martins — Portfólio

Site estático (HTML, CSS e JS puro, sem framework/build step). Boot de terminal com humor, numa janela no estilo de WM tiling (barra i3/polybar, canto reto, borda de janela em foco) em vez da moldura arredondada do macOS, projetos com painel de detalhes (o TaxResearch tem mini-mockup interativo), seção sobre e contato. Cartão de contato digital embutido em `/contacts`.

## Publicar no GitHub Pages

1. Crie o repositório **exatamente** com o nome `AndreDev21.github.io` na sua conta GitHub (esse nome ativa o Pages na raiz do domínio automaticamente).
2. Envie os arquivos:
   ```bash
   git init
   git add .
   git commit -m "portfolio inicial"
   git branch -M main
   git remote add origin git@github.com:AndreDev21/AndreDev21.github.io.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages** → confirme *Source: Deploy from a branch*, branch `main`, pasta `/ (root)`.
4. Em 1–3 minutos:
   - Portfólio: `https://andredev21.github.io/`
   - Cartão de contato: `https://andredev21.github.io/contacts/`

Atualizações depois: só `git push` na `main`, o Pages republica sozinho.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página principal |
| `data.js` | Todo o conteúdo (textos, projetos, sobre, contato) — edite aqui pra trocar texto sem mexer em HTML |
| `styles.css` | Estilos globais — a paleta (roxo) fica nas variáveis do `:root`, no topo do arquivo |
| `main.js` | Renderização das seções, boot de terminal, painel de projeto, reveal on scroll |
| `taxresearch-mockup.js/css` | Mini-mockup interativo do projeto TaxResearch (único projeto com mockup) |
| `ascii-art.js` | Retrato em ASCII pré-computado a partir da foto (~3 KB de texto) |
| `ascii-photo.js` | Fundo do boot: chuva de caracteres que forma o retrato à direita quando o build começa |
| `contacts/index.html` | Cartão de contato digital (LinkedIn + WhatsApp, PT/EN) — mesmo link que vai no NFC/QR Code |

## Editar conteúdo

Quase tudo que aparece no site vem de `data.js`. Pra trocar textos, adicionar projeto novo ou mudar links, edite esse arquivo — não precisa tocar no `main.js` a menos que queira mudar o layout/comportamento.

Pra adicionar um projeto novo ao grid, copie um objeto existente dentro do array `projects` em `data.js` e ajuste os campos. Se o projeto estiver no ar, adicione `live: 'https://...'` — isso liga a bolinha pulsante no selo *Em produção* do card e o botão **ver no ar** no painel de detalhes. Se quiser que ele tenha mockup interativo (como o TaxResearch), crie um `<slug>-mockup.js` seguindo o padrão de `taxresearch-mockup.js`, registre em `window.AM_MOCKUPS.<slug>`, linke o `.js`/`.css` no `index.html` e adicione `mockup: '<slug>'` no objeto do projeto.

## Rodar localmente

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`. Pra pular o boot de terminal durante o desenvolvimento, acesse com `?noboot` na URL (`http://localhost:8080/?noboot`).

## Retrato em ASCII

O retrato é feito **por ausência**: os caracteres formam uma nuvem, e a figura aparece onde não há caractere nenhum. A nuvem desmancha numa elipse, então não fica um retângulo em volta.

Dois momentos:

1. **Tela de boot** — a chuva cobre a tela. Ao apertar Enter ela vai rareando enquanto a nuvem da figura se acende do lado direito, caractere por caractere.
2. **Página** — a mesma nuvem aparece pronta ao lado da descrição do hero, como `<pre>` estático.

**A passagem entre as telas usa a própria figura.** Quando o build termina, o canvas dela sai do loader, vira `position: fixed` e voa até o retângulo exato do `<pre>` do hero, escalando junto; nos últimos 420 ms ela se dissolve enquanto o `<pre>` estático assume por baixo. É a mesma imagem do começo ao fim — não há corte entre as telas. O loader dissolve por trás (fade + blur + escala) e os blocos de texto sobem em cascata de 70 ms.

**No mobile (< 900px) a figura não entra em lugar nenhum** — nem no boot, nem no hero. Fica só a chuva atrás do terminal.

**Nenhuma imagem é baixada em runtime.** A arte é pré-computada e vive em `ascii-art.js` como texto (240×199, ~48 KB, ~3,3 KB comprimido).

### Como a nuvem é calculada

`ascii-art.js` guarda **tom**, não os caracteres finais: cada célula é um caractere da rampa `" .:-=+*#%@"` representando quanto o desenho é cheio ali. Em runtime, `cloudDensity()` inverte isso:

```
densidade = (1 - tom) ^ CLOUD_GAMMA × vinheta(raio)
entra = ign(x, y) < densidade
```

Onde o desenho é cheio a densidade vai a zero — é o buraco que desenha a pessoa. A vinheta elíptica derruba a densidade a partir de `VIG_START` até zerar em `VIG_END`. O hero e o boot usam a mesma função, só mudando a grade.

**Duas escolhas aqui valem explicação**, porque foram o que deu definição ao rosto:

- **`ign()` no lugar de `Math.random()`.** Ruído aleatório se agrupa, e o agrupamento é justamente o que borra traço fino — linha de olho, canto de boca. O *interleaved gradient noise* é determinístico e bem distribuído, então o limiar fica estável e o traço sobrevive, sem cair no padrão quadriculado visível de um dither ordenado.
- **`CLOUD_GAMMA` mexe só nos meios-tons.** Fundo (tom 0) e camiseta (tom 1) não mudam com ele — só as bordas dos traços. Por isso ele afina o rosto sem ralear o busto.

### Trocar a foto

A arte saiu de uma versão em *line art* (preto e branco, fundo já removido) — contraste máximo e nenhum fundo pra competir com o rosto.

```bash
magick lineart.jpg -colorspace Gray -negate -fuzz 8% -trim +repage \
  -resize 192x159! -depth 8 pgm:-
```

Cada pixel do PGM vira um caractere da rampa, e o resultado entra em `ascii-art.js` como `window.AM_ASCII_ART`.

**Duas coisas fáceis de errar:**

- **Proporção.** `rows ≈ cols × (0.6 / entrelinha) × (altura/largura)`. Com a entrelinha `0.75` daqui, isso dá `cols × 0.8 × (altura/largura)`. Errar estica ou achata a pessoa.
- **Entrelinha.** O `<pre>` usa `line-height: 0.75`. Com 1.0 sobram vãos entre as linhas e a nuvem vira um listrado.

### Ajustes

| Constante (`ascii-photo.js`) | O que controla |
|---|---|
| `CLOUD_GAMMA` | Densidade da nuvem (< 1 = mais cheia) |
| `VIG_START` / `VIG_END` | Onde a nuvem começa e termina de desmanchar |
| `FIGURE_ALPHA` | Presença da figura no boot |
| `CELL_W` / `CELL_H` | Grade da chuva de fundo |
| `FORM_MS` | Duração da formação |
| `HANDOFF_MS` | Duração do voo da figura até o hero |
| `MOBILE_MAX` | Largura abaixo da qual a figura não entra |

O tamanho no hero sai de `.hero-ascii` (`styles.css`). Com `prefers-reduced-motion`, a figura é desenhada pronta e nada anima.

### Performance

O boot usa duas camadas, e é isso que sustenta ~52 fps:

- **Chuva** numa grade grossa (8×12), agrupada por faixa de opacidade e rareando de verdade (não só perdendo opacidade) conforme a figura aparece — rarear corta trabalho junto.
- **Figura** num canvas próprio no DOM, desenhada *uma vez* conforme cada caractere acende. Ela não é redesenhada nem copiada por frame — quem compõe é o browser. Isso também é o que permite animá-la na transição: como é um elemento, ela voa com `transform`, fora da árvore do loader (senão herdaria o blur dele).

## Observações

- Fontes carregadas via Google Fonts CDN (Space Grotesk, IBM Plex Sans, IBM Plex Mono).
- Sem dependência de build (Vite, webpack etc.) — é HTML/CSS/JS puro, funciona direto no GitHub Pages.
- `contacts/index.html` é standalone (não depende de `main.js`/`data.js`) — pode ser aberto sozinho, é o link que vai no cartão NFC/QR Code.
