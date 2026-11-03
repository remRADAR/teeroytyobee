import { artist, releases } from '../data/artist'

export async function downloadEpk() {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 48
  let y = 56
  const width = 500
  const write = (text: string, size: number, gap = 18, bold = false) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal')
    pdf.setFontSize(size)
    const lines = pdf.splitTextToSize(text, width)
    pdf.text(lines, margin, y)
    y += lines.length * (size + 4) + gap
  }
  pdf.setTextColor(22, 22, 20)
  write('TEEROY TYOBEE', 24, 8, true)
  write('CURRENT ELECTRONIC PRESS KIT / 2026', 9, 28)
  write(artist.descriptor, 17, 14, true)
  write(artist.longBio, 11, 22)
  pdf.setDrawColor(197, 154, 72)
  pdf.line(margin, y, margin + width, y)
  y += 22
  write('SELECTED CATALOGUE', 9, 14, true)
  releases.slice(0, 8).forEach((release) => write(`${release.title} — ${release.statusLabel}${release.date ? ` — ${release.date}` : ''}`, 10, 8))
  y += 10
  write('CONTENT NOTE', 9, 12, true)
  write('This export preserves the current recovery-build verification boundary. Unresolved release records and image-rights limitations should be cleared before commercial publication.', 10, 18)
  write(`Location: ${artist.location}`, 10, 8)
  pdf.save('teeroy-tyobee-epk.pdf')
}
