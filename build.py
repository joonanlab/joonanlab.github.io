#!/usr/bin/env python3
"""Build script: converts Jekyll YAML/MD data to JSON and generates team profile pages."""

import json
import shutil
from pathlib import Path

import yaml
import markdown

SOURCE = Path(__file__).parent / ".." / ".." / "joonanlab.github.io"
TARGET = Path(__file__).parent


def read_yaml(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def write_json(data, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def parse_md_file(md_path):
    """Parse a markdown file with YAML frontmatter."""
    text = md_path.read_text(encoding="utf-8")
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, ""
    frontmatter = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    bio_html = markdown.markdown(body, extensions=["extra"]) if body else ""
    return frontmatter, bio_html


def build_team_profile_html(url, name):
    """Generate a profile page that loads data from JSON."""
    return f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} - An Lab</title>
<meta name="description" content="{name} - Team member at An Lab, Korea University.">
<meta property="og:title" content="{name} - An Lab">
<meta property="og:description" content="{name} - Team member at An Lab, Korea University.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://joonanlab.github.io/images/logopic/Logo2025-AnLab.png">
<meta property="og:site_name" content="An Lab">
<meta name="twitter:card" content="summary">
<link rel="icon" href="../images/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="preload" href="https://cdn.tailwindcss.com" as="script">
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {{
  theme: {{
    extend: {{
      colors: {{
        dark: {{ bg: '#0a0e1a', card: '#12182b', hover: '#1a2340' }},
        cyan: {{ accent: '#D43B56' }},
        gold: {{ accent: '#f5c542' }},
      }},
      fontFamily: {{
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
      }},
    }},
  }},
}};
</script>
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/animations.css">
</head>
<body class="bg-dark-bg text-slate-200 font-sans min-h-screen">
<a href="#main-content" class="skip-link">Skip to content</a>
<nav class="glass-nav fixed top-0 w-full z-50 px-6 py-4">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <a href="../index.html" class="flex items-center gap-3">
      <img src="../images/logopic/Logo2025-AnLab.png" alt="An Lab" class="h-8 w-auto" width="32" height="32">
      <span class="text-xl font-bold text-cyan-accent">An Lab</span>
    </a>
    <div class="hidden md:flex items-center gap-6">
      <a href="../index.html" class="nav-link" data-i18n="nav.home">Home</a>
      <a href="../team.html" class="nav-link active" data-i18n="nav.team">Team</a>
      <a href="../research.html" class="nav-link" data-i18n="nav.research">Research</a>
      <a href="../publications.html" class="nav-link" data-i18n="nav.publications">Publications</a>
      <a href="../tools.html" class="nav-link" data-i18n="nav.tools">Tools</a>
      <a href="../lectures.html" class="nav-link" data-i18n="nav.lectures">Lectures</a>
      <a href="../news.html" class="nav-link" data-i18n="nav.news">News</a>
      <a href="../join.html" class="nav-link" data-i18n="nav.join">Join</a>
      <a href="../contact.html" class="nav-link" data-i18n="nav.contact">Contact</a>
      <button id="theme-toggle" class="p-2 rounded-lg hover:bg-dark-hover transition-colors" aria-label="Toggle theme">
        <svg class="w-5 h-5 sun-icon hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
        <svg class="w-5 h-5 moon-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
      </button>
      <button id="lang-toggle" class="px-3 py-1 rounded-lg border border-slate-600 hover:border-cyan-accent text-sm transition-colors" aria-label="Toggle language">EN/KR</button>
    </div>
    <button id="mobile-menu-btn" class="md:hidden p-2" aria-label="Toggle navigation menu" aria-expanded="false">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
  <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-slate-700">
    <div class="flex flex-col gap-3 pt-4">
      <a href="../index.html" class="nav-link" data-i18n="nav.home">Home</a>
      <a href="../team.html" class="nav-link" data-i18n="nav.team">Team</a>
      <a href="../research.html" class="nav-link" data-i18n="nav.research">Research</a>
      <a href="../publications.html" class="nav-link" data-i18n="nav.publications">Publications</a>
      <a href="../tools.html" class="nav-link" data-i18n="nav.tools">Tools</a>
      <a href="../lectures.html" class="nav-link" data-i18n="nav.lectures">Lectures</a>
      <a href="../news.html" class="nav-link" data-i18n="nav.news">News</a>
      <a href="../join.html" class="nav-link" data-i18n="nav.join">Join</a>
      <a href="../contact.html" class="nav-link" data-i18n="nav.contact">Contact</a>
    </div>
  </div>
</nav>

<main id="main-content" class="pt-24 pb-16 px-6">
  <div class="max-w-4xl mx-auto">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html" data-i18n="breadcrumb.home">Home</a>
      <span class="separator">/</span>
      <a href="../team.html" data-i18n="nav.team">Team</a>
      <span class="separator">/</span>
      <span class="current">{name}</span>
    </nav>
    <a href="../team.html" class="inline-flex items-center gap-2 text-cyan-accent hover:underline mb-8">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      <span data-i18n="profile.back">Back to Team</span>
    </a>
    <div id="profile-content" class="reveal">
      <div class="skeleton skeleton-card" style="height:200px;"></div>
    </div>
  </div>
</main>

<footer class="border-t border-slate-800 py-8 px-6">
  <div class="max-w-7xl mx-auto text-center text-slate-500 text-sm">
    <p>&copy; 2025 An Lab, Korea University. All rights reserved.</p>
  </div>
</footer>

<script src="../js/app.js"></script>
<script src="../js/i18n.js"></script>
<script>
document.addEventListener('DOMContentLoaded', async () => {{
  try {{
    const resp = await fetch('../data/members/{url}.json');
    const m = await resp.json();
    const container = document.getElementById('profile-content');
    const photoSrc = m.photo ? `../images/teampic/${{m.photo}}` : '../images/teampic/blank.png';
    let links = '';
    if (m.email) links += `<a href="mailto:${{m.email}}" class="inline-flex items-center gap-1 text-cyan-accent hover:underline"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Email</a>`;
    if (m.github) links += `<a href="https://github.com/${{m.github}}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-cyan-accent hover:underline"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>GitHub</a>`;
    if (m.scholar) links += `<a href="https://scholar.google.com/citations?user=${{m.scholar}}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-cyan-accent hover:underline"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z"/></svg>Scholar</a>`;
    if (m.twitter) links += `<a href="https://twitter.com/${{m.twitter}}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-cyan-accent hover:underline">Twitter</a>`;

    container.innerHTML = `
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-shrink-0">
          <img src="${{photoSrc}}" alt="${{m.name}}" class="w-48 h-48 rounded-2xl object-cover shadow-lg border border-dark-hover" width="192" height="192" loading="lazy">
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">${{m.name}}</h1>
          <p class="text-lg text-gold-accent mb-4">${{m.position || ''}}</p>
          ${{links ? `<div class="flex flex-wrap gap-4 mb-6">${{links}}</div>` : ''}}
        </div>
      </div>
      ${{m.bio_html ? `<div class="prose prose-invert max-w-none mt-8 profile-bio">${{m.bio_html}}</div>` : ''}}
    `;
  }} catch (e) {{
    document.getElementById('profile-content').innerHTML = '<p class="text-slate-400">Profile not found.</p>';
  }}
}});
</script>
</body>
</html>'''


def build_translations():
    """Generate EN/KR translation strings."""
    return {
        "nav.home": {"en": "Home", "ko": "\ud648"},
        "nav.team": {"en": "Team", "ko": "\ud300"},
        "nav.research": {"en": "Research", "ko": "\uc5f0\uad6c"},
        "nav.publications": {"en": "Publications", "ko": "\ub17c\ubb38"},
        "nav.tools": {"en": "Tools", "ko": "\ub3c4\uad6c"},
        "nav.lectures": {"en": "Lectures", "ko": "\uac15\uc758"},
        "nav.news": {"en": "News", "ko": "\uc18c\uc2dd"},
        "nav.join": {"en": "Join", "ko": "\ubaa8\uc9d1"},
        "nav.contact": {"en": "Contact", "ko": "\uc5f0\ub77d\ucc98"},
        "hero.tagline": {"en": "Genomics & AI for Understanding Human Disease", "ko": "\uc778\uac04 \uc9c8\ubcd1 \uc774\ud574\ub97c \uc704\ud55c \uc720\uc804\uccb4\ud559 & AI"},
        "hero.subtitle": {"en": "Department of Biosystem and Biomedical Science, Korea University", "ko": "\uace0\ub824\ub300\ud559\uad50 \ubc14\uc774\uc624\uc2dc\uc2a4\ud15c\uc758\uacfc\ud559\ubd80"},
        "section.team": {"en": "Our Team", "ko": "\uc5f0\uad6c\ud300"},
        "section.pi": {"en": "Principal Investigator", "ko": "\uc5f0\uad6c \ucc45\uc784\uc790"},
        "section.graduate": {"en": "Graduate Students", "ko": "\ub300\ud559\uc6d0\uc0dd"},
        "section.staff": {"en": "Staff", "ko": "\uc5f0\uad6c\uc6d0"},
        "section.undergrad": {"en": "Undergraduate Interns", "ko": "\ud559\ubd80 \uc778\ud134"},
        "section.alumni": {"en": "Alumni", "ko": "\uc878\uc5c5\uc0dd"},
        "section.research": {"en": "Research", "ko": "\uc5f0\uad6c"},
        "section.publications": {"en": "Publications", "ko": "\ub17c\ubb38"},
        "section.tools": {"en": "Code & Datasets", "ko": "\ucf54\ub4dc & \ub370\uc774\ud130"},
        "section.news": {"en": "News", "ko": "\uc18c\uc2dd"},
        "section.join": {"en": "Join Us", "ko": "\ubaa8\uc9d1 \uc548\ub0b4"},
        "section.contact": {"en": "Contact", "ko": "\uc5f0\ub77d\ucc98"},
        "section.lectures": {"en": "Lectures", "ko": "\uac15\uc758"},
        "section.karc": {"en": "K-ARC Consortium", "ko": "K-ARC \ucee8\uc18c\uc2dc\uc5c4"},
        "section.latestNews": {"en": "Latest News", "ko": "\ucd5c\uadfc \uc18c\uc2dd"},
        "section.featuredPubs": {"en": "Featured Publications", "ko": "\uc8fc\uc694 \ub17c\ubb38"},
        "section.researchHighlights": {"en": "Research Highlights", "ko": "\uc5f0\uad6c \ud558\uc774\ub77c\uc774\ud2b8"},
        "section.funding": {"en": "Funding", "ko": "\uc5f0\uad6c\ube44 \uc9c0\uc6d0"},
        "btn.viewAll": {"en": "View All", "ko": "\uc804\uccb4 \ubcf4\uae30"},
        "btn.loadMore": {"en": "Load More", "ko": "\ub354 \ubcf4\uae30"},
        "btn.meetTeam": {"en": "Meet Our Team", "ko": "\ud300 \uc18c\uac1c"},
        "btn.viewPubs": {"en": "View Publications", "ko": "\ub17c\ubb38 \ubcf4\uae30"},
        "pub.search": {"en": "Search publications...", "ko": "\ub17c\ubb38 \uac80\uc0c9..."},
        "pub.highlighted": {"en": "Highlighted", "ko": "\uc8fc\uc694 \ub17c\ubb38"},
        "pub.allYears": {"en": "All Years", "ko": "\uc804\uccb4 \uc5f0\ub3c4"},
        "profile.back": {"en": "Back to Team", "ko": "\ud300\uc73c\ub85c \ub3cc\uc544\uac00\uae30"},
        "alumni.thesis": {"en": "Thesis", "ko": "\ub17c\ubb38"},
        "alumni.current": {"en": "Current Position", "ko": "\ud604\uc7ac \uc704\uce58"},
    }


def main():
    data_dir = TARGET / "data"
    members_dir = data_dir / "members"
    team_dir = TARGET / "team"
    data_dir.mkdir(parents=True, exist_ok=True)
    members_dir.mkdir(parents=True, exist_ok=True)
    team_dir.mkdir(parents=True, exist_ok=True)

    # 1. Read and write YAML -> JSON
    team_members = read_yaml(SOURCE / "_data" / "team_members.yml")
    alumni = read_yaml(SOURCE / "_data" / "alumni.yml")
    news = read_yaml(SOURCE / "_data" / "news.yml")
    publications = read_yaml(SOURCE / "_data" / "publist.yml")

    # Normalize publication link fields
    for p in publications:
        if not isinstance(p.get("link"), dict):
            p["link"] = {"url": "", "display": "", "display_full": ""}

    write_json(team_members, data_dir / "team.json")
    write_json(alumni, data_dir / "alumni.json")
    write_json(news, data_dir / "news.json")
    write_json(publications, data_dir / "publications.json")

    print(f"Written: team.json ({len(team_members)} members)")
    print(f"Written: alumni.json ({len(alumni)} alumni)")
    print(f"Written: news.json ({len(news)} items)")
    print(f"Written: publications.json ({len(publications)} publications)")

    # 2. Build per-member profile data and HTML pages
    all_members = [(m, False) for m in team_members] + [(m, True) for m in alumni]
    profile_count = 0

    for member, is_alumni in all_members:
        url = member.get("url", "")
        if not url:
            continue

        # Look for .md file
        md_path = SOURCE / "team" / f"{url}.md"
        if not md_path.exists():
            md_path = SOURCE / "team" / "alumni" / f"{url}.md"

        profile_data = {
            "name": member.get("name", ""),
            "position": member.get("info", ""),
            "photo": member.get("photo", ""),
            "handle": "",
            "email": "",
            "twitter": "",
            "github": "",
            "scholar": "",
            "bio_html": "",
        }

        if md_path.exists():
            fm, bio_html = parse_md_file(md_path)
            profile_data.update({
                "handle": fm.get("handle", ""),
                "email": fm.get("email", "") or "",
                "twitter": fm.get("twitter", "") or "",
                "github": fm.get("github", "") or "",
                "scholar": fm.get("scholar", "") or "",
                "bio_html": bio_html,
            })
            if fm.get("position"):
                profile_data["position"] = fm["position"]
            if fm.get("photo"):
                profile_data["photo"] = fm["photo"]

        # Alumni extra fields
        if is_alumni:
            profile_data["year"] = member.get("year", "")
            profile_data["thesis"] = member.get("thesis", "")
            profile_data["current"] = member.get("current", "")

        write_json(profile_data, members_dir / f"{url}.json")

        # Generate profile HTML page
        html = build_team_profile_html(url, profile_data["name"])
        (team_dir / f"{url}.html").write_text(html, encoding="utf-8")
        profile_count += 1

    print(f"Generated: {profile_count} member profiles and HTML pages")

    # 3. Copy images
    src_images = SOURCE / "images"
    dst_images = TARGET / "images"
    if src_images.exists():
        shutil.copytree(src_images, dst_images, dirs_exist_ok=True)
        print(f"Copied images from {src_images}")

    # 4. Write translations
    write_json(build_translations(), data_dir / "translations.json")
    print("Written: translations.json")

    print("\nBuild complete!")


if __name__ == "__main__":
    main()
