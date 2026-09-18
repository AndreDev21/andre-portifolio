# NFC e QR Code — cartão de contato

Destino:

**https://andredev21.github.io/andre-portifolio/contacts/**

Pelo celular, abre a página de setup (salvar QR + gravar cartão):

**https://andredev21.github.io/andre-portifolio/contacts/nfc-qr.html**

Arquivos do QR (já gerados nesta pasta):

| Arquivo | Uso |
|---|---|
| `qr-galeria.png` | Foto vertical pra salvar na galeria do celular |
| `qr-print.png` | Impressão, adesivo, cartão físico (preto no branco, melhor leitura) |
| `qr.svg` | Vetor, se for mandar pra gráfica |
| `qr.png` | Tela, wallpaper, WhatsApp (cores do site) |

---

## Cartão ou adesivo NFC

Qualquer tag **NTAG213** (ou maior: 215/216) serve — a URL é curta. Cartão PVC, adesivo redondo ou chaveiro.

1. Instala **NFC Tools** (Android ou iPhone).
2. Abre **Escrever / Write** → **Adicionar um registro** → **URL / URI**.
3. Cola:

   `https://andredev21.github.io/andre-portifolio/contacts/`

4. **Escrever** e encosta a tag na parte de trás do celular (no Android o ponto NFC costuma ficar no meio; no iPhone, no topo).
5. Testa com outro celular: o toque deve abrir o navegador direto no cartão.

Dica: grava e depois usa **Proteger / Lock** na tag só quando tiver certeza — depois não dá pra regravar.

---

## “Sinal” NFC no seu celular

O iPhone **não consegue fingir** uma tag com URL (a Apple só libera NFC assim pra Apple Pay / Wallet). No Android emulação de tag também é instável.

O que funciona de verdade: **adesivo NFC na capa** (ou no verso do telefone). Quem encosta no seu celular está lendo a tag, não o aparelho.

1. Grava o adesivo como acima.
2. Cola no verso da capa, sem metal no caminho (capa de carbono/metal mata NFC).
3. Testa o ponto certo: encosta outro celular e marca com um pontinho onde leu.

Cartão PVC no bolso ou no crachá é o mesmo gravar — só muda o formato.

---

## QR na galeria do celular

1. No celular, abre [nfc-qr.html](https://andredev21.github.io/andre-portifolio/contacts/nfc-qr.html).
2. Segura a imagem → **Salvar imagem**. Ou toca **Baixar QR pra galeria**.
3. Confere em Fotos / Galeria: `andre-martins-cartao-qr.png`.
4. Na hora de mostrar, abre essa foto em tela cheia e deixa o outro celular apontar a câmera.

Quem não tem NFC (ou NFC desligado) cai no mesmo link.

---

## Conferir

- NFC: segundo celular → toque → abre o [cartão](https://andredev21.github.io/andre-portifolio/contacts/).
- QR: câmera do outro celular → o mesmo destino.
