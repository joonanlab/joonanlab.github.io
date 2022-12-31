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

    # title and authors
    title = ' '.join(record.get('TI', '')).replace(':', ' -')
    authors = ', '.join(record.get('AU', '')).replace(',,',',')
    if len(record.get('AU', '')) > 10:
      authors_to_display = ', '.join(record.get('AU', '')[0:6] + ['...'] + record.get('AU', '')[-6:])
    else:
      authors_to_display = authors
    first_author = record.get('AU', '')[0].split(' ')[0]

    # date
    date_string = record.get('DP', '')[0]
    if '/' in date_string:
      date = datetime.datetime.strptime(date_string, "%Y/%m/%d").strftime("%Y %b")
    else:
      try:
        date = datetime.datetime.strptime(date_string, "%Y %b %d").strftime("%Y %b")
      except ValueError:
        try:
          date = datetime.datetime.strptime(date_string, "%Y %m %d").strftime("%Y %b")
        except ValueError:
          date = datetime.datetime.strptime(date_string, "%Y %b").strftime("%Y %b")
    year = date.split(' ')[0]
    
    # journal 
    journal = record.get('JT', '')[0].split(' (')[0]
    vol = [''] if record.get('VI', '') is '' else record.get('VI', '')
    vol = vol[0]
    page = [''] if record.get('IS', '') is '' else record.get('IS', '')
    page = page[0].split(' ')[0]
    doi = record.get('DOI', '')
    
    # for display
    image = first_author + year + '.jpg'
    display = "{} et al., ({}), {}".format(first_author, year, journal)
    highlight = '1' if pmid in highlights else '0'

    # Format the fields as a single string
    # result = f'{title} | {authors} | {year} | {journal} | {volume} | {page} | {doi}'

    print("- title: {}".format(title))
    print("  image: {}".format(image))
    print("  authors: {}".format(authors_to_display))
    print("  authors_full: {}".format(authors))
    print("  year: {}".format(year))
    print("  date: {}".format(date))
    print("  vol: {}".format(vol))
    print("  page: {}".format(page))
    print("  link:")
    print("    url: https://pubmed.ncbi.nlm.nih.gov/{}".format(pmid))
    print("    display: {}".format(display))
    print("  highlight: {}".format(highlight))
    print(" ")


medline_dict = parse_medline_txt('/Users/joonan/Downloads/medline.txt')

