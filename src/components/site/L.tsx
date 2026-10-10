/** Bilingual inline text. Visibility is switched by CSS (see .en-only/.ko-only). */
export function L({ en, ko }: { en: React.ReactNode; ko: React.ReactNode }) {
  return (
    <>
      <span className="en-only">{en}</span>
      <span className="ko-only">{ko}</span>
    </>
  )
}
