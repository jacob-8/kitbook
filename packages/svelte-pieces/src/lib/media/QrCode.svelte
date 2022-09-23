<script lang="ts">
  import { QrCode, QrCodeEcc } from './qrcodegen';
  export let value: string;
  export let pixelsPerModule = 4;
  export let errorCorrection: 'low' | 'medium' | 'quartile' | 'high' = 'high';
  export let bgColor = '#FFFFFF';
  export let fgColor = '#000000';

  $: ecl = (() => {
    if (errorCorrection === 'high') return QrCodeEcc.HIGH;
    else if (errorCorrection === 'quartile') return QrCodeEcc.QUARTILE;
    else if (errorCorrection === 'medium') return QrCodeEcc.MEDIUM;
    else return QrCodeEcc.LOW;
  })();
  $: qr = QrCode.encodeText(value, ecl);

  $: fgPath = (() => {
    let parts: string[] = [];
    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size; x++) {
        if (qr.getModule(x, y)) parts.push(`M${x},${y}h1v1h-1z`);
      }
    }
    return parts.join(' ');
  })();
</script>

<svg height={qr.size * pixelsPerModule} width={qr.size * pixelsPerModule} viewBox={`0 0 ${qr.size} ${qr.size}`} stroke="none">
  <rect width="100%" height="100%" fill={bgColor} />
  <path fill={fgColor} d={fgPath} shape-rendering="crispEdges" />
</svg>
