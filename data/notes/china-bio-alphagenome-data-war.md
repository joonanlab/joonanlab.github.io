---
title: "차이나 바이오 - 알파지놈 이후의 데이터 확보 전쟁"
date: "2026-06-09"
summary: "알파지놈 이후 바이오 AI의 경쟁은 전사 조절과 섭동 데이터를 누가 어떤 품질로 확보하느냐의 문제로 이동하고 있다. 중국 회사와 연구기관이 Perturb-seq, MPRA, STARR-seq 데이터를 어떤 방식으로 생산하고 있는지 정리한다."
tags: ["AlphaGenome", "China-bio", "perturb-seq", "MPRA", "STARR-seq", "functional-genomics", "data-production"]
lang: "ko"
category: "Genomics + AI"
---

학부 2학년 유전학 수업이 끝났다. 이번엔 eQTL과 pQTL로 수업을 마무리했다. 얼마나 기술과 과학이 빠르게 발전하는지, 교과서를 쓰면서도 체감했고, 강의하는 이번 학기 내에도 경험을 했다. 마지막 챕터는 유전자 조절 그리고 분자적 층위를 다루는 QTL로 마무리한다.

유전자가 많이 발현한다는 것은 생물학에서 중요하다. 세포 안에서 어떤 단백질이 만들어지고, 그 단백질이 어느 정도의 양으로 존재하며, 어느 시간과 장소에서 작동하는지가 세포의 상태를 정한다. 세포의 상태는 조직의 특성으로, 조직의 특성은 결국 생물체의 표현형으로 이어진다. 센트럴 도그마가 DNA에서 RNA로, RNA에서 단백질로 이어지는 방향을 제시했다면, 그 이후의 분자생물학은 이 흐름이 언제, 어디서, 얼마나 작동하는지를 묻는 방향으로 발전했다. 1960년대와 1970년대의 생물학은 유전자가 무엇인지, 전사는 어떻게 시작되는지, 프로모터와 전사인자가 무엇을 하는지, 단백질이 어떻게 기능을 갖는지를 하나씩 해부했다. 그때의 생물학은 하나의 유전자와 하나의 기능을 붙잡고 깊게 파는 방식이었다.

그런데 인간 유전체 프로젝트 이후 이상한 문제가 더 선명해졌다. 인간은 생각보다 유전자가 많지 않았고, 감자나 양파보다 유전자 숫자가 적었다. 감자가 나보다 똑똑한가? 그럴지도 모르지만.... 적어도 생물학의 답은 유전자 수가 아니라 조절에 있었다. 같은 유전자를 어느 세포에서 켜는가, 어느 조절 서열이 어느 프로모터와 만나는가, 염색체가 어떻게 접혀서 멀리 떨어진 조절 요소를 한곳에 모으는가가 중요해졌다. 21세기 들어 차세대 시퀀싱 기술이 등장하면서 이 질문은 실험으로 읽을 수 있는 질문이 됐다. ChIP-seq은 전사인자나 히스톤 표지가 어디에 붙는지 보여줬고, DNase-seq과 ATAC-seq은 염색체가 어디서 열려 있는지 보여줬으며, RNA-seq은 발현량을 읽고 Hi-C 계열의 실험은 3차원 유전체 접힘을 보여줬다. 생물학은 "유전자가 있다"에서 "유전체가 어떻게 읽힌다"로 이동했다. 이 이동이 논코딩 유전체, 전사 조절, 그리고 표현형 연구의 핵심이다.


## 알파지놈이 보여준 것

구글 딥마인드는 2025년에 알파지놈을 발표했다. 알파폴드가 단백질 구조를 예측했다면, 알파지놈은 DNA 서열에서 전사 조절의 결과를 예측하려고 한다. 입력은 긴 DNA 서열이고, 출력은 유전자 발현, 전사 시작, 염색질 접근성, 히스톤 표지, 전사인자 결합, RNA 접합 변화, 3차원 접촉 같은 기능적 유전체 신호다. DNA 서열을 넣으면 그 서열이 세포 안에서 어떤 조절 신호를 만들지 예측하는 것이다. 완전히 새로운 개념은 아니다. DeepSEA, Basenji, Enformer, Borzoi 같은 모델들이 이미 논코딩 서열에서 기능을 예측해 왔다. 알파지놈의 의미는 "DNA 모델이 처음 나왔다"가 아니라, 흩어져 있던 여러 조절 신호를 하나의 모델 안으로 통합하고, 긴 유전체 맥락을 보면서 변이 효과 예측까지 밀어붙였다는 데 있다. 유전체 딥러닝이 짧은 모티프 하나를 맞히는 문제를 넘어, 유전체 조절의 통합 모델로 가고 있다는 신호다.

당연히 한계도 있는데... 알파지놈은 모델이고, 모델은 학습에 사용된 데이터의 분포를 쉽게 벗어나지 못한다. K562처럼 오래전부터 많이 실험된 세포주에는 공개 데이터가 많다. ENCODE, FANTOM, GTEx, Roadmap, 4D Nucleome 같은 데이터도 특정 세포주와 조직에 집중되어 있고, 그중에서도 K562는 거의 표준 실험 재료처럼 쓰여 왔다. 그래서 알파지놈이 K562에서 잘 예측한다는 것은 의미 있지만, 그 성능이 곧바로 환자 몸 안의 복잡한 세포로 옮겨간다고 보기는 어렵다. 발달 중인 태아의 뇌세포, 염증이나 퇴행성 질환에 반응하는 성상세포, 당뇨병 환자에서 인슐린 분비가 달라지는 베타세포, 심근경색 뒤 손상 조직을 복구하려는 섬유아세포는 서로 다른 조건에서 유전자를 읽는다. 이런 상태는 공개 데이터에 충분히 들어 있지 않기 때문에 따로 측정해야 한다.

알파지놈은 신약 표적을 확정해 주는 도구라기보다 후보 공간을 넓히는 도구에 가깝다. "이 변이가 중요해 보인다", "이 조절 서열이 이 유전자를 조절할 가능성이 있다", "이 RNA 접합 변화가 달라질 수 있다"를 말해준다. 하지만 신약개발에서 필요한 질문은 더 구체적이다. 이 변이가 질병의 원인인가. 이 조절 축을 바꾸면 실제 세포 상태가 달라지는가. 어느 조직에서, 어느 발달 단계에서, 어느 환자군에서 재현되는가. 모델은 가능성의 공간을 넓히지만, 인과성을 닫아주지는 않는다. 그래서 알파지놈 이후의 경쟁은 모델 경쟁만이 아니다. 공개 데이터로 만든 모델은 누구나 어느 정도 따라갈 수 있다. 진짜 차이는 특정 질환, 특정 조직, 특정 세포 상태에서 고품질의 섭동 데이터를 직접 생산할 수 있느냐에서 갈린다. 알파지놈은 "DNA에서 기능으로 가는 길"을 계산할 수 있음을 보여줬다. 다음 질문은 누가 그 길을 실제 질병 세포에서 측정하느냐다.



## 섭동 기술의 등장

지난 10년 동안 논코딩 유전체를 연구하기 위한 새로운 방식, 즉 섭동 실험 기술이 등장했다. Perturbation, 즉 섭동은 유전자 조작이나 약물 처리를 통해 유전자 발현과 세포 상태가 어떤 방향으로 변하는지 측정하는 기술이다. 특정 유전자를 끄거나 낮추거나 켜고, 또는 약물을 처리한 뒤 어떤 유전자 발현과 전사 프로그램이 증가하거나 감소하는지 읽는다. Perturb-seq은 이 과정을 단일세포 수준에서 수행한다. 각 세포에 들어간 가이드 RNA나 바코드 서열을 읽고, 같은 세포의 RNA-seq을 동시에 읽는다. 그러면 이 세포에는 어떤 섭동이 가해졌고, 그 결과 어떤 유전자 발현 변화가 나타났는지를 한 번에 알 수 있다. 일반 RNA-seq이 어떤 상태를 관찰한다면, Perturb-seq은 정해진 섭동을 가하고 결과를 본다. 완전한 인과성을 자동으로 보장하지는 않지만, 특정 유전자를 조작했을 때 세포 상태 공간이 어느 방향으로 이동하는지 벡터를 얻는다는 점에서 단순한 아틀라스 데이터와 다르다.

이 벡터가 AI가 학습하는 재료가 된다. 세포 상태를 하나의 고차원 공간이라고 생각하면, 섭동은 그 공간에서 이동 방향을 측정하는 일이다. 어떤 유전자를 끄면 세포가 분화하는가, 어떤 전사인자를 켜면 염증성 성상세포가 줄어드는가, 어떤 약물을 넣으면 암세포가 저항성 상태로 가는가. 이 이동을 충분히 많이 측정하면, 모델은 측정하지 않은 섭동의 결과까지 예측하려고 할 수 있다. 가상세포는 여기서 나온다. 단일세포 아틀라스를 많이 모은다고 곧바로 가상세포가 만들어지지는 않는다. 아틀라스는 지도다. 지도만으로는 "여기서 저기로 가려면 무엇을 해야 하는가"를 알 수 없다. 가상세포가 되려면 현재 세포 상태와 섭동을 넣었을 때 다음 세포 상태를 예측해야 한다. 그래서 섭동 데이터는 바이오 기초모델의 핵심 재료가 된다. 논문을 읽고 가설을 쓰는 LLM과는 다른 층위의 일이다.



## 기능획득 연구에 도전하는 과학자들

전통적으로 유전자 조작을 하는 유전학 연구는 크게 기능상실(Loss-of-Function; LoF)과 기능획득(Gain-of-Function; GoF)이 있다. 기능상실은 유전자를 없애거나 기능을 낮추는 방식이고, CRISPR 유전자 제거, CRISPRi, shRNA 발현억제가 여기에 속한다. 물론 필수 유전자, 보상 작용, 불완전한 발현억제 같은 문제가 있지만 기본 방향은 비교적 분명하다. 종결코돈, 프레임시프트, 큰 결실은 단백질을 짧게 만들거나 mRNA를 분해시키고, 대체로 유전자 양을 낮춘다고 볼 수 있다. 연구자는 이 방향을 기준으로 유전자 제거 실험이나 CRISPRi 실험을 설계한다. 유전자가 사라졌을 때 무슨 일이 생기는가라는 질문은 어렵지만, 적어도 섭동의 방향은 명확한 편이다. 인간 유전체에서 더 어려운 것은 그 밖의 변이다. 인간 DNA에는 단백질을 아예 끊어버리는 변이보다 아미노산 하나를 바꾸는 미스센스 변이가 훨씬 많다. 어떤 미스센스 변이는 단백질 안정성을 낮추고, 어떤 것은 결합 상대를 바꾸며, 어떤 것은 지배적 음성 효과처럼 작동하고, 어떤 것은 새로운 활성을 만들 수도 있다. 조절 변이는 더 난감하다. 한 조직에서만, 특정 발달 시점에서만, 염증이나 스트레스 이후에만 발현량을 조금 올리거나 내릴 수 있다. 이 변이가 기능상실인지 기능획득인지, 아니면 둘 중 하나로 부르기 어려운 맥락 의존적 효과인지 처음부터 알기 어렵다.

기능획득 연구가 필요한 이유가 여기에 있다. 유전자를 켜는 것은 유전자를 없애는 것보다 훨씬 복잡하다. 어떤 전사체나 단백질 형태를 켤 것인가, 어느 프로모터로 얼마나 발현시킬 것인가, 단백질이 제대로 접히고 맞는 위치로 가서 필요한 상대와 결합할 것인가를 모두 고려해야 한다. 전사인자라면 염색질 맥락이 맞아야 하고, 수용체라면 리간드와 세포막 위치가 맞아야 한다. 단순히 단백질 코딩 서열을 넣는다고 자연 상태의 기능이 재현되는 것은 아니다. 게다가 자연 변이의 효과는 대개 미세하다. 복잡형질이나 질병 위험에 관여하는 변이는 유전자를 10배 올리기보다 10%, 20%, 30% 정도 밀고 당기는 경우가 많다. 수천, 수만 개의 변이가 각자 작은 양적 변화를 만들고, 그 변화가 특정 세포 상태와 발달 시점에서 누적된다. 실험실의 과발현은 쉽게 비생리적 수준으로 가기 때문에, 원래 보려던 생물학 대신 독성이나 스트레스 반응을 측정하게 될 위험도 있다.

또한 양적 유전 관점에서 LoF보다 GoF 연구가 중요한데, 왜냐하면, 유전변이 즉 allele은 additive allele이기 때문이다. 인간은 두개의 allele을 갖는데, 양적 유전에서 두개의 allele은 각기 다른 방향성을 갖는다. 그래서 GoF 연구가 큰 의미를 지닌다. 

나는 이 대목에서 Jonathan Pritchard 그룹의 최근 논문들을 재밌게 읽고 있다. Simons et al (2025)은 여러 복잡형질의 GWAS 구조가 겉보기에는 달라도, 표적이 될 수 있는 자리의 수와 자리당 유전력으로 스케일을 맞추면 비슷한 법칙을 따른다고 주장했다. Zhu et al (2026)은 중추신경계 관련 형질과 정신질환이 특히 큰 돌연변이 표적 크기와 강한 선택압을 받는다고 해석했다. Milind et al (2026)의 유전자 양-반응 곡선 논문은 더 직접적이다. 유전자 양이 줄어드는 경우와 늘어나는 경우가 평균적으로 같은 방향의 형질 변화를 만들 수 있다는 것이다. 유전자 양과 표현형의 관계가 단순한 직선이 아니고, 위아래가 대칭도 아니라는 뜻이다. Ota et al (2026)은 여기에 Perturb-seq을 붙인다. 기능상실 변이 부담검정에서 얻은 유전자-형질 방향성과 Perturb-seq에서 얻은 조절자-프로그램 효과를 묶으면, 유전자에서 전사 프로그램을 거쳐 형질로 가는 인과 그래프를 만들 수 있다. PRS가 변이의 통계적 합으로 위험도를 계산한다면, 이런 모델은 어떤 세포 프로그램이 어느 방향으로 움직였는지를 묻는다. 그래서 기능획득 연구는 단순히 "유전자를 켜 보는 실험"이 아니다. 미스센스 변이, 조절 변이, CNV, 다유전자 배경이 만들어 내는 미세한 양적 효과와 방향성을 읽기 위한 실험이다. 어떤 변이가 기능을 잃게 하는지, 기능을 올리는지, 다른 기능으로 바꾸는지, 특정 세포 상태에서만 작동하는지를 알아야 한다. 이 정보가 없으면 다유전자 점수는 위험도를 더 잘 맞힐 수는 있어도, 왜 그 위험이 생겼는지와 어떻게 되돌릴지를 말하기 어렵다. 나는 결국 이런 정보가 다유전자 위험점수를 대체하거나 적어도 크게 바꿀 것이라고 본다. 나중에 이런 예측이 개인 유전체 서비스로 나온다면, 팔리는 것은 단순한 위험점수 숫자가 아니라 유전형, 세포 상태, 섭동 반응을 연결한 동적 모델일 것이다. 그 모델의 재료가 바로 기능획득, 기능상실, MPRA, Perturb-seq 같은 기능유전체 데이터다.

최근 Science에 실린 성상세포 생체 내 기능획득 Perturb-seq 논문은 이 흐름을 잘 보여준다. Zhang et al (2026)은 생쥐 뇌의 성상세포에서 약 1000개의 전사인자를 기능획득 방식으로 조작하고, 그 결과를 단일세포 수준에서 읽었다. 최종적으로 955개 전사인자와 121,807개의 섭동된 성상세포가 분석에 들어갔다. 실험 디자인을 모두 따라갈 필요는 없다. 핵심은 살아 있는 뇌 안에서 전사인자를 하나씩 과발현시키고, 각 세포의 바코드 서열과 전사체를 함께 읽어 어떤 전사인자가 어떤 세포 상태를 만드는지 본 것이다. 이 연구가 중요한 이유는 스케일만이 아니다. 연구진은 전사인자 섭동이 시냅스 생성, 글루탐산 흡수, 식균 작용, 면역 반응, 신경 퇴행과 관련된 성상세포 기능을 어떻게 바꾸는지 연결했고, 알츠하이머병이나 파킨슨병 같은 질환 데이터와도 비교했다. 이어서 LPS로 유도한 신경염증 조건에서 39개 전사인자를 다시 검증했고, Ferd3l이 염증성 경로와 독성 성상세포 표지를 낮추는 후보로 나왔다. 알츠하이머 모델 생쥐에서 Ferd3l을 성상세포 특이적으로 과발현했을 때 인지 결손과 반응성 성상세포 상태가 완화된 것도 보였다. 큰 섭동 지도를 만들고, 그 지도에서 치료 후보를 고르고, 다시 동물 모델에서 확인하는 구조다. 바이오 AI가 말하는 닫힌 루프가 실제 실험 논문 안에서 거의 한 바퀴 돈 셈이다.

이런 데이터를 만들려면 많은 비용이 든다. 단일세포 실험의 예산은 10x 라이브러리 하나로 끝나지 않는다. 세포 준비, 바이러스 생산, 바코드 서열 라이브러리 품질관리, 동물 실험, 세포 선별, 단일세포 포획, 시퀀싱, 가이드 RNA나 바코드 서열을 따로 증폭해 확인하는 과정, 계산 분석 품질관리가 모두 비용이다. 여기에 CITE-seq처럼 항체 표지를 함께 읽는 방식을 붙이면 비용은 더 늘어난다. 예를 들어 CITE-seq 항체 패널만 생각해도 그렇다. 정해진 상용 조합은 몇천 달러대에 살 수 있지만, 질병과 조직에 맞춰 수십에서 백여 개 표지를 직접 구성하면 비용이 크게 달라진다. 올리고가 붙은 항체 하나가 수백 달러 수준이고, 패널 구성, 농도 조정, 검증까지 포함하면 항체 패널만 4-5만 달러 정도가 된다. 여기에 시퀀싱, 세포 준비, 동물 실험, 세포 선별 비용은 별도로 붙는다. 단백질 표지를 함께 측정하겠다는 실험 설계 하나가 그만큼의 추가 예산을 요구한다. Perturb-seq에서는 비용 구조가 더 커진다. 한 번의 실험이 하나의 샘플 측정이 아니라 라이브러리 전체의 대표성을 유지하는 문제이기 때문이다. 가이드 RNA나 과발현 서열이 라이브러리 안에서 고르게 남아야 하고, 각 섭동마다 충분한 세포 수를 확보해야 한다. 세포 하나에 조작 하나가 들어가도록 바이러스 양을 조절하고, 검출 누락과 두 세포가 함께 잡히는 경우도 관리해야 한다. 큰 스크린일수록 실패했을 때 잃는 비용이 커지고, 세포 수를 늘릴수록 비용도 빠르게 증가한다. 이 분야는 개별 실험실의 숙련도만으로 쌓기 어렵다. 표준화된 데이터 생산 체계, 바이러스와 세포와 시퀀싱과 분석을 묶는 운영, 실패를 감당할 자본이 필요하다. 나는 이것을 데이터 생산의 인식론이라고 본다. 모델을 만드는 능력보다, 모델이 배울 수 있는 인과적 데이터를 반복적으로 생산하는 능력이 더 느리고 더 비싸고 더 희소하다.

이 역사는 Perturb-seq에서 시작하지 않는다. Jacob and Monod (1961)는 DNA가 단백질 서열만 담는 저장소가 아니라, 언제 단백질 합성을 허용하고 막을지까지 조절하는 회로를 가진다는 것을 보여줬다. 구조 유전자, 조절 유전자, 작동 부위, 억제자, 유도 물질이 한 묶음으로 작동하면서 환경 신호에 따라 효소가 만들어지거나 만들어지지 않는다. 여기서 중요한 것은 "유전자가 있는가"보다 "그 유전자가 언제, 얼마나 읽히는가"였다. 이 관점이 이후 전사 조절, 조절 서열, 전사인자, 염색질 접근성, 조절 변이 연구로 이어졌다. 물론 박테리아 오페론의 단순한 회로가 인간 질환을 그대로 설명하지는 않는다. 진핵세포에서는 프로모터와 조절 서열이 멀리 떨어져 있고, 염색질 상태와 3차원 유전체 구조가 전사인자의 접근성을 바꾸며, 같은 유전자라도 세포 종류와 발달 시점에 따라 전혀 다르게 읽힌다. 그래도 질문의 중심은 유지됐다. 표현형은 DNA 서열만으로 정해지는 것이 아니라, 그 서열이 어떤 세포에서 어떤 강도와 시간표로 발현되는지에 의해 만들어진다.

MPRA와 STARR-seq는 이 오래된 질문을 대량 실험으로 바꾼 기술이다. 과거에는 조절 서열 후보 하나를 리포터 벡터에 넣고 하나씩 활성을 봤다면, MPRA는 수천에서 수십만 개의 조절 서열을 한꺼번에 합성하고 바코드 서열을 붙여 활성을 읽는다. Patwardhan et al (2012)는 포유류 조절 서열을 생체 안에서 대량으로 해부했다. 이후 Ahituv의 MPRA 리뷰와 여러 후속 연구는 조절 서열을 예측하는 것과 실제로 기능을 측정하는 것이 다르다는 점을 분명히 했다. Perturb-seq은 같은 질문을 세포 전체의 전사체로 확장했다. 조절 서열 하나가 리포터를 얼마나 켜는지만 보는 것이 아니라, 특정 유전자를 끄거나 낮추거나 켰을 때 세포 상태 전체가 어디로 움직이는지를 본다. Dixit et al (2016)과 Adamson et al (2016)의 단일세포 CRISPR 스크린 논문이 거의 동시에 나온 뒤, 섭동 데이터는 몇몇 유전자를 확인하는 실험이 아니라 모델이 학습할 수 있는 기능유전체 지도에 가까워졌다. UCSF의 Nadav Ahituv는 Perturb-seq의 직접 발명자라기보다 MPRA를 통한 조절 서열 해독의 중요한 축이고, 워싱턴 대학의 Jay Shendure는 대규모 리포터 실험과 단일세포 CRISPR 스크린 설계 양쪽에 깊게 연결되어 있다. Hill et al (2018)은 단일세포 CRISPR 스크린에서 가이드 RNA와 바코드 서열이 뒤섞이는 문제를 정리했고, 가이드 RNA 자체를 바코드처럼 읽는 설계를 개선했다. Perturb-seq이라는 이름은 Regev/Weissman/Broad 축에서 나왔지만, 조절 서열을 대량으로 읽는 MPRA 계보와 단일세포 섭동의 벡터 설계에는 Shendure/Ahituv/Trapnell 계열이 중요하게 들어온다. Replogle et al (2022)는 CRISPRi로 발현되는 유전자를 유전체 규모로 겨냥하고, 250만 개가 넘는 인간 세포에서 전사체 표현형을 읽었다. 이 흐름은 NIH/NHGRI의 IGVF 컨소시엄으로 제도화된다. 오페론에서 시작한 "유전자가 어떻게 읽히는가"라는 질문이, 이제 변이와 기능을 연결하는 데이터 인프라로 바뀌고 있는 셈이다.



## 미국의 과학, 그리고 플랫폼을 사지 않고 내재화하는 중국

중국의 진입 경로는 조금 다르다. 2016년부터 2021년까지 Perturb-seq의 초기 표준은 주로 Broad, Sanger, Stanford, UCSF, University of Washington 같은 대형 연구실의 논문에서 정리됐다. 이 시기 중국 회사의 존재감은 크지 않았다. 2022년부터 2024년 사이에는 중국 회사들이 직접 플랫폼을 만든다기보다 단일세포 라이브러리 제작, CRISPR 라이브러리 제작, 올리고 합성, 시퀀싱, 생물정보 분석 같은 서비스 영역으로 들어오기 시작했다. 논문을 따라가다 보면 Analytical BioSciences, Genemagic Biosciences, Singleron, Novogene, Shanghai Personal Biotechnology 같은 이름들이 보이지만, 이 시기의 많은 회사는 플랫폼 소유자라기보다 실험과 분석을 가능하게 하는 기술 파트너에 가까웠다. 2025년 이후에는 양상이 바뀐다. 최근 중국발 Perturb-seq 논문들을 보면 베이징대, 상하이자오퉁대, 푸단대, 중국과학원, 루이진병원 같은 기관들이 대규모 스크린을 직접 수행한다. 중국 회사가 10x Genomics나 Parse Biosciences처럼 독립 플랫폼 기업으로 판을 주도한다기보다, 대학과 병원이 Perturb-seq을 내재화하고 회사는 그 주변에서 AAV, 단일세포 분석, 라이브러리 제작, 시퀀싱, 지식재산, 임상 전환을 지원하는 구조다. Zhu et al (2026)의 노화 lncRNA 단일핵 멀티오믹스, Nan et al (2026)의 제2형 당뇨와 리보솜 품질관리 유전자 Perturb-seq, Cai et al (2026)의 생체 내 심장 재프로그래밍 Perturb-seq, Zhang et al (2026)의 Science 논문은 모두 대학·병원·국가연구소가 중심에 있다. 회사는 들어오지만 아직 중국판 10x라기보다 전문 위탁 실험 회사, 기술 파트너, 창업 지식재산을 품은 회사, 임상 전환 파트너에 가깝다. 이 구분은 MPRA/STARR-seq에서 더 중요하다. Perturb-seq은 10x 기반 단일세포 포획과 가이드 RNA 포획 설계가 어느 정도 표준화됐다. 물론 여전히 가이드 배정, 바이러스 투입량, 배치 효과, 세포 회수율이 어렵지만 실험의 골격은 비교적 공유된다. 반면 MPRA와 STARR-seq은 라이브러리 설계, 올리고 합성, 바코드 서열 연결, 클로닝, 리포터 구조, 프로모터 선택, 세포 안에서 서열이 놓이는 방식, RNA/DNA 비율 보정이 모두 실험 품질을 좌우한다. 그래서 산업화 여지가 오히려 더 크다. 회사의 존재감은 저자 수만으로 잘 잡히지 않는다. 올리고 라이브러리, 클로닝, 시퀀싱, 리포터 실험 품질관리 같은 주변부가 산업화되면 이 분야에서 더 빠르게 자리를 만들 수 있다.

중국 회사들이 들어오는 방식은 서로 다르다. 먼저 상하이 기반 Genemagic Biosciences가 있다. 이 회사는 Science의 iGOF-Perturb-seq 논문에 들어가 있고, 연구의 스케일은 955개 전사인자와 12만 개가 넘는 섭동 성상세포다. 이 정도면 단순한 서비스 회사로만 보기는 어렵다. Genemagic은 GM101이라는 파킨슨병 대상 AAV 유전자치료 임상도 등록해 두고 있다. 피각의 성상세포를 도파민성 뉴런으로 바꾸는 AAV 치료를 평가하는 프로그램이다. 이 회사는 Perturb-seq 위탁 회사라기보다 중추신경계 AAV 유전자치료와 기능유전체 타깃 발굴을 연결하는 번역 연구 회사에 가깝다. 암 분야에서는 Analytical BioSciences와 GeneX Health가 보인다. Li et al (2026)의 ADAM12 연구는 환자 유래 섬유아세포에서 CRISPRi와 CRISPRa 기반 Perturb-seq을 수행했고, 암 관련 섬유아세포가 면역 억제 상태와 항종양 상태 사이를 오가는 축을 찾았다. 여기서 중요한 것은 회사 이름 자체가 아니라, 환자 유래 세포와 Perturb-seq이 바로 치료 개발 쪽 암 연구로 들어간다는 점이다. Plastech는 재생의학 쪽에 가깝다. Cai et al (2026)은 생체 안에서 섬유아세포를 심근세포 쪽으로 바꾸는 과정의 장애물을 Perturb-seq으로 찾았고, Calr 발현억제가 심근경색 이후 회복을 개선할 수 있음을 보였다. 여기서는 재생의학 섭동 데이터와 창업 지식재산이 연결된다. 세 사례를 나란히 놓으면 회사의 위치가 분명해진다. 중국 회사들은 아직 10x Genomics나 Parse Biosciences처럼 독립 플랫폼으로 시장을 지배하는 모습과는 다르다. 대신 대학, 병원, 연구소가 큰 실험을 수행하고, 회사는 AAV, 종양 단일세포 분석, 재프로그래밍 지식재산, 임상 전환 가능성 같은 지점에 붙는다. 중국의 움직임은 회사 주도 플랫폼이라기보다 대학·병원 중심 데이터 생산과 회사의 번역 기능이 결합되는 구조에 가깝다.


인간 세포와 질환 데이터로 이어지는 회사들이 논문에 등장한다. Singleron Biotechnologies가 그렇다. Zeng et al (2025)의 CellFM 논문은 1억 개가 넘는 인간 단일세포 전사체로 8억 개 매개변수를 가진 기초모델을 학습했고, 섭동 반응 예측도 평가 항목에 포함했다. Singleron은 Perturb-seq 회사라기보다 단일세포 데이터 처리, 세포 주석, 데이터베이스, 키트, 장비를 제공하는 단일세포 인프라 회사에 가깝다. 이런 회사가 중요해지는 이유는 분명하다. 환자 샘플과 병원 연구가 단일세포 데이터로 바뀌는 접점에 서 있기 때문이다. Singleron을 베이징대 BIOPIC의 직접 스핀오프로 묶으면 계보가 흐려진다. Singleron의 뿌리는 BIOPIC 실험실이라기보다 Novogene/QIAGEN 같은 상업 시퀀싱·진단 경험과 예일대 단일세포 미세유체 기술 라이선스다. Nan Fang, Jing Zhou, Rong Fan의 이력을 놓고 보면 이 회사는 BIOPIC 직계가 아니라 중국발 단일세포 상업 플랫폼의 별도 계보다. 중국의 단일세포 생태계가 모두 베이징대 BIOPIC에서 나온 것이 아니라, 대학 기술 이전과 상업 시퀀싱 회사 출신 창업이 동시에 자라고 있다는 점이 중요하다. BIOPIC 직계는 조금 다른 방향으로 인간 질환에 닿아 있다. Yikon Genomics는 단일세포 전장유전체 증폭을 생식진단으로 번역했고, Singlera Genomics는 혈중 유리 DNA 메틸화 기반 암 조기검출로 갔다. Analytical BioSciences는 단일세포 종양 생태계 분석과 가깝고, EdiGene은 CRISPR 치료제와 기능유전체 스크리닝 지식재산으로 이어진다. Singlomics Biopharmaceuticals는 항체 신약으로 갔다. 회사들을 길게 나열하는 것보다 중요한 것은 하나다. BIOPIC의 기술은 논문 안에 머물지 않고, 인간 샘플, 암, 생식, 유전자편집, 항체 치료 같은 질환 응용으로 계속 흘러갔다. 그래서 식물 MPRA, 작물 유전자편집, 순수 AI 벤치마크, 시퀀싱 장비 회사까지 모두 한 글에 넣으면 초점이 흐려진다. 알파지놈 이후의 데이터 경쟁에서 지금 봐야 할 것은 인간 질환 맥락의 데이터를 누가 반복적으로 만들 수 있느냐다.

MPRA와 STARR-seq은 논코딩 조절 요소를 대량으로 읽는 실험이다. MPRA는 수천에서 수십만 개의 후보 서열을 리포터에 붙이고 바코드 서열로 활성을 읽는다. STARR-seq은 조절 서열 후보 자체가 전사체 안에 들어가 자기 활성을 읽히는 구조다. 둘 다 "이 서열이 조절 서열인가", "이 변이가 활성을 바꾸는가", "이 프로모터 문법이 발현을 어떻게 조절하는가"를 대량으로 묻는 방식이다. MPRA 연구의 스케일도 빠르게 증가한다. 원래의 MPRA는 수천에서 수만 개 서열을 다루는 실험이었다. 이제는 발달 중인 인간 대뇌피질과 오가노이드에서 10만 개가 넘는 서열과 1만 7천 개 변이를 보는 실험, 68만 개 이상의 200bp 서열을 여러 세포주에서 읽는 실험, 22만 개 변이와 60만 개가 넘는 대립유전자를 다섯 세포주에서 읽는 실험이 나온다. 더 이상 후보 조절 서열 몇 개를 검증하는 실험이 아니다. 모델 학습용 데이터셋이다. STARR-seq도 마찬가지다. 접근 가능한 염색질 조각에서 활성 서열과 억제 서열을 함께 읽고, 유전체 규모의 억제 서열을 찾고, AAV 벡터 안에서 어떤 조절 서열이 세포 특이적으로 작동하는지 고른다. 리포터 실험이 단순히 조절 서열을 찾는 기술에서, 세포 상태별 조절 문법과 유전자치료 벡터 설계로 넘어가고 있다. Perturb-seq 쪽의 스케일도 비슷하다. 최근 논문들을 보면 Jiang et al (2025)은 6개 세포주와 5개 경로 맥락에서 1,500개 이상의 섭동을 다루고, Southard et al (2025)는 1,836개 전사인자를 CRISPRa로 활성화한다. Nan et al (2026)은 제2형 당뇨 관련 유전자와 리보솜 품질관리 유전자를 인간 베타세포에서 보고, Zhu et al (2026)은 노화와 세포노화 관련 lncRNA를 단일핵 멀티오믹스로 읽는다. Zhang et al (2026)은 955개 전사인자를 살아 있는 생쥐 뇌 성상세포에서 본다. MPRA의 60만 대립유전자와 Perturb-seq의 12만 세포는 직접 비교할 수 없다. 하나는 서열 라이브러리의 크기이고, 하나는 단일세포 측정값의 크기다. 그래도 공통점은 분명하다. 둘 다 사람이 표 하나를 보고 해석하려고 만든 데이터가 아니라, 모델이 조절 문법과 섭동 반응을 학습하도록 만든 데이터다.

그래서 중국 회사들이 여기에 들어오는 것은 우연이 아니다. 바이오 AI의 병목이 모델에서 데이터로 이동하면 회사의 역할도 달라진다. 예전 바이오 회사가 약물을 만들거나 실험 서비스를 제공했다면, 이제는 질병 맥락의 섭동 데이터, 세포 종류별 리포터 실험 데이터, 환자 유래 오가노이드와 섬유아세포 공배양 데이터, 생체 내 재프로그래밍 데이터를 직접 만들거나 그 생산을 가능하게 하는 회사가 된다. 알파지놈 같은 모델이 등장한 뒤, 누가 모델이 모르는 질환 세포 상태를 실제로 측정해 넣을 것인가. 이 질문이 회사의 위치를 바꾼다.



## 알파지놈 발표 이후에 시작된 진짜 전쟁

알파지놈 이후의 전쟁이라는 말은 모델이 중요하지 않다는 뜻이 아니다. 오히려 모델이 강해질수록 빈칸도 더 선명해진다는 뜻이다. 공개된 유전체 기능 신호로 학습한 모델은 논코딩 유전체의 가능성을 보여주지만, 특정 환자군, 특정 병리 상태, 특정 세포 상태에서 섭동을 가했을 때의 반응을 대신 측정해 주지는 않는다. K562처럼 오래전부터 반복 실험에 쓰인 세포주는 공개 데이터가 매우 많다. 반대로 사람의 뇌가 만들어지는 시기의 세포, 알츠하이머병이나 염증 상황에서 성질이 바뀐 성상세포, 노화 과정에서 기능과 반응성이 달라진 섬유아세포, 당뇨병에서 인슐린을 만들고 분비해야 하는 베타세포, 심근경색 뒤 손상 부위를 메우는 심장 섬유아세포는 각각 다른 생물학을 갖는다. 이런 세포에서는 같은 DNA 변이나 같은 전사인자 조작도 전혀 다른 결과를 낼 수 있으므로 따로 측정해야 한다.

미국은 이론, 모델, 대형 제약회사의 자본으로 움직인다. 옴니제닉 모델, 가상세포, 섭동 아틀라스, 기초모델, 닫힌 루프 발견 같은 개념을 만들고, Roche/Genentech나 Arc Institute 같은 곳이 대형 데이터를 생산한다. 중국은 국가 연구소, 병원, 대학, 회사가 묶인 형태로 데이터를 빠르게 쌓는다. 길은 다르지만 공통점은 있다. 바이오 AI의 성능은 결국 반복적으로 생산되는 실험 데이터에 걸려 있다. 한국에서 이걸 보며 불편함을 느끼는 이유는 분명하다. 우리는 모델 이야기는 빠르게 한다. RAG, LLM, 에이전트, AI 과학자 같은 말은 금방 돈다. 하지만 정작 질병 맥락의 섭동 데이터를 생산하는 체계, 환자 유래 샘플과 단일세포 섭동을 묶는 조직, MPRA/STARR-seq을 반복 생산해 조절 문법을 쌓는 회사는 거의 보이지 않는다. 유전체 데이터 접근은 막혀 있고, 기업의 장기 데이터 투자는 약하고, 실험과 모델을 한 몸으로 이해하는 사람도 적다. 중국은 이 지점을 빠르게 파고드는 중이다. 대학, 병원, 연구소가 대규모 Perturb-seq과 멀티오믹스 스크린을 수행하고, 회사는 그 주변에서 AAV, 단일세포 분석, 종양 생태계 분석, 재생의학 지식재산, 진단 플랫폼을 붙인다. 모든 회사가 같은 정도로 실험을 직접 운영하는 것은 아니다. 어떤 회사는 플랫폼에 가깝고, 어떤 회사는 임상 전환에 가깝고, 어떤 회사는 분석이나 진단의 접점에 가깝다. 하지만 큰 방향은 같다. 기능유전체 데이터 생산이 학술 실험에 머물지 않고, 질환 데이터와 치료 후보를 향해 이동하고 있다.

앞으로 바이오 AI에서 중요한 것은 "알파지놈을 쓸 수 있느냐"만이 아니다. 누구나 API를 쓸 수 있다. 더 중요한 것은 알파지놈이 모르는 세포 상태를 누가 측정해 넣느냐다. 누가 환자 유래 세포에서 변이 효과를 읽고, 누가 질환 맥락의 Perturb-seq을 만들고, 누가 기능획득의 미세한 표현형을 잡아내고, 누가 그 데이터를 모델과 닫힌 루프로 연결하느냐다. 나는 이 경쟁을 데이터 확보 전쟁이라고 본다. 알파지놈 이후의 바이오 AI는 모델의 시대이지만, 모델만으로 충분한 시대는 아니다. 모델은 공개 데이터 위에서 출발한다. 그러나 신약과 진단과 세포 치료로 가는 길은 비공개 데이터, 질병 데이터, 섭동 데이터, 그리고 그 데이터를 반복적으로 생산하는 조직 위에서 열린다. 실제 경쟁은 조금 더 안쪽에서 벌어진다. DNA를 읽고, 유전자를 켜고 끄고, 섭동 이후의 변화를 수십만 세포와 수십만 서열 단위로 기록하는 일이다. 알파지놈 이후의 경쟁은 결국 그 기록을 누가 먼저, 더 좋은 품질로 갖느냐의 문제다.



## 참고한 논문과 자료

- AlphaGenome: Cheng et al., "Advancing regulatory variant effect prediction with AlphaGenome", [Nature](https://www.nature.com/articles/s41586-025-10014-0)
- Jacob and Monod, "Genetic Regulatory Mechanisms in the Synthesis of Proteins", [Journal of Molecular Biology](https://doi.org/10.1016/S0022-2836(61)80072-7)
- Dixit et al., "Perturb-seq: Dissecting molecular circuits with scalable single-cell RNA profiling of pooled genetic screens", [Broad Institute](https://www.broadinstitute.org/publications/broad14056), [PMC](https://pmc.ncbi.nlm.nih.gov/articles/5181115/)
- Adamson et al., "A Multiplexed Single-Cell CRISPR Screening Platform Enables Systematic Dissection of the Unfolded Protein Response", [PubMed](https://pubmed.ncbi.nlm.nih.gov/27984733/), [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5315571/)
- Replogle et al., "Mapping information-rich genotype-phenotype landscapes with genome-scale Perturb-seq", [PubMed](https://pubmed.ncbi.nlm.nih.gov/35688146/), [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9380471/)
- Patwardhan et al., "Massively parallel functional dissection of mammalian enhancers in vivo", [Nature Biotechnology](https://www.nature.com/articles/nbt.2136), [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3402344/)
- Inoue and Ahituv, "Decoding enhancers using massively parallel reporter assays", [Genomics](https://doi.org/10.1016/j.ygeno.2015.06.005)
- Hill et al., "On the design of CRISPR-based single-cell molecular screens", [Nature Methods](https://www.nature.com/articles/nmeth.4604), [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5882576/)
- Datlinger et al., "Pooled CRISPR screening with single-cell transcriptome readout", [Nature Methods](https://doi.org/10.1038/nmeth.4177)
- IGVF Consortium, [official portal](https://igvf.org/); Li et al., "The IGVF catalog—from genetic variation to function", [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12807646/)
- Boyle, Li, and Pritchard, "An Expanded View of Complex Traits: From Polygenic to Omnigenic", [Cell](https://doi.org/10.1016/j.cell.2017.05.038)
- Simons et al., "Simple scaling laws control the genetic architectures of human complex traits", [PLOS Biology](https://doi.org/10.1371/journal.pbio.3003402)
- Aguirre et al., "Gene regulatory network structure informs the distribution of perturbation effects", [PLOS Computational Biology](https://doi.org/10.1371/journal.pcbi.1013387)
- Ota et al., "Causal modelling of gene effects from regulators to programs to traits", [Nature](https://doi.org/10.1038/s41586-025-09866-3)
- Milind et al., "Buffering of gene dosage response curves for human complex traits", [Cell Genomics](https://doi.org/10.1016/j.xgen.2026.101221)
- Zhu et al., "Genetic architectures of brain-related traits are shaped by strong selective constraints", [bioRxiv](https://doi.org/10.64898/2026.03.22.713538)
- Zhang et al., "Mapping transcription factor functions in astrocytes using in vivo gain-of-function Perturb-seq", [PubMed](https://pubmed.ncbi.nlm.nih.gov/42024736/)
- Li et al., "Single-cell screens identify ADAM12 as a fibroblast checkpoint impeding anti-tumor immunity", [PubMed](https://pubmed.ncbi.nlm.nih.gov/41544628/)
- Cai et al., "Perturb-seq uncovers pathological obstacles to direct cardiac reprogramming in vivo", [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1934590926001165)
- Genemagic GM101 clinical trial record, [ClinicalTrials.gov](https://clinicaltrials.gov/study/NCT07100171)
- Zeng et al., "CellFM: a large-scale foundation model pre-trained on transcriptomics of 100 million human cells", [Nature Communications](https://www.nature.com/articles/s41467-025-59926-5)
- Singleron company, team, SCOPE-chip, Proteona acquisition, and Garvan/DKSH partnership pages: [Company](https://singleron.bio/company/), [Team](https://singleron.bio/company/team/), [SCOPE-chip](https://singleron.bio/scope-chip/), [Proteona](https://singleron.bio/news/singleron-acquires-proteona/), [Garvan](https://singleron.bio/news/singleron-garvan-australia-certified-service-provider/)
- BIOPIC official introduction, Nature partner-content profile, and Zemin Zhang profile: [BIOPIC introduction](https://biopic.pku.edu.cn/en/aboutus/introduction/index.htm), [Nature](https://www.nature.com/articles/d42473-020-00560-8), [Zemin Zhang](https://biopic.pku.edu.cn/en/researchteam/511480.htm)
- Yikon Genomics and Singlera Genomics company pages: [Yikon](https://www.yikon-global.com/), [Singlera](https://www.singlera.com/)
- Li et al., "SciBet as a portable and fast single cell type identifier", [Nature Communications](https://www.nature.com/articles/s41467-020-15523-2)
- Cao et al., "Omicron escapes the majority of existing SARS-CoV-2 neutralizing antibodies", [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8866119/)
- EdiGene scientific founder page and LEAPER 2.0 release, [Scientific founder](https://www.edigene.com/scientific_founder/), [EdiGene](https://www.edigene.com/media/89.html); EDIGENE tagged guide RNA screening patent, [PubChem](https://pubchem.ncbi.nlm.nih.gov/patent/CN-111349654-A)
- Deng et al., "Massively parallel characterization of regulatory elements in the developing human cortex", [Science](https://doi.org/10.1126/science.adh0559)
- Agarwal et al., "Massively parallel characterization of transcriptional regulatory elements", [Nature](https://doi.org/10.1038/s41586-024-08430-9)
- Siraj et al., "Functional dissection of complex trait variants at single-nucleotide resolution", [Nature](https://doi.org/10.1038/s41586-026-10121-6)
- Hansen and Hodges, "ATAC-STARR-seq reveals transcription factor-bound activators and silencers within chromatin-accessible regions of the human genome", [Genome Research](https://doi.org/10.1101/gr.276766.122)
- Liu et al., "Uncovering the whole genome silencers of human cells via Ss-STARR-seq", [Nature Communications](https://doi.org/10.1038/s41467-025-55852-8)
- Wang et al., "High-resolution dissection of human cell type-specific enhancers in cis and trans activities", [Genomics](https://doi.org/10.1016/j.ygeno.2025.110985)
- Becker et al., "STARR-CRAAVT: A platform to identify cell type-specific regulatory elements for next-generation gene therapy", [iScience](https://doi.org/10.1016/j.isci.2026.115469)
- Jiang et al., "Systematic reconstruction of molecular pathway signatures using scalable single-cell perturbation screens", [Nature Cell Biology](https://doi.org/10.1038/s41556-025-01622-z)
- Southard et al., "Comprehensive transcription factor perturbations recapitulate fibroblast transcriptional states", [Nature Genetics](https://doi.org/10.1038/s41588-025-02284-1)
- Nan et al., "Single-cell perturbations decipher ribosomal stress-surveillance regulators in type 2 diabetes", [Nature Metabolism](https://doi.org/10.1038/s42255-025-01407-6)
- Zhu et al., "Multiomic single-cell perturbation screens reveal critical lncRNA regulators of senescence", [Nature Aging](https://doi.org/10.1038/s43587-026-01100-7)
