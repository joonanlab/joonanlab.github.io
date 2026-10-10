/** Placeholder images in public/images/teampic that are not real photos. */
const PLACEHOLDER_PHOTOS = new Set(['blank.png', 'blank2.png', 'dummy.png'])

export function hasRealPhoto(photo: string | undefined | null): photo is string {
  return Boolean(photo) && !PLACEHOLDER_PHOTOS.has(photo as string)
}

/** Korean role names, matching the existing member profiles (position_ko). */
export const ROLE_KO: Record<string, string> = {
  'Principal Investigator': '책임연구자',
  'Postdoctoral Researcher': '박사후연구원',
  'PhD Student': '박사과정',
  'Masters Student': '석사과정',
  'Graduate Student': '대학원생',
  'B.S.-M.S. Integrated Program': '학석사연계과정',
  'B.S.-M.S.-Ph.D. Integrated Program': '학석박 통합과정',
  'Undergraduate Intern': '학부 인턴',
  'Undergraduate intern': '학부 인턴',
  'Administrative Staff': '행정',
  Bioinformatician: '생물정보분석가',
}
