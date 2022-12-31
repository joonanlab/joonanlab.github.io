import re
import json
import datetime

def parse_medline_txt(txt_file):
  medline_dict = {}
  with open(txt_file, 'r') as f:
    current_key = None
    for line in f:
      line = line.strip()
      if not line:
        continue
      if line.startswith('PMID-'):
        pmid = re.search(r'PMID- (\d+)', line).group(1)
        medline_dict[pmid] = {}
        medline_dict[pmid]['AU'] = []
      elif line.startswith('  '):
        value = line.strip()
        # medline_dict[pmid][current_key] = value
        medline_dict[pmid][current_key].append(value)
      else:
        match = re.match(r'([^-]+)- (.*)', line)
        if match:
          key = match.group(1).strip()
          value = match.group(2).strip()
          if key == 'AU':
            medline_dict[pmid]['AU'].append(value)
          else:
            medline_dict[pmid][key] = []
            medline_dict[pmid][key].append(value)
          current_key = key
        else:
          # key = line.strip()
          # print (key)
          value = line.strip()
          # medline_dict[pmid][key] = []
          medline_dict[pmid][key].append(value)
          current_key = key
  
  # Extract the desired fields from each record
  highlights = ['35794212', '34166716', '32268104', '31981491', '30545852', '29700473', '28256214', '27317861', '24893065']
  results = []
  for pmid, record in medline_dict.items():
    title = ' '.join(record.get('TI', '')).replace(':', ' -')
    authors = ', '.join(record.get('AU', ''))
    date_string = record.get('LR', '')[0]
    date = datetime.datetime.strptime(date_string, "%Y%m%d").date().strftime("%Y %b")
    year = datetime.datetime.strptime(date_string, "%Y%m%d").date().strftime("%Y")
    first_author = record.get('AU', '')[0].split(' ')[0]
    image = first_author + year + '.jpg'
    journal = record.get('JT', '')[0]
    vol = [''] if record.get('VI', '') is '' else record.get('VI', '')
    vol = vol[0]
    page = [''] if record.get('IS', '') is '' else record.get('IS', '')
    page = page[0].split(' ')[0]
    # page = record.get('IS', '')
    doi = record.get('DOI', '')
    # Oh et al., Experimental & Molecular Medicine  (2022)
    display = "{} et al., {} ({})".format(first_author, journal, year)
    highlight = '1' if pmid in highlights else '0'

    # Format the fields as a single string
    # result = f'{title} | {authors} | {year} | {journal} | {volume} | {page} | {doi}'

    print("- title: {}".format(title))
    print("  image: {}".format(image))
    print("  authors: {}".format(authors))
    print("  year: {}".format(year))
    print("  vol: {}".format(vol))
    print("  page: {}".format(page))
    print("  link:")
    print("    url: https://pubmed.ncbi.nlm.nih.gov/{}".format(pmid))
    print("    display: {}".format(display))
    print("  highlight: {}".format(highlight))
    print(" ")


medline_dict = parse_medline_txt('/Users/joonan/Downloads/medline.txt')

